import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Asegúrate de que App.css esté aquí
import './tailwind.css';
import 'flowbite';
import './styles.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// Quitamos cualquier otro `<Router>` que pueda estar siendo usado adicionalmente
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
