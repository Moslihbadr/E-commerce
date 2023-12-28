import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';

// Create the Wishlist Context
export const WishlistContext = createContext();

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ id: '', user_id: '', items: [] });
  const { isAuthenticated, userID } = useContext(AuthContext); // Use userID from AuthContext directly
  const [total, setTotal] = useState(0);

  console.log(wishlist);
  console.log(userID);

  // Function to fetch the user's wishlist from the API
  const fetchWishlist = async (userId) => {
    try {
      if (isAuthenticated) {
        const response = await axios.get(`http://localhost:3000/wishlists?user_id=${userId}`);
        const fetchedWishlist = response.data[0];
        setWishlist(fetchedWishlist);
        setTotal(fetchedWishlist.items.length);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist({ id: '', user_id: '', items: [] });
      setTotal(0);
    }
  };

// Function to add item to the wishlist
const addToWishlist = async (item) => {
  try {
    if (isAuthenticated) {
      const itemExists = wishlist.items.some((wishlistItem) => wishlistItem.id === item.id);

      if (itemExists) {
        Swal.fire({
          icon: 'info',
          title: 'Item already in wishlist',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const updatedWishlist = {
          ...wishlist,
          user_id: userID,
          items: [...wishlist.items, { ...item }],
        };

        const response = await axios.put(`http://localhost:3000/wishlists/${userID}`, updatedWishlist);
        const fetchedWishlist = response.data;
        setWishlist(fetchedWishlist);
        setTotal(fetchedWishlist.items.length);

        Swal.fire({
          icon: 'success',
          title: 'Item added to wishlist',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      console.error('User wishlist is not available');
    }
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
  }
};

  // Function to clear the wishlist
  const clearWishlist = async () => {
    try {
      if (isAuthenticated) {
        const updatedWishlist = {
          ...wishlist,
          items: [],
        };
        await axios.put(`http://localhost:3000/wishlists/${userID}`, updatedWishlist);
        setWishlist(updatedWishlist);
        setTotal(updatedWishlist.items.length); // Update total with updatedWishlist
        Swal.fire({
          icon: 'success',
          title: 'Wishlist cleared',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  // Function to remove a specific item from the wishlist
  const removeItem = async (productId) => {
    try {
      if (isAuthenticated) {
        const updatedWishlist = {
          ...wishlist,
          items: wishlist.items.filter((item) => item.id !== productId),
        };
        await axios.put(`http://localhost:3000/wishlists/${userID}`, updatedWishlist);
        setWishlist(updatedWishlist);
        setTotal(updatedWishlist.items.length); // Update total with updatedWishlist
        Swal.fire({
          icon: 'success',
          title: 'Item removed from wishlist',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  // Fetch the user's wishlist on component mount and when userID changes
  useEffect(() => {
    if (userID && isAuthenticated) {
      fetchWishlist(userID);
    } else {
      setWishlist({ id: '', user_id: '', items: [] });
    }
  }, [userID, isAuthenticated]);

  return (
    <WishlistContext.Provider value={{ wishlist, total, addToWishlist, clearWishlist, removeItem }}>
      {children}
    </WishlistContext.Provider>
  );
};