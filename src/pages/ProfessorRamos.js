import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs';
import { useProfessorContext } from '../context/ProfessorContext';

const ProfessorRamos = () => {
  const { carreraId } = useParams();
  const location = useLocation();
  const { nombreCarrera, setNombreCarrera } = useProfessorContext();
  const [ramos, setRamos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRamos = async () => {
      try {
        const responseRamos = await axios.get(`http://localhost:3001/api/profesor/carrera/${carreraId}/ramos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRamos(responseRamos.data);
      } catch (error) {
        console.error('Error al obtener los ramos o la carrera:', error);
      }
    };

    // Establecer el nombre de la carrera si es que no está configurado o si el usuario navegó a una nueva carrera
    if (location.state?.nombreCarrera) {
      setNombreCarrera(location.state.nombreCarrera);
    }

    fetchRamos();
  }, [carreraId, location.state, setNombreCarrera]);

  const handleSelectRamo = (ramoId) => {
    navigate(`/profesor/ramo/${ramoId}/carrera/${carreraId}/formulario`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start mb-4">
        {nombreCarrera && (
          <Breadcrumbs
            paths={[
              { name: 'Carreras', path: '/profesor/dashboard' },
              { name: `Ramos de carrera - ${nombreCarrera}`, path: '' },
            ]}
          />
        )}
      </div>
      <h1 style={{ color: '#e87e04' }} className="text-3xl font-bold text-center mb-4">Ramos Asignados - {nombreCarrera}</h1>
      <div className="list-ramos">
        {ramos.map((ramo) => (
          <div
            key={ramo.id}
            className="ramo-item bg-white p-4 rounded shadow mb-4 cursor-pointer"
            onClick={() => handleSelectRamo(ramo.id)}
          >
            <h2 className="text-blue-500">{ramo.sigla} - {ramo.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorRamos;
