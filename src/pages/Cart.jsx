import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CartContent from "../components/cart/CartContent";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CartTotal from "../components/cart/CartTotal";
import Breadcrumb from "../components/Breadcrumb";

const Cart = () => {

  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)
  const { clearCart } = useContext(CartContext)
  const { totalItems } = useContext(CartContext)

  console.log(totalItems);
  return (
    <>
      <Breadcrumb />
      {isAuthenticated ?
        <>
          <div className="container">
            <h4 className="ms-3 mb-5">My Cart</h4>
            {totalItems > 0 &&
              <div className="content row px-3 d-md-flex d-none">
                <h6 className="col-3">Item</h6>
                <h6 className="col">Price</h6>
                <h6 className="col">Quantity</h6>
                <h6 className="col">Subtotal</h6>
                <h6 className="col"></h6>
              </div>
            }
            <hr />
            {totalItems > 0 ? <CartContent /> : <h5 className="text-warning d-flex justify-content-center">Your Cart is Empty!</h5>}
            <hr />
            <div className="d-flex justify-content-between">
              <Button handleClick={() => navigate('/products')}>Continue Shopping</Button>
              {totalItems > 0 && <Button handleClick={() => clearCart()}>Clear Cart</Button>}
            </div>
            { totalItems > 0 && <CartTotal />}
          </div>
        </> : <Button className='mx-auto d-flex' handleClick={() => navigate('/login')}>Login</Button>
      }
    </>
  )
}

export default Cart;