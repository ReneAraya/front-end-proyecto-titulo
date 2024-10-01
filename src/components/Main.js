// src/components/Main.js

// Está estructurado para que se manejen las rutas
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OfferStatus from '../pages/OfferStatus';
import Help from '../pages/Help';

const Main = () => {
  return (
    <main>
      <>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/offer-status" element={<OfferStatus />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </>
    </main>
  );
};

export default Main;

