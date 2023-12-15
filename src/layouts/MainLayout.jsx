import NavBar from "../components/NavBar";
import Footer from "../components/footer/Footer";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout