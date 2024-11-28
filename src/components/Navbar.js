// src/components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userRole, updateNavbar } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  // Actualiza el estado local cuando el contexto cambia
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn, updateNavbar]);

  // Función para manejar el clic en el ícono de usuario
  const handleUserIconClick = () => {
    if (userRole === 1) {
      // Administrador
      navigate('/offerManagement');
    } else if (userRole === 2) {
      // Profesor
      navigate('/profesor');
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">Sistema de postulaciones para Ayudantias</Link>
      <ul>
        {loggedIn ? (
          <>
            <li className="user-icon">
              <FaUserCircle size={24} onClick={handleUserIconClick} className="cursor-pointer" />
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <CustomLink to="/login">Iniciar Sesión</CustomLink>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  );
}
