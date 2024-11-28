import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerificarCorreo = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { ramoId, carreraId } = useParams();
  const navigate = useNavigate();

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
    </div>
  );
};

export default VerificarCorreo;
