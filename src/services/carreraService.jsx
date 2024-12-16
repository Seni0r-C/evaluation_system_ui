// services/carreraService.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

// Función para obtener la lista de carreras
export const obtenerCarreras = async (setCarreras) => {
  try {
    const response = await axios.get(API_URL + '/carrera/listar');
    setCarreras(response.data.datos);
  } catch (error) {
    console.error('Error al cargar carreras:', error);
  }
};
