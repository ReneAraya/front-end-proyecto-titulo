import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si el usuario está autenticado al montar la aplicación
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Lógica para el tiempo de inactividad
    let timer;
    
    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // Cerrar sesión después de 20 minutos de inactividad
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.href = '/login';
      }, 20 * 60 * 1000); // 20 minutos
    };

    // Escuchar eventos de actividad del usuario
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    // Limpiar el temporizador y los eventos al desmontar el componente
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);


  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="main-content">
          <Main setIsAuthenticated={setIsAuthenticated} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
