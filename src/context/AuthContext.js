// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.rol_id);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();

    // Listener for storage changes (used when token is updated from another tab)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkLoginStatus]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.rol_id);

    // Trigger a storage event manually to force update
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);

    // Trigger a storage event manually to force update
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
