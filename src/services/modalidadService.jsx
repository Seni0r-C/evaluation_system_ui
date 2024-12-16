// services/modalidadService.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

// Función para obtener modalidades por carrera
export const obtenerModalidadesPorCarrera = async (selectedCarrera, setModalidades) => {
  try {
    const response = await axios.get(`${API_URL}/modalidad-titulacion/listarPorCarrera/${selectedCarrera}`);
    setModalidades(response.data);
  } catch (error) {
    console.error('Error al cargar modalidades:', error);
  }
};
