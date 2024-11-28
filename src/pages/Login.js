import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      // Guardar el token JWT en el almacenamiento local
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      // Decodificar el token para obtener la información del usuario
      const decodedToken = jwtDecode(token);
      const { rol_id } = decodedToken;

      // Redirigir solo si el rol es administrador
      if (rol_id === 1) {
        navigate('/offerManagement'); // Redirigir al administrador a la gestión de ofertas
      } else {
        setErrorMessage('Inicio de sesión exitoso.');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Log in</h1>
        <p className="text-small"><b>Inicio de sesión solo para jefe de docencia</b></p>
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
