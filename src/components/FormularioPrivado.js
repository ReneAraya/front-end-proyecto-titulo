// src/pages/FormularioPrivado.js

import React, { useState } from 'react';
import axios from 'axios';

const FormularioPrivado = ({ ramoId, carreraId }) => {
  const [correo, setCorreo] = useState('');
  const [formularioRespondido, setFormularioRespondido] = useState(false);
  const [puedeResponder, setPuedeResponder] = useState(false);
  const [error, setError] = useState('');
  const [respuestas, setRespuestas] = useState({
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
  const [ayudanteSeleccionado, setAyudanteSeleccionado] = useState(null);

  const handleCorreoSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/formulario/verificar', {
        correo, ramoId, carreraId
      });

      if (response.data.responded) {
        setFormularioRespondido(true);
      } else {
        setPuedeResponder(true);
      }
    } catch (error) {
      setError('Error al verificar el correo');
    }

    // Obtener ayudante seleccionado
    try {
      const ayudanteResponse = await axios.get(`http://localhost:3001/api/formulario/ayudante-seleccionado/${ramoId}/${carreraId}`);
      setAyudanteSeleccionado(ayudanteResponse.data.ayudante);
    } catch (error) {
      console.error('Error al obtener el ayudante seleccionado:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/formulario/responder', {
        ramoId,
        carreraId,
        ...respuestas,
        correo,
      });
      alert('Respuestas enviadas correctamente');
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
    }
  };

  return (
    <div className="formulario-privado-container">
      {!puedeResponder && !formularioRespondido && (
        <div>
          <h3>Ingrese su correo institucional para acceder al formulario</h3>
          <input
            type="email"
            placeholder="Correo institucional"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <button onClick={handleCorreoSubmit}>Verificar Correo</button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
      
      {formularioRespondido && (
        <p>Usted ya ha respondido a este formulario.</p>
      )}

      {puedeResponder && (
        <div>
          <h3>Formulario de Postulación</h3>
          {/* Aquí van los inputs para cada respuesta del formulario */}
          <button onClick={handleSubmit}>Enviar Respuestas</button>
        </div>
      )}

      <div className="ayudante-seleccionado">
        {ayudanteSeleccionado ? (
          <p>
            <strong>Postulante seleccionado como ayudante:</strong><br />
            Nombre: {ayudanteSeleccionado.nombres} <br />
            RUT: {ayudanteSeleccionado.rut} <br />
            Correo: {ayudanteSeleccionado.respondent_email}
          </p>
        ) : (
          <p>Aún no se ha seleccionado un ayudante para este ramo.</p>
        )}
      </div>
    </div>
  );
};

export default FormularioPrivado;
