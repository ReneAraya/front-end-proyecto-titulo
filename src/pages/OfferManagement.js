import React, { useState, useEffect } from "react";
import { FaChevronRight, FaSearch, FaTrashAlt } from "react-icons/fa";

const carreras = ["Ingeniería Informática", "Ingeniería Civil Informática", "Ingeniería Civil en Ciencia de Datos"];

const Ofertas = () => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [selectedRamo, setSelectedRamo] = useState(null);
  const [ramos, setRamos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [searchProfessor, setSearchProfessor] = useState("");
  const [searchRamo, setSearchRamo] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [allOffersActivated, setAllOffersActivated] = useState({});
  const [offerStates, setOfferStates] = useState({});
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [formLink, setFormLink] = useState("");

  const fetchRamos = async (carrera) => {
    try {
      const response = await fetch(`/api/ramos/${encodeURIComponent(carrera)}`);
      if (!response.ok) throw new Error("Error al obtener los ramos");
      const data = await response.json();
      setRamos(data);
    } catch (error) {
      console.error("Error al obtener los ramos:", error);
      alert("Hubo un problema al cargar los ramos. Por favor, intenta nuevamente más tarde.");
    }
  };

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

  const handleAssignProfessor = async (profesorId) => {
    try {
      const response = await fetch(`/api/ramos/${selectedRamo.id}/asignar-profesor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profesor_id: profesorId }),
      });
      if (!response.ok) throw new Error("Error al asignar el profesor al ramo");
      fetchRamoInformation(selectedRamo.id);
    } catch (error) {
      console.error("Error al asignar el profesor:", error);
      alert("Error al asignar el profesor al ramo");
    }
  };

  const handleRemoveProfessor = async (profesorId) => {
    try {
      const response = await fetch(`/api/ramos/${selectedRamo.id}/eliminar-profesor/${profesorId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el profesor del ramo");
      fetchRamoInformation(selectedRamo.id);
    } catch (error) {
      console.error("Error al eliminar el profesor del ramo:", error);
      alert("Error al eliminar el profesor del ramo");
    }
  };

  const handleSaveLink = async () => {
    try {
      const response = await fetch(`/api/ramos/${selectedRamo.id}/formulario`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enlace: formLink }),
      });
      if (!response.ok) throw new Error("Error al guardar el enlace del formulario");
      alert("Enlace del formulario actualizado con éxito");
    } catch (error) {
      console.error("Error al guardar el enlace del formulario:", error);
      alert("Error al guardar el enlace del formulario");
    }
  };

  const handleActivateAllOffers = (e) => {
    const activate = e.target.checked;
    setAllOffersActivated((prev) => ({ ...prev, [selectedCarrera]: activate }));
    const newOfferStates = { ...offerStates };
    ramos.forEach((ramo) => {
      if (!newOfferStates[selectedCarrera]) newOfferStates[selectedCarrera] = {};
      newOfferStates[selectedCarrera][ramo.sigla] = activate;
    });
    setOfferStates(newOfferStates);
  };

  const handleOfferCheckboxChange = (sigla) => {
    setOfferStates((prev) => ({
      ...prev,
      [selectedCarrera]: {
        ...prev[selectedCarrera],
        [sigla]: !prev[selectedCarrera]?.[sigla],
      },
    }));

    const allChecked = ramos.every((ramo) => offerStates[selectedCarrera]?.[ramo.sigla]);
    setAllOffersActivated((prev) => ({ ...prev, [selectedCarrera]: allChecked }));
  };

  useEffect(() => {
    fetchProfessors();
    if (selectedCarrera) {
      fetchRamos(selectedCarrera);
      setSelectedRamo(null);
    }
  }, [selectedCarrera]);

  useEffect(() => {
    if (selectedRamo) fetchRamoInformation(selectedRamo.id);
  }, [selectedRamo]);

  const filteredRamos = ramos.filter(
    (ramo) =>
      (ramo.nombre.toLowerCase().includes(searchRamo.toLowerCase()) ||
        ramo.sigla.toLowerCase().includes(searchRamo.toLowerCase())) &&
      (semesterFilter === "" || ramo.semestre === semesterFilter)
  );

  return (
    <div className="ofertas-container flex">
      <div className="carreras-list w-1/3 bg-white p-4">
        <h2 className="mb-10 text-orange-500 text-xl font-bold">Gestión de ofertas para ayudantías</h2>
        <ul className="list-none p-0">
          {carreras.map((carrera, index) => (
            <li
              key={index}
              className={`mb-4 cursor-pointer text-blue-500 flex items-center justify-between ${
                selectedCarrera === carrera ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCarrera(carrera)}
            >
              {carrera}
              <FaChevronRight className={`ml-2 ${selectedCarrera === carrera ? "text-orange-500" : "text-black"}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="ofertas-details w-2/3 bg-white p-4">
        {selectedRamo ? (
          <div className="card p-4 rounded shadow">
            <h3 className="text-orange-500 text-lg font-bold">{`${selectedRamo.sigla} - ${selectedRamo.nombre}`}</h3>
            <div className="profesores-section my-4">
              <label className="text-gray-500">Profesores asignados:</label>
              <ul>
                {selectedProfessors.map((profesor) => (
                  <li key={profesor.id} className="my-2 flex justify-between">
                    {`${profesor.nombre} (${profesor.correo})`}
                    <button className="text-red-500" onClick={() => handleRemoveProfessor(profesor.id)}>
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                className="border p-2 rounded w-full my-2"
                placeholder="Buscar profesor por nombre o correo"
                value={searchProfessor}
                onChange={(e) => setSearchProfessor(e.target.value)}
              />
              <ul>
                {profesores
                  .filter((profesor) =>
                    profesor.nombre.toLowerCase().includes(searchProfessor.toLowerCase()) ||
                    profesor.correo.toLowerCase().includes(searchProfessor.toLowerCase())
                  )
                  .map((profesor) => (
                    <li
                      key={profesor.id}
                      className="cursor-pointer p-1 hover:bg-gray-200"
                      onClick={() => handleAssignProfessor(profesor.id)}
                    >
                      {`${profesor.nombre} (${profesor.correo})`}
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
            </div>
            <p
              className="mt-4 text-blue-500 cursor-pointer"
              onClick={() => setSelectedRamo(null)}
            >
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
                  checked={!!allOffersActivated[selectedCarrera]}
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
                      checked={!!offerStates[selectedCarrera]?.[ramo.sigla]}
                      onChange={() => handleOfferCheckboxChange(ramo.sigla)}
                      style={{ accentColor: "orange" }}
                    />
                    <span className="text-cyan-500">{`${ramo.sigla} - ${ramo.nombre}`}</span>
                  </div>
                  <button className="text-blue-500" onClick={() => setSelectedRamo(ramo)}>
                    ℹ️
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
