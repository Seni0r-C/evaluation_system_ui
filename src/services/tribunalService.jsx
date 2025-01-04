import axiosInstance from './axiosConfig';

export const asignarTribunalService = (setResults, trabajo_id, docente_ids) => {
    axiosInstance.post(`/trabajo-titulacion/asignarTribunal`, {trabajo_id, docente_ids})
        .then(response => {
            if (!response.error) {
                // Obtener los estados de la respuesta                
                alert(JSON.stringify(response));
                // const results = response.data
                // // Actualizar el resultado
                // setResults(results);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al asignarTribunalService:', error));
};
