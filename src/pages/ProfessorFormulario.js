import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfessorFormulario = () => {
  const { ramoId } = useParams();
  const [respuestas, setRespuestas] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRespuestas = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/profesor/ramo/${ramoId}/formulario`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRespuestas(response.data);
      } catch (error) {
        console.error('Error al obtener las respuestas del formulario:', error);
      }
    };

    fetchRespuestas();
  }, [ramoId]);

  const handleAsignarAyudante = async (postulanteId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(`http://localhost:3001/api/ramos/${ramoId}/carrera/1/asignar-ayudante`, // Ajustar la carreraId según corresponda
        { postulanteId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Postulante asignado correctamente');
      setRespuestas((prev) =>
        prev.map((respuesta) => (respuesta.id === postulanteId ? { ...respuesta, asignado: true } : respuesta))
      );
    } catch (error) {
      console.error('Error al asignar al postulante como ayudante:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Respuestas del Formulario</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="list-respuestas">
        {respuestas.map((respuesta) => (
          <div key={respuesta.id} className="respuesta-item bg-white p-4 rounded shadow mb-4">
            <p><strong>Nombre:</strong> {respuesta.nombres} {respuesta.apellidos}</p>
            <p><strong>Correo:</strong> {respuesta.correo}</p>
            <p><strong>Carrera:</strong> {respuesta.carrera}</p>
            <button
              className="bg-blue-500 text-white p-2 rounded mt-2"
              disabled={respuesta.asignado}
              onClick={() => handleAsignarAyudante(respuesta.id)}
            >
              {respuesta.asignado ? 'Ayudante Asignado' : 'Asignar como Ayudante'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorFormulario;
