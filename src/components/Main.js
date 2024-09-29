// src/components/Main.js

// Está estructurado para que se manejen las rutas
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OfferStatus from '../pages/OfferStatus';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer-status" element={<OfferStatus />} />
      </Routes>
    </main>
  );
};

export default Main;

