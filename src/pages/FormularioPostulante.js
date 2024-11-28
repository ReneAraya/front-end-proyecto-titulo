// src/pages/FormularioPostulante.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FormularioPostulante = () => {
  const [correo, setCorreo] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    rut: '',
    carrera: '',
    anioIngreso: '',
    vecesCurso: '',
    notaAprobacion: '',
    ayudantias: '',
    experienciaEvaluaciones: '',
    tutorias: '',
    talleresUMDU: '',
    nivelRiesgo: '',
    motivoAyudantia: '',
    bloquesDisponibles: {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
    },
  });

  const { ramoId, carreraId } = useParams();
  const navigate = useNavigate();

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleCorreoSubmit = async () => {
    try {
      const response = await axios.post('/api/verificar-postulacion', { correo, ramo_id: ramoId, carrera_id: carreraId });
      if (response.data.hasSubmitted) {
        setHasSubmitted(true);
      } else {
        setHasSubmitted(false);
      }
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      alert('Hubo un problema al verificar el correo.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/formulario/responder', {
        ...formData,
        correo,
        ramo_id: ramoId,
        carrera_id: carreraId,
        anio: 2025,
        semestre: 'primer semestre',
      });
      alert('Formulario enviado con éxito.');
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario.');
    }
  };

  return (
    <div className="container mx-auto py-4 w-full">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-10">Formulario de Postulación</h1>
      
      {!hasSubmitted ? (
        <div className="verificar-correo">
          <label className="text-lg font-bold text-blue-500">Correo Institucional:</label>
          <input
            type="email"
            value={correo}
            onChange={handleCorreoChange}
            className="input-field w-full p-2 border rounded my-2"
            required
          />
          <button onClick={handleCorreoSubmit} className="bg-blue-500 text-white p-2 rounded">Verificar Correo</button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="formulario">
          <label>Nombres:</label>
          <input type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} required />
          
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />

          <label>RUT:</label>
          <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} required />

          {/* Añadir los campos restantes del formulario */}
          
          <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">Enviar Respuesta</button>
        </form>
      )}
    </div>
  );
};

export default FormularioPostulante;
