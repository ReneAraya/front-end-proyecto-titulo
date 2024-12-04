import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerificarCorreo = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ayudanteSeleccionado, setAyudanteSeleccionado] = useState(null);
  const { ramoId, carreraId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch para obtener ayudante seleccionado
    const fetchAyudanteSeleccionado = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/ramos/${ramoId}/carrera/${carreraId}/ayudante`);
        if (response.data.nombres) {
          setAyudanteSeleccionado(response.data);
        } else {
          setAyudanteSeleccionado(null);
        }
      } catch (error) {
        console.error('Error al obtener el ayudante seleccionado:', error);
      }
    };

    fetchAyudanteSeleccionado();
  }, [ramoId, carreraId]);

  const handleVerificarCorreo = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/formulario/verificar', {
        respondent_email: email,
        ramoId: parseInt(ramoId),
        carreraId: parseInt(carreraId),
      });

      if (response.data.responded) {
        setErrorMessage('Usted ya postuló como ayudante a este ramo.');
      } else {
        navigate(`/formulario/${ramoId}/${carreraId}/responder`, { state: { email } });
      }
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      setErrorMessage('Hubo un error al verificar el correo. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Verificación de Correo Institucional</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingrese su correo institucional"
        className="border p-2 rounded w-full mb-4"
      />
      <button onClick={handleVerificarCorreo} className="bg-blue-500 text-white p-2 rounded w-full">
        Verificar
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {/* Sección para mostrar ayudante seleccionado */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Ayudantes Seleccionados:</h3>
        {ayudanteSeleccionado ? (
          <p className="text-green-700">
            <strong>Ayudante:</strong> {ayudanteSeleccionado.nombres} {ayudanteSeleccionado.apellidos}
          </p>
        ) : (
          <p className="text-gray-700">Aún no se ha seleccionado ningún ayudante para este ramo.</p>
        )}
      </div>
    </div>
  );
};

export default VerificarCorreo;
