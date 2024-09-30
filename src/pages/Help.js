// src/pages/Help.js

import React from 'react';

const Help = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Ayuda y Soporte</h1>
      
      <p>Si tiene dudas sobre el proceso, a detectado un error el las ofertas u otro inconveniente por favor utilice los siguiente canales de contacto:</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Contact Information</h3>
        <p><strong>Phone:</strong> +123-456-7890</p>
        <p><strong>Email:</strong> support@example.com</p>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h3>Entity for Further Queries</h3>
        <p>If you need further assistance, please direct your inquiries to:</p>
        <p><strong>Institution Name:</strong> XYZ University</p>
        <p><strong>Department:</strong> Computer Science Department</p>
      </div>
    </div>
  );
}

export default Help;
