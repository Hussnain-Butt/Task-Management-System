import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  const isTokenExpired = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    return tokenExpiration && new Date().getTime() > parseInt(tokenExpiration, 10);
  };

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
