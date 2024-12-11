// src/components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  // Actualiza el estado local cuando el contexto cambia
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

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
    logout(); // Llama a la función de logout desde el contexto
    navigate('/'); // Redirige al Home
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">Sistema de postulaciones para ayudantías</Link>
      <ul>
        {loggedIn ? (
          <>
            <li className="user-icon flex flex-col items-center cursor-pointer">
              <FaUserCircle size={32} onClick={handleUserIconClick} className="mb-1" />
              <span className="text-xs text-white">Gestor</span>
            </li>
            <li className="flex items-center justify-center">
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
