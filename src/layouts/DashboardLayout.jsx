import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {

  const {isAdmin} = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(isAdmin);

  useEffect(() => {
    !isAdmin && navigate('/')
  }, [isAdmin])

  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout