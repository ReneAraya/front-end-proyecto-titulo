// src/components/Main.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OfferManagement from '../pages/OfferManagement';
import ProfessorDashboard from '../pages/ProfessorDashboard';
import ProfessorRamos from '../pages/ProfessorRamos';
import ProfessorFormulario from '../pages/ProfessorFormulario';
import VerificarCorreo from '../pages/VerificarCorreo';
import FormularioPostulante from '../pages/FormularioPostulante';

const Main = () => {
  return (
    <main>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offerManagement" element={<OfferManagement />} />
          <Route path="/profesor" element={<ProfessorDashboard />} />
          <Route path="/profesor/dashboard" element={<ProfessorDashboard />} />
          <Route path="/profesor/carrera/:carreraId/ramos" element={<ProfessorRamos />} />
          <Route path="/profesor/carrera/:carreraId/ramo/:ramoId/formulario" element={<ProfessorFormulario />} />
          <Route path="/profesor/ramo/:ramoId/formulario" element={<ProfessorFormulario />} />
          <Route path="/profesor/ramo/:ramoId/carrera/:carreraId/formulario" element={<ProfessorFormulario />} />
          <Route path="/formulario/verificar/:ramoId/:carreraId" element={<VerificarCorreo />} />
          <Route path="/formulario/:ramoId/:carreraId/responder" element={<FormularioPostulante />} />

        </Routes>
      </div>
    </main>
  );
};

export default Main;
