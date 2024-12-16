// src/api/axiosConfig.js

import axios from 'axios';
import { API_URL } from '../utils/constants';

// Crear una instancia de Axios con la configuración base
const axiosInstance = axios.create({
  baseURL: API_URL, // La URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar interceptores si es necesario (por ejemplo, para manejo de errores o autenticación)
axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar cabeceras, tokens, etc.
    const token = localStorage.getItem('token'); // Ejemplo de token en LocalStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar los errores globalmente
    if (error.response && error.response.status === 401) {
      // Manejar errores de autenticación, por ejemplo, redirigiendo al login
      console.log('Sesión expirada');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
