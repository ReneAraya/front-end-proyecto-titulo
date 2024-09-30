// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} PUCV Escuela de Ingenieria Informatica. Todos los derechos reservados.</p>
        <ul className="social-links">
          <p>Links de interés</p>
          <a href="https://facebook.com/informatica.pucv" target="_blank" rel="noopener noreferrer">Facebook</a>
          <br />
          <a href="https://www.inf.ucv.cl/" target="_blank" rel="noopener noreferrer">Sitio Oficial</a>
          <br />
          <a href="https://x.com/secdocinfpucv" target="_blank" rel="noopener noreferrer">X</a>
          <br />
          <a href="https://www.instagram.com/informatica.pucv/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
