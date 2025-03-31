import axiosInstance from './axiosConfig';

// Función para buscar usuarios
export const buscarUsuarios = (query, setResults, rol = 3) => {
  axiosInstance.get(`/usuarios`, { params: { nombre: query, rol } })
    .then(response => setResults(response.data))
    .catch(error => console.error('Error al buscar usuarios:', error))
};

export const getEstudiantesByTrabajoId = (idTrabajo, setEstudiantes) => {
  axiosInstance.get(`/usuarios/estudiantes/${idTrabajo}`)
    .then(response => setEstudiantes(response.data))
    .catch(error => console.error('Error al buscar estudiantes:', error))
}

export const getTribunalMembersByTrabajoId = (idTrabajo, setTribunalMembers) => {  
  axiosInstance.get(`/trabajo-titulacion/tribunal/${idTrabajo}`)
    .then(response => setTribunalMembers(response.data.data))
    .catch(error => console.error('Error al buscar miembros de tribunal:', error))
}

export const getUserPhoto = async (id) => {
  try {
    const response = await axiosInstance.get(`/usuarios/foto/${id}`);
    return response.data; // Esto debe ser un string base64
  } catch (error) {
    console.error('Error al buscar foto:', error);
    return null; // Maneja errores devolviendo un valor por defecto
  }
};

