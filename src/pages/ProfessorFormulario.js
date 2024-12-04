import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfessorFormulario = () => {
  const { ramoId } = useParams();
  const [respuestas, setRespuestas] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({
    nota_aprobacion: '',
    veces_curso: ''
  });
  const [selectedPostulantes, setSelectedPostulantes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredRespuestas = respuestas.filter((respuesta) => {
    return (
      (filters.nota_aprobacion === '' || parseFloat(respuesta.nota_aprobacion) >= parseFloat(filters.nota_aprobacion)) &&
      (filters.veces_curso === '' || respuesta.veces_curso === filters.veces_curso)
    );
  });

  const handleCheckboxChange = async (postulanteId, asignado) => {
    const token = localStorage.getItem('token');
    const newAsignadoState = !asignado;

    try {
      // Realizamos la petición para actualizar el estado de asignación
      await axios.put(`http://localhost:3001/api/ramos/${ramoId}/carrera/1/asignar-ayudante`, 
        { id: postulanteId, asignado: newAsignadoState },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Actualizamos el estado localmente para reflejar el cambio
      setRespuestas((prev) =>
        prev.map((respuesta) =>
          respuesta.id === postulanteId ? { ...respuesta, asignado: newAsignadoState } : respuesta
        )
      );
      setSuccessMessage(newAsignadoState ? 'Ayudante asignado correctamente' : 'Ayudante des-asignado correctamente');
      setShowPopup(true); // Mostrar el popup

      // Ocultar el popup después de 3 segundos
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error al cambiar el estado del postulante:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-4">Respuestas del Formulario</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* Popup de Asignación */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-lg font-bold text-green-600">Actualización Exitosa</h2>
            <p>{successMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="filters mb-4 flex flex-wrap justify-center items-center gap-4">
        <label className="flex flex-col items-start">
          Nota de Aprobación mínima:
          <input
            type="text"
            name="nota_aprobacion"
            value={filters.nota_aprobacion}
            onChange={(e) => {
              let valor = e.target.value.replace(/[^0-9.]/g, ''); // Solo permitir números y punto
              handleFilterChange({ target: { name: e.target.name, value: valor } });
            }}
            onBlur={(e) => {
              let valor = e.target.value;
              if (valor && valor.length === 1) {
                valor = `${valor}.0`;
              } else if (valor && !valor.includes('.')) {
                valor = `${valor[0]}.${valor.slice(1)}`;
              }
              handleFilterChange({ target: { name: e.target.name, value: valor } });
            }}
            className="border p-2 rounded ml-2"
            placeholder="X.X"
          />
        </label>
        <label className="flex flex-col items-start">
          Veces Cursado:
          <input
            type="text"
            name="veces_curso"
            value={filters.veces_curso}
            onChange={handleFilterChange}
            className="border p-2 rounded ml-2"
          />
        </label>
      </div>

      {/* Tabla de Respuestas */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Seleccionar</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Nombre</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Rut</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Correo</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Carrera</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Año de Ingreso</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Veces Curso</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Nota Aprobación</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">¿Ha realizado ayudantías?</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Experiencia en evaluaciones</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">¿Ha realizado tutorías?</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Talleres UMDU</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Nivel de Riesgo</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Motivos para ser Ayudante</th>
              <th className="border border-gray-300 p-2 text-xs md:text-sm">Bloques Disponibles</th>
            </tr>
          </thead>
          <tbody>
            {filteredRespuestas.map((respuesta) => (
              <tr key={respuesta.id}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={respuesta.asignado}
                    onChange={() => handleCheckboxChange(respuesta.id, respuesta.asignado)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{`${respuesta.nombres} ${respuesta.apellidos}`}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.rut}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.respondent_email}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.carrera}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.anio_ingreso}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.veces_curso}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.nota_aprobacion}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.ayudantias}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.experiencia_evaluaciones}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.tutorias}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.talleres_umdu}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.nivel_riesgo}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{respuesta.motivo_ayudantia}</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">
                  {typeof respuesta.bloques_disponibles === 'string'
                    ? Object.entries(JSON.parse(respuesta.bloques_disponibles)).map(([dia, bloques]) => (
                        <div key={dia}>
                          <strong>{dia.charAt(0).toUpperCase() + dia.slice(1)}:</strong> {bloques.join(', ')}
                        </div>
                      ))
                    : Object.entries(respuesta.bloques_disponibles).map(([dia, bloques]) => (
                        <div key={dia}>
                          <strong>{dia.charAt(0).toUpperCase() + dia.slice(1)}:</strong> {bloques.join(', ')}
                        </div>
                      ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorFormulario;
