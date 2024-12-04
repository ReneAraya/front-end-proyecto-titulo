import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfessorDashboard = () => {
  const [carreras, setCarreras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener token del localStorage
    const token = localStorage.getItem('token');
    
    const fetchCarreras = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/profesor/carreras', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarreras(response.data);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    fetchCarreras();
  }, []);

  const handleSelectCarrera = (carreraId) => {
    navigate(`/profesor/carrera/${carreraId}/ramos`);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Carreras</h1>
      <div className="list-carreras">
        {carreras.map((carrera) => (
          <div key={carrera.id} className="carrera-item bg-white p-4 rounded shadow mb-4 cursor-pointer" onClick={() => handleSelectCarrera(carrera.id)}>
            <h2 className="text-blue-500">{carrera.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
