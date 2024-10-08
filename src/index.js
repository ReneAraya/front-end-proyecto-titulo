import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import 'flowbite';
import App from './App';
import"./styles.css";
import { BrowserRouter } from "react-router-dom";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

//reportWebVitals();
