import axiosInstance from './axiosConfig';

// Función para obtener modalidades por carrera
export const obtenerModalidadesPorCarrera = async (selectedCarrera, setModalidades) => {
  try {
    const response = await axiosInstance.get(`/modalidad-titulacion/listarPorCarrera/${selectedCarrera}`);
    setModalidades(response.data);
  } catch (error) {
    console.error('Error al cargar modalidades:', error);
  }
};
