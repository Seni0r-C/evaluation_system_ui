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

export const obtenerUnTrabajo = (setResults, idTrabajo) => {
    axiosInstance.get(`/trabajo-titulacion/obtener/${idTrabajo}`)
        .then(response => {
            if (!response.error) {
                // alert(JSON.stringify(response, null, 2));                
                // Obtener los estados de la respuesta
                const trabajo = response.data;

                // Actualizar el resultado
                setResults(trabajo);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al buscar estados:', error));
};

export const subirTrabajoFinal = (trabajo, link) => {
    axiosInstance.patch(`/trabajo-titulacion/actualizar/${trabajo}`, { link_final: link })
        .then(response => {
            if (!response.error) {
                // alert(JSON.stringify(response, null, 2));
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al buscar estados:', error));
};