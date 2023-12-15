// font awesome icons
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styled components
import { styled } from "styled-components";

// components
import CompanyOverview from "./CompanyOverview";
import Copieright from "./Copyright";
import { Link } from "react-router-dom";

// Styled components
const SocialMediaSection = styled.section`
  border-bottom: 1px solid #ddd;
`;

const SocialMediaLink = styled.a`
  font-size: 17px;
  margin-right: 1rem;
  transition: ${(props) => props.theme.transition};

  &:hover {
    color: ${(props) => props.theme.mainColorLight}!important;
  }
`;

const FooterLink = styled(Link)`
  transition: ${(props) => props.theme.transition};

  &:hover {
    color: ${(props) => props.theme.mainColorLight}!important;
  }
`;

const FooterHeading = styled.h6`
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.footerHeadingColor};
`;

const Footer = () => {
  return (
    <>
      <footer className="container text-center text-lg-start bg-body-tertiary text-muted mt-5">
        <SocialMediaSection className="d-flex justify-content-center justify-content-lg-between px-4 py-3 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <SocialMediaLink href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialMediaLink>
            <SocialMediaLink href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialMediaLink>
            <SocialMediaLink href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialMediaLink>
            <SocialMediaLink href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialMediaLink>
            <SocialMediaLink href="#" className="me-4 text-reset">
              <FontAwesomeIcon icon={faGithub} />
            </SocialMediaLink>
          </div>
        </SocialMediaSection>

        <div className="container text-center text-md-start mt-3">
          <div className="row">
          
            <CompanyOverview />

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-4">
              <FooterHeading className="text-uppercase fw-bold mb-2">Pages</FooterHeading>
              <p>
                <FooterLink
                  to="/"
                  className="text-reset text-decoration-none"
                >Home</FooterLink>
              </p>
              <p>
                <FooterLink
                  to="/about"
                  className="text-reset text-decoration-none"
                >About</FooterLink>
              </p>
              <p>
                <FooterLink
                  to="/products"
                  className="text-reset text-decoration-none"
                >Products</FooterLink>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-4">
              <FooterHeading className="text-uppercase fw-bold mb-2">Company</FooterHeading>
              <p>
                <FooterLink
                  href="#"
                  className="text-reset text-decoration-none"
                >FAQs</FooterLink>
              </p>
              <p>
                <FooterLink
                  href="#"
                  className="text-reset text-decoration-none"
                >Blog</FooterLink>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mt-4 text-center text-md-start">
              <FooterHeading className="text-uppercase fw-bold mb-2">Contact</FooterHeading>
              <p className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="me-2"
                  style={{ fontSize: '17px' }}
                /> Casablanca, MA
              </p>
              <p className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="me-2"
                  style={{ fontSize: '17px' }}
                />
                <small>HolazomiTeam@gmail.com</small>
              </p>
              <p className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="me-2"
                  style={{ fontSize: '17px' }}
                /> + 212 612 345 678
              </p>
            </div>
          </div>
        </div>

        <Copieright />
      </footer>
    </>
  );
};

export default Footer;
