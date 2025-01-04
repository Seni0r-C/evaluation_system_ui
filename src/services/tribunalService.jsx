import axiosInstance from './axiosConfig';

export const asignarTribunalService = (setResults, trabajo_id, docente_ids) => {
    axiosInstance.post(`/trabajo-titulacion/asignarTribunal`, {trabajo_id, docente_ids})
        .then(response => {
            alert("asignarTribunal:     \n"+JSON.stringify(response));
            if (!response.error) {
                // Obtener los estados de la respuesta                
                // const results = response.data
                // // Actualizar el resultado
                // setResults(results);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al asignarTribunalService:', error));
};

export const reasignarTribunalService = (setResults, trabajo_id, docente_ids) => {
    let message = '';
    axiosInstance.post(`/trabajo-titulacion/reasignarTribunal`, {trabajo_id, docente_ids})
        .then(response => {
            if (!response.error) {
                // Obtener los estados de la respuesta                
                alert(JSON.stringify(response));
                // const results = response.data
                message = response?.message??'Tribunal reasignado exitosamente'; // // Actualizar el resultado
                // setResults(results);
            } else {
                console.error('Error en la respuesta de la API.');
            }
        })
        .catch(error => console.error('Error al asignarTribunalService:', error));
};

export const obtenerTribunalService = async (setResults, trabajo_id) => {
    let message = '';
    let typeMsg = 'info';

    try {
        const response = await axiosInstance.get(`/trabajo-titulacion/obtenerTribunal/${trabajo_id}`);
        if (!response.error) {
            // Asignar el resultado de la respuesta
            const results = response.data;
            message = response?.message ?? 'Tribunal reasignado exitosamente'; // Actualizar el mensaje si es necesario
            typeMsg = 'success';
            setResults(results.data);
        } else {
            message = 'Hubo un inconveniente al obtener datos del tribunal.';
            typeMsg = 'error';
            console.error('Error en la respuesta de la API: ', response.error);
        }
    } catch (error) {
        message = 'Error al obtener los datos del tribunal.';
        typeMsg = 'error';
        console.error('Error al asignarTribunalService:', error);
    }

    // Devolver los valores de estado finales
    return { message, typeMsg };
};

