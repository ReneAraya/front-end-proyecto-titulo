import React, { useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";

const carreras = ["Ingeniería Informática", "Ingeniería Civil Informática", "Ingeniería Civil en Ciencia de Datos"];

const Ofertas = () => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [semester, setSemester] = useState("");
  const [allOffersActivated, setAllOffersActivated] = useState(false); // Estado para activar todas las ofertas
  const [offerStates, setOfferStates] = useState({}); // Estado de cada checkbox por oferta

  // Lista simulada de ramos/ofertas
  const ramos = [
    // Ingenieria Informatica
    { sigla: "INF1211", nombre: "FUNDAMENTOS DE ALGORITMOS", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "INF1212", nombre: "INTRODUCCION A LA INGENIERIA INFORMATICA", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "INF1413", nombre: "BIENESTAR Y APRENDIZAJE UNIVERSITARIO", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "MAT1001", nombre: "FUNDAMENTOS DE MATEMATICAS PARA INGENIERIA", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "FIN100-14", nombre: "DESARROLLO INTEGRAL Y COMUNICACION PARA INGENIERIA", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "INF1214", nombre: "FUNDAMENTOS DE PROGRAMACION", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "MAT1002", nombre: "CALCULO DIFERENCIAL E INTEGRAL", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "MAT1004", nombre: "ALGEBRA LINEAL", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "FIS1002", nombre: "FISICA PARA INGENIERIA", carrera: "Ingeniería Informática", semestre: "primer semestre" },
    { sigla: "INF2121", nombre: "ESTADISTICA COMPUTACIONAL", carrera: "Ingeniería Informática", semestre: "segundo semestre" },
    { sigla: "INF2223", nombre: "ESTRUCTURA DE DATOS", carrera: "Ingeniería Informática", semestre: "segundo semestre" },
    { sigla: "INF2322", nombre: "HARDWARE Y SISTEMAS OPERATIVOS", carrera: "Ingeniería Informática", semestre: "segundo semestre" },
    { sigla: "INF2235", nombre: "BASE DE DATOS", carrera: "Ingeniería Informática", semestre: "segundo semestre" },
    { sigla: "INF2236", nombre: "PROGRAMACION AVANZADA", carrera: "Ingeniería Informática", semestre: "segundo semestre" },
    { sigla: "INF2237", nombre: "INGENIERIA DE SOFTWARE", carrera: "Ingeniería Informática", semestre: "segundo semestre" },
    { sigla: "INF2324", nombre: "REDES DE COMPUTADORES", carrera: "Ingeniería Informática", semestre: "tercer semestre" },
    { sigla: "ING9001", nombre: "INGLES 1", carrera: "Ingeniería Informática", semestre: "tercer semestre" },
    { sigla: "INF3132", nombre: "ECONOMIA Y FINANZAS", carrera: "Ingeniería Informática", semestre: "tercer semestre" },
    { sigla: "INF3233", nombre: "INTELIGENCIA ARTIFICIAL", carrera: "Ingeniería Informática", semestre: "cuarto semestre" },
    { sigla: "INF3234", nombre: "MODELAMIENTO DE SOFTWARE", carrera: "Ingeniería Informática", semestre: "cuarto semestre" },
    { sigla: "INF3235", nombre: "INGENIERIA DE REQUERIMIENTOS", carrera: "Ingeniería Informática", semestre: "cuarto semestre" },
    { sigla: "ING9002", nombre: "INGLES 2", carrera: "Ingeniería Informática", semestre: "cuarto semestre" },
    { sigla: "INF3136", nombre: "OPTIMIZACION", carrera: "Ingeniería Informática", semestre: "quinto semestre" },
    { sigla: "INF3245", nombre: "INGENIERIA WEB Y MOVIL", carrera: "Ingeniería Informática", semestre: "quinto semestre" },
    { sigla: "INF3246", nombre: "EXPERIENCIA DEL USUARIO", carrera: "Ingeniería Informática", semestre: "quinto semestre" },
    { sigla: "INF3541", nombre: "TALLER DE BASE DE DATOS", carrera: "Ingeniería Informática", semestre: "quinto semestre" },
    { sigla: "ING9003", nombre: "INGLES 3", carrera: "Ingeniería Informática", semestre: "sexto semestre" },
    { sigla: "INF4353", nombre: "CIBERSEGURIDAD", carrera: "Ingeniería Informática", semestre: "sexto semestre" },
    { sigla: "INF4457", nombre: "TECNOLOGIAS EMERGENTES", carrera: "Ingeniería Informática", semestre: "sexto semestre" },
    { sigla: "INF4552", nombre: "TALLER DE INGENIERIA DE SOFTWARE", carrera: "Ingeniería Informática", semestre: "sexto semestre" },
    { sigla: "INF4556", nombre: "SEMINARIO DE TITULO", carrera: "Ingeniería Informática", semestre: "séptimo semestre" },
    { sigla: "ING9004", nombre: "INGLES 4", carrera: "Ingeniería Informática", semestre: "séptimo semestre" },
    { sigla: "INF4458", nombre: "NEGOCIOS, INNOVACION Y EMPRENDIMIENTO", carrera: "Ingeniería Informática", semestre: "séptimo semestre" },
    { sigla: "INF4459", nombre: "LEGISLACION, ETICA Y TECNOLOGIA", carrera: "Ingeniería Informática", semestre: "séptimo semestre" },
    { sigla: "INF4560", nombre: "PROYECTO DE TITULO", carrera: "Ingeniería Informática", semestre: "octavo semestre" },
    // Ingenieria Civil Informatica
    { sigla: "ICI1241", nombre: "Fundamentos de algoritmos", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "ICI1243", nombre: "Introducción a la ingeniería informática", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "ICI1458", nombre: "Bienestar y aprendizaje universitario", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "MAT1001", nombre: "Fundamentos de matemáticas para ingeniería", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "FIN100-14", nombre: "Desarrollo integral y comunicación para ingeniería", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "ICI1242", nombre: "Fundamentos de programación", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "MAT1002", nombre: "Cálculo diferencial e integral", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "MAT1004", nombre: "Álgebra lineal", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "FIS1002", nombre: "Física para ingeniería", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "ICI2145", nombre: "Análisis inteligente de datos", carrera: "Ingeniería Civil Informática", semestre: "segundo semestre" },
    { sigla: "ICI2240", nombre: "Estructura de datos", carrera: "Ingeniería Civil Informática", semestre: "segundo semestre" },
    { sigla: "MAT1003", nombre: "Cálculo en varias variables", carrera: "Ingeniería Civil Informática", semestre: "segundo semestre" },
    { sigla: "FIS2120", nombre: "Física electromagnetismo", carrera: "Ingeniería Civil Informática", semestre: "segundo semestre" },
    { sigla: "ICI2141", nombre: "Métodos numéricos", carrera: "Ingeniería Civil Informática", semestre: "segundo semestre" },
    { sigla: "ICI2241", nombre: "Programación avanzada", carrera: "Ingeniería Civil Informática", semestre: "tercer semestre" },
    { sigla: "ICI2242", nombre: "Análisis y diseño de algoritmos", carrera: "Ingeniería Civil Informática", semestre: "tercer semestre" },
    { sigla: "ING9001", nombre: "Inglés 1", carrera: "Ingeniería Civil Informática", semestre: "primer semestre" },
    { sigla: "FIS3149", nombre: "Física moderna", carrera: "Ingeniería Civil Informática", semestre: "tercer semestre" },
    { sigla: "ICI3240", nombre: "Base de datos", carrera: "Ingeniería Civil Informática", semestre: "tercer semestre" },
    { sigla: "ICI3244", nombre: "Inteligencia artificial", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ICI3245", nombre: "Autómatas y compiladores", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ICI3344", nombre: "Hardware y sistemas operativos", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ING9002", nombre: "Inglés 2", carrera: "Ingeniería Civil Informática", semestre: "segundo semestre" },
    { sigla: "ICA4121", nombre: "Administración de empresas", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ICI3150", nombre: "Ciencia y tecnología", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ICI3170", nombre: "Estadística computacional", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ICI3246", nombre: "Modelamiento de software", carrera: "Ingeniería Civil Informática", semestre: "quinto semestre" },
    { sigla: "ICI3343", nombre: "Redes de computadores", carrera: "Ingeniería Civil Informática", semestre: "quinto semestre" },
    { sigla: "ING9003", nombre: "Inglés 3", carrera: "Ingeniería Civil Informática", semestre: "tercer semestre" },
    { sigla: "ICI4150", nombre: "Robótica y sistemas autónomos", carrera: "Ingeniería Civil Informática", semestre: "sexto semestre" },
    { sigla: "ICI4151", nombre: "Optimización", carrera: "Ingeniería Civil Informática", semestre: "sexto semestre" },
    { sigla: "ICI4244", nombre: "Ingeniería de software", carrera: "Ingeniería Civil Informática", semestre: "sexto semestre" },
    { sigla: "ICI4247", nombre: "Ingeniería web y móvil", carrera: "Ingeniería Civil Informática", semestre: "séptimo semestre" },
    { sigla: "ICI4344", nombre: "Computación paralela y distribuida", carrera: "Ingeniería Civil Informática", semestre: "séptimo semestre" },
    { sigla: "ING9004", nombre: "Inglés 4", carrera: "Ingeniería Civil Informática", semestre: "cuarto semestre" },
    { sigla: "ICA4161", nombre: "Economía y finanzas", carrera: "Ingeniería Civil Informática", semestre: "séptimo semestre" },
    { sigla: "ICI4248", nombre: "Ingeniería de requerimientos", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI4370", nombre: "Ciberseguridad", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI4541", nombre: "Taller de base de datos", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5247", nombre: "Experiencia de usuario", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5441", nombre: "Administración de proyectos informáticos", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5442", nombre: "Tecnologías emergentes", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5475", nombre: "Negocios, innovación y emprendimiento", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5545", nombre: "Taller de ingeniería de software", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5345", nombre: "Legislación ética y tecnológica", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5444", nombre: "Taller de formulación de proyectos informáticos", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5476", nombre: "Taller de liderazgo y trabajo en equipo", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI5541", nombre: "Seminario de título", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },
    { sigla: "ICI6541", nombre: "Proyecto de título", carrera: "Ingeniería Civil Informática", semestre: "octavo semestre" },

    // Ingenieria Civil en Ciencia de Datos
    { sigla: "ICD1140", nombre: "INTRODUCCION A LA INGENIERIA EN CIENCIA DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "ICD1341", nombre: "FUNDAMENTOS DE ALGORITMOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "ICD1401", nombre: "BIENESTAR Y APRENDIZAJE UNIVERSITARIO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "MAT1001", nombre: "FUNDAMENTOS DE MATEMATICAS PARA INGENIERIA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "FIN100-14", nombre: "DESARROLLO INTEGRAL Y COMUNICACION PARA INGENIERIA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "ICD1342", nombre: "FUNDAMENTOS DE PROGRAMACION", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "MAT1002", nombre: "CALCULO DIFERENCIAL E INTEGRAL", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "MAT1004", nombre: "ALGEBRA LINEAL", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "FIS1002", nombre: "FISICA PARA INGENIERIA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "primer semestre" },
    { sigla: "ICD2243", nombre: "INTRODUCCION AL ANALISIS DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "segundo semestre" },
    { sigla: "ICD2344", nombre: "ESTRUCTURA DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "segundo semestre" },
    { sigla: "MAT1003", nombre: "CALCULO EN VARIAS VARIABLES", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "segundo semestre" },
    { sigla: "FIS2120", nombre: "FISICA ELECTROMAGNETISMO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "segundo semestre" },
    { sigla: "ICD2145", nombre: "CIENCIA Y TECNOLOGIA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "segundo semestre" },
    { sigla: "ICD2346", nombre: "PARADIGMAS DE PROGRAMACION", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "tercer semestre" },
    { sigla: "ICD2347", nombre: "ANALISIS Y DISEÑO DE ALGORITMOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "tercer semestre" },
    { sigla: "ING9001", nombre: "INGLES 1", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "tercer semestre" },
    { sigla: "MAT3105", nombre: "ECUACIONES DIFERENCIALES", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "tercer semestre" },
    { sigla: "FIS3149", nombre: "FISICA MODERNA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "tercer semestre" },
    { sigla: "ICD3148", nombre: "ESTADISTICA COMPUTACIONAL", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "cuarto semestre" },
    { sigla: "ICD3149", nombre: "TEORIA DE SISTEMAS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "cuarto semestre" },
    { sigla: "ICD3350", nombre: "BASE DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "cuarto semestre" },
    { sigla: "ING9002", nombre: "INGLES 2", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "cuarto semestre" },
    { sigla: "ICD3151", nombre: "METODOS NUMERICOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "quinto semestre" },
    { sigla: "ICD3152", nombre: "ESTADISTICA AVANZADA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "quinto semestre" },
    { sigla: "ICD3153", nombre: "INTELIGENCIA ARTIFICIAL", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "quinto semestre" },
    { sigla: "ICD3255", nombre: "ANALISIS INTELIGENTE DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "quinto semestre" },
    { sigla: "ICD3354", nombre: "HARDWARE Y SISTEMAS OPERATIVOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "quinto semestre" },
    { sigla: "ING9003", nombre: "INGLES 3", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "quinto semestre" },
    { sigla: "ICA2121", nombre: "ADMINISTRACION DE EMPRESAS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "sexto semestre" },
    { sigla: "ICD4156", nombre: "OPTIMIZACION 1", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "sexto semestre" },
    { sigla: "ICD4157", nombre: "ANALISIS DE SERIES DE TIEMPO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "sexto semestre" },
    { sigla: "ICD4258", nombre: "APRENDIZAJE AUTOMATICO 1", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "séptimo semestre" },
    { sigla: "ICD4359", nombre: "ALMACENAMIENTO Y RECUPERACION DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "séptimo semestre" },
    { sigla: "ING9004", nombre: "INGLES 4", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "séptimo semestre" },
    { sigla: "ICD4160", nombre: "OPTIMIZACION 2", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "séptimo semestre" },
    { sigla: "ICD4262", nombre: "APRENDIZAJE AUTOMATICO 2", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "octavo semestre" },
    { sigla: "ICD4363", nombre: "REDES DE COMPUTADORES", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "octavo semestre" },
    { sigla: "ICD4461", nombre: "METODOLOGIA DE DESARROLLO DE SOFTWARE", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "octavo semestre" },
    { sigla: "ICA5164", nombre: "ECONOMIA Y FINANZAS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "octavo semestre" },
    { sigla: "ICD5167", nombre: "CIENCIA DE REDES", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "noveno semestre" },
    { sigla: "ICD5366", nombre: "COMPUTACION PARALELA Y DISTRIBUIDA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "noveno semestre" },
    { sigla: "ICD5465", nombre: "VISUALIZACION DE DATOS", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "noveno semestre" },
    { sigla: "ICD5468", nombre: "TALLER DE LIDERAZGO Y TRABAJO EN EQUIPO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "noveno semestre" },
    { sigla: "ICD5369", nombre: "BIG DATA", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "décimo semestre" },
    { sigla: "ICD5471", nombre: "NEGOCIOS, INNOVACION Y EMPRENDIMIENTO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "décimo semestre" },
    { sigla: "ICD5570", nombre: "SEMINARIO DE TITULO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "décimo semestre" },
    { sigla: "ICD6473", nombre: "PRIVACIDAD, ETICA Y SEGURIDAD", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "décimo semestre" },
    { sigla: "ICD6572", nombre: "PROYECTO DE TITULO", carrera: "Ingeniería Civil en Ciencia de Datos", semestre: "décimo semestre" },

  ];

  // Filtrar ramos por carrera, búsqueda y semestre
  const filteredRamos = ramos.filter(
    (ramo) =>
      ramo.carrera === selectedCarrera &&
      (ramo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ramo.sigla.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (ramo.semestre === semester || semester === "")
  );

  // Manejar el cambio de estado para activar o desactivar todas las ofertas
  const handleActivateAllOffers = (e) => {
    const activate = e.target.checked;
    setAllOffersActivated(activate);

    // Cambia el estado de todas las ofertas de la carrera seleccionada
    const newOfferStates = {};
    filteredRamos.forEach((ramo) => {
      newOfferStates[ramo.sigla] = activate;
    });
    setOfferStates((prevState) => ({ ...prevState, ...newOfferStates }));
  };

  // Manejar el cambio de estado para cada oferta individual
  const handleOfferCheckboxChange = (sigla) => {
    setOfferStates((prevState) => ({
      ...prevState,
      [sigla]: !prevState[sigla], // Cambia el estado del checkbox de la oferta seleccionada
    }));
  };

  return (
    <div className="ofertas-container flex">
      <div className="carreras-list w-1/3 bg-white p-4">
        <h2 className="text-orange-500 text-xl font-bold">Gestión de ofertas para ayudantías</h2>
        <ul className="list-disc">
          {carreras.map((carrera, index) => (
            <li
              key={index}
              className={`cursor-pointer text-blue-500 flex items-center justify-between ${selectedCarrera === carrera ? "font-bold" : ""}`}
              onClick={() => {
                setSelectedCarrera(carrera);
                setAllOffersActivated(false); // Reinicia la activación de todas las ofertas al cambiar de carrera
              }}
            >
              {carrera}
              <FaChevronRight className={`ml-2 ${selectedCarrera === carrera ? "text-orange-500" : "text-black"}`} />
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
