import React, { useState, useEffect } from "react";
import { FaChevronRight, FaSearch, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import axios from 'axios';


const Ofertas = () => {
  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [selectedRamo, setSelectedRamo] = useState(null);
  const [ramoId, setRamoId] = useState(null);
  const [ramos, setRamos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [searchRamo, setSearchRamo] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [allOffersActivated, setAllOffersActivated] = useState({});
  const [offerStates, setOfferStates] = useState({});
  const [formLink, setFormLink] = useState("");


  const fetchCarreras = async () => {
    try {
      const response = await fetch("/api/carreras"); // Ajusta la ruta si es necesario
      if (!response.ok) throw new Error("Error al obtener las carreras");
      const data = await response.json();
      setCarreras(data);
    } catch (error) {
      console.error("Error al obtener las carreras:", error);
    }
  };

  const fetchRamos = async () => {
    if (selectedCarrera) {
      try {
        console.log("Solicitando ramos para la carrera:", selectedCarrera);
        const response = await fetch(`/api/ramos/${selectedCarrera.id}`);
        if (!response.ok) throw new Error("Error al obtener los ramos");
        const data = await response.json();
        console.log("Ramos obtenidos:", data);
        setRamos(data);
  
        // Recuperar el estado de las ofertas
        const offerStatesResponse = await fetch(`/api/estado-oferta/${selectedCarrera.id}`);
        if (offerStatesResponse.ok) {
          const offerStatesData = await offerStatesResponse.json();
          const newOfferStates = {};
          offerStatesData.forEach((offer) => {
            if (!newOfferStates[selectedCarrera.id]) {
              newOfferStates[selectedCarrera.id] = {};
            }
            newOfferStates[selectedCarrera.id][offer.ramo_id] = offer.activo;
          });
          setOfferStates(newOfferStates);
          
          // Determinar si todas las ofertas están activadas para el checkbox general
          const allActivated = data.every(ramo => newOfferStates[selectedCarrera.id]?.[ramo.id]);
          setAllOffersActivated((prev) => ({
            ...prev,
            [selectedCarrera.id]: allActivated,
          }));
        }
      } catch (error) {
        console.error("Error al obtener los ramos:", error);
        alert("Hubo un problema al cargar los ramos. Por favor, intenta nuevamente más tarde.");
      }
    } else {
      console.log("Carrera no seleccionada, no se solicitarán ramos.");
    }
  };
  

  useEffect(() => {
    //console.log("Carrera seleccionada:", selectedCarrera);
    fetchRamos();
  }, [selectedCarrera]);

  const fetchProfessors = async () => {
    try {
      const response = await fetch("/api/profesores");
      if (!response.ok) throw new Error("Error al obtener los profesores");
      const data = await response.json();
      setProfesores(data);
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
      alert("Error al cargar la lista de profesores");
    }
  };

  useEffect(() => {
    fetchCarreras(); // Obtiene la lista de carreras al cargar el componente
    fetchProfessors();
  }, []);


  const fetchRamoInformation = async (ramoId) => {
    try {
      const response = await fetch(`/api/ramos/${ramoId}/informacion`);
      if (!response.ok) throw new Error("Error al obtener la información del ramo");
      const data = await response.json();
      setSelectedProfessors(data.profesoresAsignados);
      setFormLink(data.enlaceFormulario);
    } catch (error) {
      console.error("Error al obtener la información del ramo:", error);
    }
  };

  useEffect(() => {
    if (selectedRamo) {
      fetchRamoInformation(selectedRamo.id);
    }
  }, [selectedRamo]);



  const handleAssignProfessor = async (profesorId) => {
    console.log("Intentando asignar profesor:", profesorId, "al ramo:", selectedRamo.id, "de la carrera:", selectedCarrera.id);
  
    if (selectedProfessors.some((prof) => prof.id === profesorId)) {
      alert("El profesor ya está asignado a este ramo.");
      return;
    }
    try {
      const response = await fetch(`/api/ramos/${selectedRamo.id}/carrera/${selectedCarrera.id}/asignar-profesor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profesor_id: profesorId }),
      });
      if (!response.ok) {
        throw new Error("Error en la asignación del profesor.");
      }
      console.log("Profesor asignado con ID:", profesorId);
      fetchRamoInformation(selectedRamo.id); // Refrescar la lista de profesores asignados
    } catch (error) {
      console.error("Error al asignar el profesor:", error);
    }
  };

  const handleRemoveProfessor = async (profesorId) => {
    if (!selectedCarrera || !selectedCarrera.id) {
      console.error("Carrera seleccionada no es válida:", selectedCarrera);
      return;
    }
    console.log("Selected Carrera ID:", selectedCarrera.id); // Verifica el ID de la carrera
    try {
      await fetch(`/api/ramos/${selectedRamo.id}/carrera/${selectedCarrera.id}/eliminar-profesor/${profesorId}`, {
        method: "DELETE",
      });
      console.log("Profesor eliminado con ID:", profesorId); // Log para verificar eliminación
      fetchRamoInformation(selectedRamo.id); // Refrescar la lista de profesores asignados
    } catch (error) {
      console.error("Error al eliminar el profesor del ramo:", error);
    }
  };

  const handleSaveLink = async () => {
    try {
      await fetch(`/api/ramos/${selectedRamo.id}/formulario`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enlace: formLink }),
      });
      alert("Enlace del formulario actualizado con éxito");
    } catch (error) {
      console.error("Error al guardar el enlace del formulario:", error);
    }
  };

  const handleActivateAllOffers = async (e) => {
    const activate = e.target.checked;
    setAllOffersActivated((prev) => ({ ...prev, [selectedCarrera.id]: activate }));
  
    const newOfferStates = { ...offerStates };
    if (!newOfferStates[selectedCarrera.id]) {
      newOfferStates[selectedCarrera.id] = {};
    }
  
    // Realiza una solicitud al backend para cada ramo para actualizar su estado
    try {
      for (const ramo of ramos) {
        // Actualiza el estado local
        newOfferStates[selectedCarrera.id][ramo.id] = activate;
  
        // Envía la solicitud al backend
        const response = await fetch(`/api/ramos/${ramo.id}/carrera/${selectedCarrera.id}/estado-oferta`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activo: activate }),
        });
  
        if (!response.ok) {
          console.error(`Error al actualizar el estado de la oferta para el ramo ${ramo.id}`);
          continue;
        }
      }
  
      // Actualiza el estado después de procesar todas las solicitudes
      setOfferStates(newOfferStates);
    } catch (error) {
      console.error("Error al activar/desactivar todas las ofertas:", error);
    }
  };
  
  
  const handleOfferCheckboxChange = async (ramo) => {
    try {
      const newState = !offerStates[selectedCarrera.id]?.[ramo.id];
  
      const response = await fetch(`/api/ramos/${ramo.id}/carrera/${selectedCarrera.id}/estado-oferta`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: newState }),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el estado de la oferta en el servidor");
      }
  
      console.log("Estado de la oferta actualizado en la base de datos:", newState);
  
      // Actualiza el estado después de confirmar el cambio
      setOfferStates((prev) => ({
        ...prev,
        [selectedCarrera.id]: {
          ...prev[selectedCarrera.id],
          [ramo.id]: newState,
        },
      }));
  
      // Verificar si todos los checkboxes están activos después del cambio
      const allRamosActive = Object.values({
        ...offerStates[selectedCarrera.id],
        [ramo.id]: newState,
      }).every((estado) => estado);
  
      // Actualizar el estado del "checkbox general"
      setAllOffersActivated((prev) => ({
        ...prev,
        [selectedCarrera.id]: allRamosActive,
      }));
    } catch (error) {
      console.error("Error al actualizar el estado de la oferta:", error);
    }
  };
  

  const filteredRamos = ramos.filter(
    (ramo) =>
      (ramo.nombre.toLowerCase().includes(searchRamo.toLowerCase()) ||
        ramo.sigla.toLowerCase().includes(searchRamo.toLowerCase())) &&
      (semesterFilter === "" || ramo.semestre === semesterFilter)
  );
  
  //console.log("Ramos filtrados para mostrar:", filteredRamos);
  
  async function getFormId(ramoId) {
    try {
      const response = await axios.get(`http://localhost:3001/api/ramos/${ramoId}/formulario`);
      return response.data.formId;
    } catch (error) {
      console.error('Error al obtener el formId:', error);
      throw new Error('No se pudo obtener el formId');
    }
  }
  

  // Nueva función para generar y descargar la hoja de cálculo
  const handleGenerateAndDownloadSheet = async (ramoId) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/generate_and_transfer/${ramoId}`);
      const spreadsheetId = response.data.spreadsheetId;
  
      // Generar el enlace de descarga y abrirlo en una nueva ventana
      const downloadUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error al generar y descargar la hoja de cálculo:', error);
    }
  };

  const handleSendSheetToProfessors = async (ramoId) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/ramos/${ramoId}/generar-y-enviar-hoja`);
      alert('Hoja de cálculo generada y enviada correctamente a los docentes.');
    } catch (error) {
      console.error('Error al enviar la hoja de cálculo a los docentes:', error);
      alert('Hubo un error al enviar la hoja de cálculo.');
    }
  };
  
  

  return (
    <div className="ofertas-container flex">
      <div className="carreras-list w-1/3 bg-white p-4">
        <h2 className="mb-10 text-orange-500 text-xl font-bold">Gestión de ofertas para ayudantías</h2>
        <ul className="list-none p-0">
          {carreras.map((carrera) => (
            <li
              key={carrera.id}
              className={`mb-4 cursor-pointer text-blue-500 flex items-center justify-between ${
                selectedCarrera?.id === carrera.id ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCarrera({ id: carrera.id, nombre: carrera.nombre })}
            >
              {carrera.nombre}
              <FaChevronRight className={`ml-2 ${selectedCarrera?.id === carrera.id ? "text-orange-500" : "text-black"}`} />
            </li>
          ))}
        </ul>
      </div>
  
      <div className="ofertas-details w-2/3 bg-white p-4">
        {selectedRamo ? (
          <div className="card p-4 rounded shadow">
            <h3 className="text-orange-500 text-lg font-bold">{`${selectedRamo.sigla} - ${selectedRamo.nombre}`}</h3>
            <div className="profesores-section my-4">
              <label className="text-gray-500">Seleccionar profesor:</label>
              <select
                className="border p-2 rounded w-full my-2"
                onChange={(e) => handleAssignProfessor(parseInt(e.target.value))}
                value=""
              >
                <option value="" disabled>
                  Selecciona un profesor
                </option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
                    {`${profesor.nombre} (${profesor.correo})`}
                  </option>
                ))}
              </select>
  
              <ul className="my-4">
                {selectedProfessors.map((profesor) => (
                  <li key={profesor.id} className="flex justify-between">
                    {`${profesor.nombre} (${profesor.correo})`}
                    <button className="text-red-500" onClick={() => handleRemoveProfessor(profesor.id)}>
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="form-link-section my-4">
              <label className="text-gray-500">Enlace de Google Forms:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={formLink}
                onChange={(e) => setFormLink(e.target.value)}
              />
            </div>
  
            <div className="buttons-section mt-4 flex space-x-4">
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSaveLink}>
                Guardar cambios
              </button>
              <button className="bg-red-500 text-white p-2 rounded" onClick={() => setFormLink("")}>
                Cancelar
              </button>
              <button className="bg-green-500 text-white p-2 rounded" onClick={() => handleGenerateAndDownloadSheet(selectedRamo.id)}>
                Descargar datos de hoja de cálculo
              </button>
              <button className="bg-yellow-500 text-white p-2 rounded" onClick={() => handleSendSheetToProfessors(selectedRamo.id)}>
                Enviar resultados a docentes
              </button>

            </div>
            <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => setSelectedRamo(null)}>
              Volver al listado de ramos
            </p>
          </div>
        ) : selectedCarrera ? (
          <div>
            <div className="activation-section my-4 flex items-center">
              <label className="text-gray-500 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded-full border-2 border-orange-500 focus:ring-orange-500 focus:ring-opacity-50"
                  checked={!!allOffersActivated[selectedCarrera.id]}
                  onChange={handleActivateAllOffers}
                  style={{ accentColor: "orange" }}
                />
                Activar todos los ramos
              </label>
            </div>
  
            <div className="search-filter flex items-center space-x-4 my-4">
              <div className="relative w-2/3">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o sigla"
                  className="border p-2 rounded w-full pl-10"
                  value={searchRamo}
                  onChange={(e) => setSearchRamo(e.target.value)}
                />
              </div>
              <select
                className="border p-2 rounded"
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
              >
                <option value="">Todos los semestres</option>
                <option value="primer semestre">Primer semestre</option>
                <option value="segundo semestre">Segundo semestre</option>
              </select>
            </div>
  
            <div className="ramos-list max-h-64 overflow-y-auto border-t border-b">
              {filteredRamos.map((ramo) => (
                <div key={ramo.id} className="ramo-item flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 rounded-full border-2 border-orange-500 focus:ring-orange-500 focus:ring-opacity-50"
                      checked={!!offerStates[selectedCarrera.id]?.[ramo.id]} // Asegúrate de verificar por `selectedCarrera.id` y `ramo.id`
                      onChange={() => handleOfferCheckboxChange(ramo)}
                      style={{ accentColor: "orange" }}
                    />
                    <span className="text-cyan-500">{`${ramo.sigla} - ${ramo.nombre}`}</span>
                  </div>
                  <button className="text-blue-500" onClick={() => setSelectedRamo(ramo)}>
                    <FaInfoCircle />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Seleccione una carrera para ver los ramos</p>
        )}
      </div>
    </div>
  );
};

export default Ofertas;
