// services/usuarioService.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

// Función para buscar usuarios
export const buscarUsuarios = (query, setResults, setLoading, rol = 3) => {
  setLoading(true);
  axios.get(`${API_URL}/usuarios`, { params: { nombre: query, rol } })
    .then(response => setResults(response.data))
    .catch(error => console.error('Error al buscar usuarios:', error))
    .finally(() => setLoading(false));
};