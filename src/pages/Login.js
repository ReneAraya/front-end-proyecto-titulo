import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importar el contexto
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Usar login desde el contexto

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;

        // Usar el método login del contexto
        login(token);

        // Decodificar el token para redirigir según el rol
        const user = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del JWT
        if (user.rol_id === 1) {
          navigate('/offerManagement');
        } else if (user.rol_id === 2) {
          navigate('/profesor');
        } else {
          setErrorMessage('Rol no autorizado.');
        }
      } else {
        setErrorMessage('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1 style={{ color: '#e87e04' }} className="text-3xl font-bold text-center mb-4">Inicio de sesión</h1>
        <p className="text-small"><b>Solo para jefe de docencia y profesores</b></p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <input
          type="email"
          placeholder="Correo"
          className="input-field w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input-field w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button w-full text-gray-600" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <p className="text-small">Pontificia Universidad Católica de Valparaíso</p>
        <p className="text-small">Escuela de Ingeniería Informática</p>
      </div>
    </div>
  );
};

export default Login;
