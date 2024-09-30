// src/components/Main.js

// Está estructurado para que se manejen las rutas
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OfferStatus from '../pages/OfferStatus';
import Help from '../pages/Help';

const Main = () => {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/inicioSesion":
      component = <Login />
      break
    case "/ayuda":
      component = <Help />
      break
  }

  return (
    <main>
      <>
      <div className='container'>
        {component}
      </div>
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer-status" element={<OfferStatus />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </main>
  );
};

export default Main;

