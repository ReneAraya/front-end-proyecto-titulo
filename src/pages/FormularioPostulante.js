import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const FormularioPostulante = () => {
  const { ramoId, carreraId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const respondent_email = location.state?.email || '';

  const [ramoNombre, setRamoNombre] = useState('');
  const [carreraNombre, setCarreraNombre] = useState('');

  // Estado para confirmar si el formulario se envió con éxito
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    respondent_email,
    rut: '',
    nombres: '',
    apellidos: '',
    carrera: '',
    anio_ingreso: '',
    veces_curso: '',
    nota_aprobacion: '',
    ayudantias: '',
    experiencia_evaluaciones: '',
    tutorias: '',
    talleres_umdu: '',
    nivel_riesgo: '',
    motivo_ayudantia: '',
    bloques_disponibles: {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
    },
  });

  // Obtener el nombre del ramo y la carrera
  useEffect(() => {
    const fetchRamoData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/ramos/${ramoId}/carrera/${carreraId}`);
        if (response.status === 200) {
          setRamoNombre(response.data.ramo_nombre);
          setCarreraNombre(response.data.carrera_nombre);
        }
      } catch (error) {
        console.error('Error al obtener los datos del ramo:', error);
      }
    };
    fetchRamoData();
  }, [ramoId, carreraId]);

  // Función para formatear el RUT
  const handleRutChange = (e) => {
    let value = e.target.value.replace(/[^0-9kK]/g, ''); // Solo permitir números y la letra 'k' o 'K' para el dígito verificador.
    
    // Si el largo es mayor a 8 dígitos, insertar un guion
    if (value.length > 8) {
      value = `${value.slice(0, 8)}-${value.slice(8)}`;
    }
    
    setFormData((prevData) => ({
      ...prevData,
      rut: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (dia, bloque) => {
    const nuevosBloques = [...(formData.bloques_disponibles[dia.toLowerCase()] || [])];
    if (nuevosBloques.includes(bloque)) {
      const index = nuevosBloques.indexOf(bloque);
      nuevosBloques.splice(index, 1);
    } else {
      nuevosBloques.push(bloque);
    }

    setFormData({
      ...formData,
      bloques_disponibles: {
        ...formData.bloques_disponibles,
        [dia.toLowerCase()]: nuevosBloques,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/formulario/responder', {
        ...formData,
        ramo_id: parseInt(ramoId),
        carrera_id: parseInt(carreraId),
        anio: 2025,
        semestre: 'primer semestre',
      });

      // Si la respuesta es exitosa, mostrar el mensaje de confirmación
      if (response.status === 200) {
        setFormSubmitted(true);
        setTimeout(() => {
          navigate('/'); // Redirigir a Home después de 3 segundos
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario. Inténtelo de nuevo.');
    }
  };

  if (formSubmitted) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Se registró correctamente su postulación a esta ayudantía</h2>
        <p>Será redirigido a la página principal en unos momentos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Formulario de Postulación para Ayudantía: {ramoNombre} - {carreraNombre}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Campos de información del postulante */}
        <label className="block mb-2">
          Correo Institucional:
          <input
            type="email"
            name="respondent_email"
            value={formData.respondent_email}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            readOnly
          />
        </label>
        <label className="block mb-2">
          RUT:
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleRutChange}
            className="border p-2 rounded w-full mb-4"
            placeholder="xxxxxxxx-x"
            maxLength="10"
          />
        </label>
        <label className="block mb-2">
          Nombres (con sus mayúsculas):
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
          />
        </label>
        <label className="block mb-2">
          Apellidos (con sus mayúsculas):
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
          />
        </label>
        <label className="block mb-2">
          Carrera:
          <select
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Seleccione una carrera</option>
            <option value="Ingeniería Informática">Ingeniería Informática</option>
            <option value="Ingeniería Civil Informática">Ingeniería Civil Informática</option>
            <option value="Ingeniería Civil en Ciencia de Datos">Ingeniería Civil en Ciencia de Datos</option>
          </select>
        </label>

        <label className="block mb-2">
          Año de Ingreso:
          <input
            type="text"
            name="anio_ingreso"
            value={formData.anio_ingreso}
            onChange={(e) => {
              // Validar que solo haya números y que la longitud sea de máximo 4 caracteres
              const valor = e.target.value;
              if (/^\d*$/.test(valor) && valor.length <= 4) {
                handleChange(e);
              }
            }}
            placeholder="Ej: 2022"
            className="border p-2 rounded w-full mb-4"
          />
        </label>

        {/* Nueva pregunta: ¿Cuántas veces cursó el ramo al que postula? */}
        <label className="block mb-2">
          ¿Cuántas veces cursó el ramo al que postula como ayudante?
          <input
            type="text"
            name="veces_curso"
            value={formData.veces_curso}
            onChange={(e) => {
              // Validar que solo haya un número de un dígito
              const valor = e.target.value;
              if (/^\d$/.test(valor)) {
                handleChange(e);
              }
            }}
            placeholder="Ej: 1"
            className="border p-2 rounded w-full mb-4"
          />
        </label>


        {/* Nota con la cual aprobó el ramo al que postula */}
        <label className="block mb-2">
          Nota con la cual aprobó el ramo al que postula:
          <input
            type="text"
            name="nota_aprobacion"
            value={formData.nota_aprobacion}
            onChange={(e) => {
              // Validar que solo haya números y no más de un dígito decimal.
              const valor = e.target.value;
              if (/^\d*\.?\d*$/.test(valor)) {
                handleChange(e);
              }
            }}
            placeholder="Ej: 6.0"
            className="border p-2 rounded w-full mb-4"
          />
        </label>

        {/* Ayudantías en otros ramos */}
        <label className="block mb-2">
          ¿Ha realizado ayudantías en otros ramos? Si es así, ¿En cuáles? Indique, en orden, asignatura, carrera, semestre y año:
          <textarea
            name="ayudantias"
            value={formData.ayudantias}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            rows="4" // Define la altura del textarea inicial
            style={{ resize: 'vertical' }} // Permite que el usuario pueda ajustar la altura
          />
        </label>

        {/* Experiencia en evaluaciones */}
        <label className="block mb-2">
          Si ha realizado ayudantías, ¿Tiene experiencia creando o realizando evaluaciones para estas mismas?
          <textarea
            name="experiencia_evaluaciones"
            value={formData.experiencia_evaluaciones}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            rows="4" // Define la altura del textarea inicial
            style={{ resize: 'vertical' }} // Permite que el usuario pueda ajustar la altura
          />
        </label>

        {/* Tutorías en otros ramos */}
        <label className="block mb-2">
          ¿Ha realizado tutorías en otros ramos? Si es así, ¿En cuáles? Indique asignatura, carrera, semestre y año:
          <textarea
            name="tutorias"
            value={formData.tutorias}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            rows="4" // Define la altura del textarea inicial
            style={{ resize: 'vertical' }} // Permite que el usuario pueda ajustar la altura
          />
        </label>

        {/* Talleres de formación UMDU */}
        <label className="block mb-2">
          ¿Ha participado en los talleres de formación de la UMDU? Si es así, ¿En cuáles?
          <textarea
            type="text"
            name="talleres_umdu"
            value={formData.talleres_umdu}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            rows="4" // Define la altura del textarea inicial
            style={{ resize: 'vertical' }} // Permite que el usuario pueda ajustar la altura
          />
        </label>

        {/* Nivel de riesgo académico */}
        <label className="block mb-2">
          ¿Cuál es su nivel de riesgo académico (IRA)?
          <div className="mb-4">
            <label className="block">
              <input
                type="radio"
                name="nivel_riesgo"
                value="Bajo"
                checked={formData.nivel_riesgo === "Bajo"}
                onChange={handleChange}
                className="mr-2"
              />
              Bajo
            </label>
            <label className="block">
              <input
                type="radio"
                name="nivel_riesgo"
                value="Medio"
                checked={formData.nivel_riesgo === "Medio"}
                onChange={handleChange}
                className="mr-2"
              />
              Medio
            </label>
            <label className="block">
              <input
                type="radio"
                name="nivel_riesgo"
                value="Alto"
                checked={formData.nivel_riesgo === "Alto"}
                onChange={handleChange}
                className="mr-2"
              />
              Alto
            </label>
          </div>
        </label>

        {/* Motivos para postular como ayudante */}
        <label className="block mb-2">
          ¿Cuáles son sus motivos para postular como ayudante de este ramo?
          <textarea
            type="text"
            name="motivo_ayudantia"
            value={formData.motivo_ayudantia}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            rows="4" // Define la altura del textarea inicial
            style={{ resize: 'vertical' }} // Permite que el usuario pueda ajustar la altura
          />
        </label>

        {/* Bloques disponibles en un calendario semanal */}
        <div className="overflow-x-auto mb-8">
          <h3 className="text-lg font-bold mb-4">Seleccione sus bloques académicos disponibles:</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#3d6997] text-white">
                <th className="border border-gray-300 p-2">Bloques / Días</th>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia) => (
                  <th key={dia} className="border border-gray-300 p-2">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['1-2', '3-4', '5-6', '7-8', '9-10', '11-12', '13-14'].map((bloque) => (
                <tr key={bloque} className="bg-white text-black">
                  <td className="border border-gray-300 p-2 text-center font-bold">{bloque}</td>
                  {['lunes', 'martes', 'miércoles', 'jueves', 'viernes'].map((dia) => (
                    <td key={dia} className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        name={`bloques_disponibles.${dia}`}
                        value={bloque}
                        checked={formData.bloques_disponibles[dia]?.includes(bloque) || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const day = dia;

                          // Asegurar que siempre haya un array para cada día
                          const newBloques = [...(formData.bloques_disponibles[day] || [])];

                          if (checked) {
                            newBloques.push(bloque);
                          } else {
                            const index = newBloques.indexOf(bloque);
                            if (index > -1) {
                              newBloques.splice(index, 1);
                            }
                          }

                          setFormData((prevData) => ({
                            ...prevData,
                            bloques_disponibles: {
                              ...prevData.bloques_disponibles,
                              [day]: newBloques,
                            },
                          }));
                        }}
                        className="cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Enviar Respuesta
        </button>
      </form>
    </div>
  );
};

export default FormularioPostulante;
