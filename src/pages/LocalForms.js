import React, { useState } from 'react';
import axios from 'axios';

const FormularioRamo = ({ ramoId, carreraId, anio, semestre }) => {
  const [formData, setFormData] = useState({
    correoInstitucional: '',
    rut: '',
    nombres: '',
    apellidos: '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/formulario/responder', {
        ramo_id: ramoId,
        carrera_id: carreraId,
        anio,
        semestre,
        ...formData,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario. Verifica que no hayas respondido ya.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Correo Institucional:</label>
      <input type="email" name="correoInstitucional" value={formData.correoInstitucional} onChange={handleInputChange} required />

      <label>RUT:</label>
      <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} required />

      {/* Añadir los campos restantes del formulario de forma similar */}
      
      <button type="submit">Enviar Respuesta</button>
    </form>
  );
};

export default FormularioRamo;
