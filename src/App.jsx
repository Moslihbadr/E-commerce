// Styled Components - Theme Provider
import { ThemeProvider } from "styled-components";

// Components
import NavBar from "./components/NavBar"
import Footer from "./components/footer/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

// react router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// pages
import Home from "./pages/Home";

// layouts
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <NavBar />
          <Footer />
        </RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
