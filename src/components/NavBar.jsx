import Logo from "./Logo";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

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

// styles for buttons
const StyledButton = styled.button`
  transition: ${(props) => props.theme.transition};
  background-color: ${(props) => props.theme.buttonText};
  color: ${(props) => props.theme.buttonBg};
  border-color: ${(props) => props.theme.borderColor};
  padding: 0.5rem 1rem;

  span.badge {
    top: -8px;
    right: 3px;
  }

  &:hover {
    color: ${(props) => props.theme.buttonText};
    background-color: ${(props) => props.theme.buttonBg};
  }

`;

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container lg-d-flex justify-content-center">
        <a className="navbar-brand me-auto" href="#">
          <Logo fontSize={40} width={150} />
        </a>
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
            {/* <li className="nav-item m-2">
              <StyledLink className="nav-link" href="#">
                FAQs
              </StyledLink>
            </li> */}
            {/* <li className="nav-item m-2">
              <StyledLink className="nav-link" href="#">
                Blog
              </StyledLink>
            </li> */}
          </ul>
          <div className="d-flex align-items-center">
              <a href="#" style={{color: "#1D1D1D", textDecoration: "none"}}><FontAwesomeIcon icon={faCartShopping} className="me-1" /> (0)</a>
              <a href="#" style={{color: "#1D1D1D", textDecoration: "none"}}><FontAwesomeIcon icon={faHeart} className="me-1 ms-2"  /> (0)</a>
            <StyledButton className="btn ms-3 me-2 my-3" onClick={() => navigate("/login")}>
              Login <FontAwesomeIcon icon={faUserPlus} />
            </StyledButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
