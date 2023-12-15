import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is logged in using localStorage
    const storedIsAuthenticated = localStorage.getItem('isLoggedIn');
    if (storedIsAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('isLoggedIn', 'true');
        setError(null); // Reset error state if login is successful
        return true;
      } else {
        setIsAuthenticated(false);
        localStorage.setItem('isLoggedIn', 'false');
        setError('Invalid email or password'); // Set error message for incorrect login
        return false;
      }
    } catch (error) {
      console.log('Error occurred while logging in:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userID, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
