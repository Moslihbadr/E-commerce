import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const AuthRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()

  return !isAuthenticated ? <Outlet /> : navigate('/')
};

export default AuthRoute;
