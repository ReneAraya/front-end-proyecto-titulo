import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="login-card">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Log in</h1>
        <p className="text-small"><b>Inicio de sesión solo para jefe de docencia</b></p>
        <input type="email" placeholder="Email" className="input-field w-full" />
        <input type="password" placeholder="Contraseña" className="input-field w-full" />
        <button className="login-button w-full text-gray-600">Iniciar sesión</button>
        <p className="text-small">Pontificia Universidad Católica de Valparaíso</p>
        <p className="text-small">Escuela de Ingeniería Informática</p>
      </div>
    </div>
  );
};

export default Login;

