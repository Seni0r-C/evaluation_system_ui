import axiosInstance from './axiosConfig';

// Función para buscar usuarios
export const buscarUsuarios = (query, setResults, rol = 3) => {
  axiosInstance.get(`/usuarios`, { params: { nombre: query, rol } })
    .then(response => setResults(response.data))
    .catch(error => console.error('Error al buscar usuarios:', error))
};