import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfessorRamos = () => {
  const { carreraId } = useParams();
  const [ramos, setRamos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchRamos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/profesor/carrera/${carreraId}/ramos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRamos(response.data);
      } catch (error) {
        console.error('Error al obtener los ramos:', error);
      }
    };

    fetchRamos();
  }, [carreraId]);

  const handleSelectRamo = (ramoId) => {
    navigate(`/profesor/ramo/${ramoId}/formulario`);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Ramos Asignados</h1>
      <div className="list-ramos">
        {ramos.map((ramo) => (
          <div key={ramo.id} className="ramo-item bg-white p-4 rounded shadow mb-4 cursor-pointer" onClick={() => handleSelectRamo(ramo.id)}>
            <h2 className="text-blue-500">{ramo.sigla} - {ramo.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorRamos;
