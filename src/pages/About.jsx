import styled from 'styled-components';
import aboutImg from '../assets/about-bg.png';
import Logo from '../components/Logo';
import { useEffect } from 'react';
import ScrollReveal from "scrollreveal";
import ServicesSection from '../components/ServicesSection';
import Breadcrumb from '../components/Breadcrumb';


const About = () => {

  useEffect(() => {
    ScrollReveal().reveal(".hero-description", {
      distance: "200px",
      origin: "right",
      opacity: 0,
      duration: 800,
      easing: "ease-in-out",
      beforeReveal: (domEl) => {
        domEl.style.opacity = 1;
      },
    });
  }, []);

  useEffect(() => {
    ScrollReveal().reveal(".hero-image", {
      distance: "200px",
      origin: "left",
      opacity: 0,
      duration: 800,
      easing: "ease-in-out",
      beforeReveal: (domEl) => {
        domEl.style.opacity = 1;
      },
    });
  }, []);

  return (
    <>
      <Breadcrumb />
      <Wrapper className='page section section-center mt-5 container'>
        <img src={aboutImg} alt='office space img' className="d-none d-lg-block hero-image" />
        <article className='hero-description'>
          <div className='title'>
            <h2>Our Journey</h2>
          </div>
          <p>
            Welcome to <Logo width={"115px"} fontSize={"30px"} />, where our story is woven with the threads of passion, dedication, and a shared love for quality products. Our journey began with a simple yet profound idea — to create an online marketplace that goes beyond transactions; it's about building connections and delivering exceptional experiences.
          </p>
          <p>
            Thank you for being part of our narrative. As we continue to grow, our dedication to providing you with a seamless and enjoyable shopping experience remains unwavering. Join us in celebrating the joy of discovering remarkable products that enhance your lifestyle and tell your story.
          </p>
        </article>
      </Wrapper>
      <ServicesSection />
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;

  img {
    width: 100%;
    border-radius: ${props => props.theme.raduis};
    height: 500px;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: ${props => props.theme.textColor};
  }

  h2 {
    color: ${props => props.theme.headingColor};
  }

  .underline {
    margin-left: 0;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default About;
