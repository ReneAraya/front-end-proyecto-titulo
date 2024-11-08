import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Usuario y contraseña válidos
  const validEmail = "postulacion.ayudantias.eii@gmail.com";
  const validPassword = "Postulacion.ayudantias.EII.2024";

  const handleLogin = () => {
    if (email !== validEmail) {
      setErrorMessage('Correo incorrecto o usuario no registrado.');
    } else if (password !== validPassword) {
      setErrorMessage('Contraseña incorrecta.');
    } else {
      setErrorMessage('');
      //alert('Inicio de sesión exitoso');
      navigate('/OfferManagement'); // Redirige a la ruta de OfferManagement.js
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
