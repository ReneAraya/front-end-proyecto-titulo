// src/components/Main.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OfferManagement from '../pages/OfferManagement';

const Main = () => {
  return (
    <main>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Ruta para la gestión de ofertas */}
          <Route path="/offerManagement" element={<OfferManagement />} />
        </Routes>
      </div>
    </main>
  );
};

export default Main;
