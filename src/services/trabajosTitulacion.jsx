import axiosInstance from './axiosConfig';

export const obtenerEstados = (setResults) => {
    axiosInstance.get(`/trabajo-titulacion/estados`)
        .then(response => {
            if (response.data.exito === true) {
                // Obtener los estados de la respuesta
                const estados = response.data.estados.map(estado => estado.nombre);

                // Actualizar el resultado
                setResults(estados);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al buscar estados:', error));
};
