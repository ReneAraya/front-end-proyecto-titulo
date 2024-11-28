import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Decodificar el token para obtener la información del usuario
        const user = jwtDecode(token);

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
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Log in</h1>
        <p className="text-small"><b>Inicio de sesión solo para jefe de docencia y profesores</b></p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <input
          type="email"
          placeholder="Email"
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
