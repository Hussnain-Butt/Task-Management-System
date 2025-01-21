import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('token'),
  });

  useEffect(() => {
    // Optionally, validate token on app load and set user data
    if (auth.token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setAuth((prev) => ({ ...prev, user }));
    }
  }, []);

  const isAdmin = () => auth.user && auth.user.role === 'admin';

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
