import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import WishlistContent from "../components/wishlist/WishlistContent";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CartTotal from "../components/cart/CartTotal";
import { WishlistContext } from "../context/WishlistContext";
import Breadcrumb from "../components/Breadcrumb";

const Wishlist = () => {

  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)
  const { clearWishlist } = useContext(WishlistContext)
  const { total } = useContext(WishlistContext)

  console.log(total);
  return (
    <>
      <Breadcrumb />
      {isAuthenticated ?
        <>
          <div className="container">
            <h4 className="ms-3 mb-5">My Wishlist</h4>
            {total > 0 &&
              <div className="content row px-3 d-md-flex d-none">
                <h6 className="col-3">Item</h6>
                <h6 className="col">Price</h6>
                <h6 className="col"></h6>
                <h6 className="col"></h6>
              </div>
            }
            <hr />
            {total > 0 ? <WishlistContent /> : <h5 className="text-warning d-flex justify-content-center">Your Wishlist is Empty!</h5>}
            <hr />
            <div className="d-flex justify-content-between">
              <Button handleClick={() => navigate('/products')}>Continue Shopping</Button>
              {total > 0 && <Button handleClick={() => clearWishlist()}>Clear Wishlist</Button>}
            </div>
          </div>
        </> : <Button className='mx-auto d-flex' handleClick={() => navigate('/login')}>Login</Button>
      }
    </>
  )
}

export default Wishlist;