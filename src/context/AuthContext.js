// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [updateNavbar, setUpdateNavbar] = useState(0); // Para forzar la actualización de Navbar

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.rol_id);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
      setUpdateNavbar(prev => prev + 1); // Forzar actualización en Navbar
    };

    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole, updateNavbar }}>
      {children}
    </AuthContext.Provider>
  );
};
