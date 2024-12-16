// services/carreraService.js
import axiosInstance from './axiosConfig';

// Función para obtener la lista de carreras
export const obtenerCarreras = async (setCarreras) => {
  try {
    const response = await axiosInstance.get( '/carrera/listar');
    setCarreras(response.data.datos);
  } catch (error) {
    console.error('Error al cargar carreras:', error);
  }
};
