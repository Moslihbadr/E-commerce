// Styled Components - Theme Provider
import { ThemeProvider } from "styled-components";

// Components
import NavBar from "./components/NavBar"
import Footer from "./components/footer/Footer";
import Hero from "./components/Hero";

const App = () => {
  
  // global thmeme
  const theme = {
    mainColor: '#ff5921',
    mainColorLight: '#FF9800',
    mainColorLighter: '#e1dbd3',
    textColor: '#474747',
    bgColor: '#fdf1e9',
    borderColor: '#ffd7ba',
    headingColor: '#2a2828',
    buttonBg: '#ff9800',
    buttonText: '#ffffff',
    transition: 'all 0.3s ease-in-out',
    raduis: '.3rem',
    footerHeadingColor: '#1D1D1D',
    footerText: '#e7e0da',
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Hero />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
