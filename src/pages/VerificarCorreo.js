import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerificarCorreo = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ayudantesSeleccionados, setAyudantesSeleccionados] = useState([]);
  const { ramoId, carreraId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch para obtener ayudantes seleccionados
    const fetchAyudantesSeleccionados = async () => {
      try {
        console.log('Iniciando fetch de ayudantes seleccionados...');
        const response = await axios.get(`http://localhost:3001/api/ramos/${ramoId}/carrera/${carreraId}/ayudante`);
        console.log('Respuesta del servidor para ayudantes seleccionados:', response.data);

        if (Array.isArray(response.data)) {
          setAyudantesSeleccionados(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setAyudantesSeleccionados([response.data]);
        } else {
          setAyudantesSeleccionados([]);
        }
      } catch (error) {
        console.error('Error al obtener los ayudantes seleccionados:', error);
      }
    };

    fetchAyudantesSeleccionados();
  }, [ramoId, carreraId]);

  const handleVerificarCorreo = async () => {
    if (!email) {
      setErrorMessage('Debe ingresar un correo institucional.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(mail\.pucv\.cl|pucv\.cl)$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Debe ingresar un correo que termine en @mail.pucv.cl o @pucv.cl');
      return;
    }

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
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h2 style={{ color: '#e87e04' }} className="text-2xl font-bold mb-4">Verificación de Correo Institucional</h2>
      <div className="w-full md:w-2/3 lg:w-1/2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo institucional"
          className="input-field rounded w-full mb-4"
        />
        <button onClick={handleVerificarCorreo} className="login-button p-2 rounded w-full">
          Verificar
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      {/* Sección para mostrar ayudantes seleccionados */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg w-full md:w-2/3 lg:w-1/2">
        <h3 className="text-lg font-semibold mb-2 ">Ayudantes Seleccionados:</h3>
        {console.log('Ayudantes seleccionados en render:', ayudantesSeleccionados)}
        {ayudantesSeleccionados.length > 0 ? (
          ayudantesSeleccionados.map((ayudante, index) => (
            <p key={index} style={{ color: '#e87e04' }}>
              <strong>Ayudante:</strong> {ayudante.nombres} {ayudante.apellidos}
            </p>
          ))
        ) : (
          <p className="text-gray-700">Aún no se ha seleccionado ningún ayudante para este ramo.</p>
        )}
      </div>
    </div>
  );
};

export default VerificarCorreo;
