import React, { useState } from "react";
import { FaChevronRight, FaSearch, FaTrashAlt, FaPlus } from "react-icons/fa";

const carreras = ["Ingeniería Informática", "Ingeniería Civil Informática", "Ingeniería Civil en Ciencia de Datos"];
const profesoresMock = [
  { nombre: "Juan Pérez", email: "juan.perez@universidad.edu" },
  { nombre: "Ana Gómez", email: "ana.gomez@universidad.edu" },
  { nombre: "Carlos Ruiz", email: "carlos.ruiz@universidad.edu" },
  // Agrega más profesores según necesites
];

const Ofertas = () => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [selectedRamo, setSelectedRamo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [semester, setSemester] = useState("");
  const [allOffersActivated, setAllOffersActivated] = useState(false);
  const [offerStates, setOfferStates] = useState({});
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState([]);
  const [searchProfessor, setSearchProfessor] = useState("");
  const [formLink, setFormLink] = useState("");
  const [linkOriginal, setLinkOriginal] = useState("");
  const [formLinkChanged, setFormLinkChanged] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const ramos = [
    { sigla: "INF1211", nombre: "FUNDAMENTOS DE ALGORITMOS", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "MAT1001", nombre: "FUNDAMENTOS DE MATEMATICAS PARA INGENIERIA", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    // Agrega más ramos según necesites
  ];

  const filteredRamos = ramos.filter(
    (ramo) =>
      ramo.carrera === selectedCarrera &&
      (ramo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ramo.sigla.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (ramo.semestre === semester || semester === "")
  );

  const handleActivateAllOffers = (e) => {
    const activate = e.target.checked;
    setAllOffersActivated(activate);

    const newOfferStates = {};
    filteredRamos.forEach((ramo) => {
      newOfferStates[ramo.sigla] = activate;
    });
    setOfferStates((prevState) => ({ ...prevState, ...newOfferStates }));
  };

  const handleOfferCheckboxChange = (sigla) => {
    const newOfferStates = {
      ...offerStates,
      [sigla]: !offerStates[sigla],
    };
    const allChecked = filteredRamos.every((ramo) => newOfferStates[ramo.sigla]);

    setOfferStates(newOfferStates);
    setAllOffersActivated(allChecked);
  };

  const handleRamoClick = (ramo) => {
    setSelectedRamo(ramo);
    setFormLink("");
    setLinkOriginal("");
    setProfesoresSeleccionados([]);
    setSearchProfessor("");
  };

  const handleProfesorSelect = (profesor) => {
    if (!profesoresSeleccionados.includes(profesor)) {
      setProfesoresSeleccionados([...profesoresSeleccionados, profesor]);
    }
    setSearchProfessor("");
  };

  const handleRemoveProfesor = (index) => {
    const newProfesores = profesoresSeleccionados.filter((_, i) => i !== index);
    setProfesoresSeleccionados(newProfesores);
  };

  const handleLinkChange = (e) => {
    setFormLink(e.target.value);
    setFormLinkChanged(e.target.value !== linkOriginal);
  };

  const handleSaveLink = () => {
    setLinkOriginal(formLink);
    setFormLinkChanged(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCancelLinkChange = () => {
    setFormLink(linkOriginal);
    setFormLinkChanged(false);
  };

  const filteredProfesores = profesoresMock.filter(
    (profesor) =>
      profesor.nombre.toLowerCase().includes(searchProfessor.toLowerCase()) ||
      profesor.email.toLowerCase().includes(searchProfessor.toLowerCase())
  );

  const handleBackToList = () => {
    setSelectedRamo(null); // Vuelve al listado de ramos por carrera
  };

  return (
    <div className="ofertas-container flex">
      <div className="carreras-list w-1/3 bg-white p-4">
        <h2 className="mb-10 text-orange-500 text-xl font-bold">Gestión de ofertas para ayudantías</h2>
        <ul className="list-none p-0">
          {carreras.map((carrera, index) => (
            <li
              key={index}
              className={`mb-4 cursor-pointer text-blue-500 flex items-center justify-between ${selectedCarrera === carrera ? "font-bold" : ""}`}
              onClick={() => {
                setSelectedCarrera(carrera);
                setSelectedRamo(null); // Reinicia la selección de ramo al cambiar de carrera
              }}
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
            <h3 className="text-gray-500 text-lg font-bold">{selectedRamo.nombre}</h3>

            <div className="profesores-section my-4">
              <label className="text-gray-500">Profesores que imparten el ramo:</label>
              <input
                type="text"
                className="border p-2 rounded w-full my-2"
                placeholder="Buscar y seleccionar profesor"
                value={searchProfessor}
                onChange={(e) => setSearchProfessor(e.target.value)}
              />
              {searchProfessor && (
                <ul className="border p-2 rounded max-h-32 overflow-y-auto">
                  {filteredProfesores.map((profesor, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-1 hover:bg-gray-200"
                      onClick={() => handleProfesorSelect(profesor)}
                    >
                      {profesor.nombre} ({profesor.email})
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-sm text-gray-500">Cantidad de profesores: {profesoresSeleccionados.length}</p>
              <ul>
                {profesoresSeleccionados.map((profesor, index) => (
                  <li key={index} className="flex items-center justify-between my-2">
                    {profesor.nombre}
                    <button className="text-red-500 ml-4" onClick={() => handleRemoveProfesor(index)}>
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
              <button className="text-blue-500 flex items-center mt-2">
                <FaPlus className="mr-2" /> Agregar otro docente
              </button>
            </div>

            <div className="form-link-section my-4">
              <label className="text-gray-500">Link de formulario de inscripción:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={formLink}
                  onChange={handleLinkChange}
                />
                <button
                  className={`ml-2 p-2 rounded text-white ${formLinkChanged ? "bg-blue-500" : "bg-gray-400"}`}
                  onClick={handleSaveLink}
                  disabled={!formLinkChanged}
                >
                  Guardar
                </button>
                <button className="ml-2 p-2 rounded text-white bg-red-500" onClick={handleCancelLinkChange}>
                  Cancelar
                </button>
              </div>
              <button
                  className="text-blue-500 mt-4"
                  onClick={handleBackToList}
                  >Volver al listado de ramos
              </button>
            </div>

            {formLinkChanged && <p className="text-yellow-500 mt-2">El contenido ha sido modificado.</p>}
            {showAlert && <p className="text-green-500 mt-2">Link formulario actualizado.</p>}

          </div>
        ) : selectedCarrera ? (
          <div>
            <div className="activation-section my-4 flex items-center">
              <label className="text-gray-500 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded-full border-2 border-orange-500 focus:ring-orange-500 focus:ring-opacity-50"
                  checked={allOffersActivated}
                  onChange={handleActivateAllOffers}
                  style={{ accentColor: "orange" }}
                />
                Activar todos los formularios de inscripción
              </label>
            </div>

            <div className="search-filter flex items-center space-x-4 my-4">
              <div className="relative w-2/3">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o sigla"
                  className="border p-2 rounded w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border p-2 rounded"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Todos los semestres</option>
                <option value="primer semestre">Primer semestre</option>
                <option value="segundo semestre">Segundo semestre</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            <div className="ramos-list max-h-64 overflow-y-auto">
              {filteredRamos.map((ramo, index) => (
                <div key={index} className="ramo-item flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 rounded-full border-2 border-orange-500 focus:ring-orange-500 focus:ring-opacity-50"
                      checked={!!offerStates[ramo.sigla]}
                      onChange={() => handleOfferCheckboxChange(ramo.sigla)}
                      style={{ accentColor: "orange" }}
                    />
                    <span className="text-cyan-500">{ramo.sigla} - {ramo.nombre}</span>
                  </div>
                  <button className="text-blue-500" onClick={() => handleRamoClick(ramo)}>ℹ️</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Seleccione una carrera para ver las ofertas.</p>
        )}
      </div>
    </div>
  );
};

export default Ofertas;
