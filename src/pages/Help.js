import React, { useState } from "react";

const carreras = ["Ingeniería Informática", "Ingeniería Civil", "Ingeniería en Software"];

const Ofertas = () => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [semester, setSemester] = useState(""); // Estado para el semestre seleccionado

  // Lista simulada de ramos/ofertas
  const ramos = [
    { sigla: "INF101", nombre: "Programación I", semestre: "primer semestre" },
    { sigla: "INF202", nombre: "Estructuras de Datos", semestre: "segundo semestre" },
    { sigla: "INF303", nombre: "Bases de Datos", semestre: "anual" },
    // Agrega más ramos según necesites
  ];

  // Filtrar ramos por búsqueda, carrera seleccionada y semestre
  const filteredRamos = ramos.filter((ramo) =>
    (ramo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ramo.sigla.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (ramo.semestre === semester || semester === "") // Agrega filtro por semestre
  );

  return (
    <div className="ofertas-container flex">
      <div className="carreras-list w-1/3 bg-white p-4">
        <h2 className="text-orange-500 text-xl font-bold">Gestión de ofertas para ayudantías</h2>
        <ul className="list-disc">
          {carreras.map((carrera, index) => (
            <li
              key={index}
              className={`cursor-pointer ${selectedCarrera === carrera ? "text-blue-500" : ""}`}
              onClick={() => setSelectedCarrera(carrera)}
            >
              {carrera}
            </li>
          ))}
        </ul>
      </div>

      <div className="ofertas-details w-2/3 bg-white p-4">
        {selectedCarrera ? (
          <div className="card p-4 rounded shadow">
            <h3 className="text-blue-500 text-lg font-bold">Ofertas para {selectedCarrera}</h3>

            <div className="activation-section my-4">
              <label className="text-gray-500 flex items-center">
                <input type="checkbox" className="mr-2" />
                Activar todos los formularios de inscripción
              </label>
            </div>

            <div className="search-filter flex items-center space-x-4 my-4">
              <input
                type="text"
                placeholder="Buscar por nombre o sigla"
                className="border p-2 rounded w-2/3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="border p-2 rounded"
                value={semester} // Controlado por el estado
                onChange={(e) => setSemester(e.target.value)} // Actualiza el semestre seleccionado
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
                    <input type="checkbox" className="mr-2" />
                    <span>{ramo.sigla} - {ramo.nombre}</span>
                  </div>
                  <button className="text-blue-500">ℹ️</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Selecciona una carrera para ver las ofertas.</p>
        )}
      </div>
    </div>
  );
};

export default Ofertas;
