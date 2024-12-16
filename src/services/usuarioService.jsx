import axiosInstance from './axiosConfig';

// Función para buscar usuarios
export const buscarUsuarios = (query, setResults, setLoading, rol = 3) => {
  setLoading(true);
  axiosInstance.get(`/usuarios`, { params: { nombre: query, rol } })
    .then(response => setResults(response.data))
    .catch(error => console.error('Error al buscar usuarios:', error))
    .finally(() => setLoading(false));
};