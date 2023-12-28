import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';

// Create the Cart Context
export const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ id: '', user_id: '', items: [] });
  const [userID, setUserID] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const [total, setTotal] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  // Function to fetch the user's cart from the API
  const fetchCart = async (userId) => {
    try {
      if (isAuthenticated) {
        const response = await axios.get(`http://localhost:3000/carts?user_id=${userId}`);
        const fetchedCart = response.data[0];
        setCart(fetchedCart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ id: '', user_id: '', items: [] });
    }
  };

  // Function to add item to the cart
  const addToCart = async (item) => {
    try {
      if (isAuthenticated) {
        const updatedCart = {
          ...cart,
          items: [...cart.items, { ...item }],
        };
        const response = await axios.put(`http://localhost:3000/carts/${userID}`, updatedCart);
        const fetchedCart = response.data;
        setCart(fetchedCart);
        Swal.fire({
          icon: 'success',
          title: 'Item added to cart',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error('User cart is not available');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Function to clear the cart
  const clearCart = async () => {
    try {
      if (isAuthenticated) {

        const updatedCart = {
          ...cart,
          items: [],
        };

        await axios.put(`http://localhost:3000/carts/${userID}`, updatedCart);
        setCart(updatedCart);
        Swal.fire({
          icon: 'success',
          title: 'Cart cleared',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Function to remove a specific item from the cart
  const removeItem = async (productId) => {
    try {
      if (isAuthenticated) {
        const updatedCart = {
          ...cart,
          items: cart.items.filter((cartItem) => cartItem.id !== productId),
        };
  
        await axios.put(`http://localhost:3000/carts/${userID}`, updatedCart);
        setCart(updatedCart);
        Swal.fire({
          icon: 'success',
          title: 'Item removed from cart',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  

  // Fetch the user's cart on component mount and when userID changes
  useEffect(() => {
    const userID = Cookies.get('userID');
    setUserID(userID);
    if (userID && isAuthenticated) {
      fetchCart(userID);
    } else {
      setCart({ id: '', user_id: '', items: [] });
    }
  }, [userID, isAuthenticated]);

  // Calculate total
  useEffect(() => {
    const total = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    setTotal(total.toFixed(2));
    setTotalItems(totalItems)
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, totalItems, total, addToCart, clearCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};