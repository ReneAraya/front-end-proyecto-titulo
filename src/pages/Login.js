import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form>
        <label>
          Correo Electrónico:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
