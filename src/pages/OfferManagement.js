import React, { useState, useEffect } from "react";
import { FaChevronRight, FaSearch, FaTrashAlt, FaPlus } from "react-icons/fa";

const carreras = ["Ingeniería Informática", "Ingeniería Civil Informática", "Ingeniería Civil en Ciencia de Datos"];

const Ofertas = () => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [selectedRamo, setSelectedRamo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [semester, setSemester] = useState("");
  const [allOffersActivated, setAllOffersActivated] = useState({});
  const [offerStates, setOfferStates] = useState({});
  const [ramos, setRamos] = useState([]);

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

  useEffect(() => {
    if (selectedCarrera) {
      fetchRamos(selectedCarrera);
    }
  }, [selectedCarrera]);

  const filteredRamos = ramos.filter(
    (ramo) =>
      (ramo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ramo.sigla.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (ramo.semestre === semester || semester === "")
  );

  const handleActivateAllOffers = (e) => {
    const activate = e.target.checked;
    setAllOffersActivated((prev) => ({
      ...prev,
      [selectedCarrera]: activate,
    }));

    const newOfferStates = { ...offerStates };
    filteredRamos.forEach((ramo) => {
      if (!newOfferStates[selectedCarrera]) {
        newOfferStates[selectedCarrera] = {};
      }
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

    const allChecked = filteredRamos.every((ramo) => offerStates[selectedCarrera]?.[ramo.sigla]);
    setAllOffersActivated((prev) => ({
      ...prev,
      [selectedCarrera]: allChecked,
    }));
  };

  const handleRamoClick = (ramo) => {
    setSelectedRamo(ramo);
  };

  const handleBackToList = () => {
    setSelectedRamo(null);
  };

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
              onClick={() => {
                setSelectedCarrera(carrera);
                setSelectedRamo(null);
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
            <button className="text-blue-500 mt-4" onClick={handleBackToList}>
              Volver al listado de ramos
            </button>
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
              <select className="border p-2 rounded" value={semester} onChange={(e) => setSemester(e.target.value)}>
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
                      checked={!!offerStates[selectedCarrera]?.[ramo.sigla]}
                      onChange={() => handleOfferCheckboxChange(ramo.sigla)}
                      style={{ accentColor: "orange" }}
                    />
                    <span className="text-cyan-500">
                      {ramo.sigla} - {ramo.nombre}
                    </span>
                  </div>
                  <button className="text-blue-500" onClick={() => handleRamoClick(ramo)}>
                    ℹ️
                  </button>
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
