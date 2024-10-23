// src/services/ramosService.js
import axios from 'axios';

export const obtenerRamosPorCarrera = async (carreraId) => {
  try {
    const response = await axios.get(`/ramos/carrera/${carreraId}`);
    return response.data; // Devuelve los ramos obtenidos
  } catch (error) {
    console.error('Error al obtener los ramos:', error);
    return [];
  }
};
