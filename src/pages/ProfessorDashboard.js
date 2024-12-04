import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs';
import { useProfessorContext } from '../context/ProfessorContext';

const ProfessorDashboard = () => {
  const [carreras, setCarreras] = useState([]);
  const navigate = useNavigate();
  const { setNombreCarrera } = useProfessorContext();

  useEffect(() => {
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

  const handleSelectCarrera = (carrera) => {
    // Limpiar nombre de carrera anterior y establecer el nuevo
    setNombreCarrera(carrera.nombre);
    navigate(`/profesor/carrera/${carrera.id}/ramos`, { state: { nombreCarrera: carrera.nombre } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start mb-4">
        <Breadcrumbs paths={[{ name: 'Carreras', path: '' }]} />
      </div>
      <h1 style={{ color: '#e87e04' }} className="text-3xl font-bold text-center mb-4">Dashboard del Profesor</h1>
      <div className="list-carreras">
        {carreras.map((carrera) => (
          <div
            key={carrera.id}
            className="carrera-item bg-white p-4 rounded shadow mb-4 cursor-pointer"
            onClick={() => handleSelectCarrera(carrera)}
          >
            <h2 className="text-blue-500">{carrera.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
