import Logo from "./Logo";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

// styles for links
const StyledLink = styled(NavLink)`
  border-bottom: transparent solid 3px;
  transition: ${(props) => props.theme.transition};

  &:hover {
    border-bottom-color: ${(props) => props.theme.borderColor};
  }
  &.active {
    border-bottom-color: ${(props) => props.theme.borderColor};
  }

  @media (max-width: 991.98px) {  /* Medium screens and below */
    border-bottom: none;

    &:hover {
      padding-left: 10px;
    }
  }
`;

const NavBar = () => {

  const navigate = useNavigate()
  const { isAdmin, isAuthenticated, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const { total } = useContext(WishlistContext);

  console.log(isAdmin);

  return (
    <nav className="navbar navbar-expand-lg mb-4">
      <div className="container lg-d-flex justify-content-center">
        <Link className="navbar-brand me-auto" to="/">
          <Logo fontSize={40} width={150} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item m-2">
              <StyledLink className="nav-link" to='/'>
                Home
              </StyledLink>
            </li>
            <li className="nav-item m-2">
              <StyledLink className="nav-link" to='/about'>
                About
              </StyledLink>
            </li>
            <li className="nav-item m-2">
              <StyledLink className="nav-link" to='/products'>
                Products
              </StyledLink>
            </li>
            <li className="nav-item m-2">
              <StyledLink className="nav-link" to='/contact'>
                Contact
              </StyledLink>
            </li>
            { isAdmin &&
            <li className="nav-item m-2">
              <StyledLink className="nav-link" to='/dashboard'>
                Dashboard
              </StyledLink>
            </li>}
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/cart" style={{ color: "#1D1D1D", textDecoration: "none" }}><FontAwesomeIcon icon={faCartShopping} className="me-1" /> ({ isAuthenticated ? totalItems : 0})</Link>
            <Link to="/wishlist" style={{ color: "#1D1D1D", textDecoration: "none" }}><FontAwesomeIcon icon={faHeart} className="me-1 ms-3" /> ({ isAuthenticated ? total : 0})</Link>
            {!isAuthenticated ?
              <Button className="ms-3 me-2 my-3" handleClick={() => navigate('/login')}>
                Login <FontAwesomeIcon icon={faUserPlus} />
              </Button> :
              <Button className='ms-3 me-2 my-3' handleClick={logout} >
                Logout <FontAwesomeIcon icon={faRightFromBracket} />
              </Button>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
