// src/pages/Help.js

import React from 'react';

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Ayuda y Soporte</h1>
        
        <p className="text-gray-600 mb-6">
          Si tiene dudas sobre el proceso, ha detectado un error en las ofertas u otro inconveniente, por favor utilice los siguientes canales de contacto:
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Información de Contacto</h3>
          <p className="text-gray-600"><strong>Teléfono:</strong> +123-456-7890</p>
          <p className="text-gray-600"><strong>Email:</strong> support@example.com</p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Entidad para Consultas Adicionales</h3>
          <p className="text-gray-600 mb-2">
            Si necesita asistencia adicional, por favor dirija sus consultas a:
          </p>
          <p className="text-gray-600"><strong>Nombre de la Institución:</strong> XYZ University</p>
          <p className="text-gray-600"><strong>Departamento:</strong> Departamento de Ciencias Computacionales</p>
        </div>
      </div>
    </div>
  );
}

export default Help;
