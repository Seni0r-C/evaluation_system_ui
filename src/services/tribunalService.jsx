import axiosInstance from './axiosConfig';

// Refactored version of asignarTribunalService using async/await
export const asignarTribunalService = async (setResults, trabajo_id, docente_ids) => {
    let message = '';
    let typeMsg = 'info';
    try {
        const response = await axiosInstance.post(`/trabajo-titulacion/asignarTribunal`, { trabajo_id, docente_ids });

        // Debugging response, you can remove the alert in production
        // alert("asignarTribunal: \n" + JSON.stringify(response));

        if (response.data) {
            return response.data;
        } else {
            console.error('Error en la respuesta de la API.');
        }
    } catch (error) {
        console.error('Error al asignarTribunalService:', error);
    }
    return { message, typeMsg };
};

// Refactored version of reasignarTribunalService using async/await
export const reasignarTribunalService = async (setResults, trabajo_id, docente_ids) => {
    let message = '';
    
    try {
        const response = await axiosInstance.post(`/trabajo-titulacion/reasignarTribunal`, { trabajo_id, docente_ids });

        if (!response.error) {
            // Debugging response, you can remove the alert in production
            alert(JSON.stringify(response));

            // You can uncomment and update the UI with response.data
            // const results = response.data;
            message = response?.message ?? 'Tribunal reasignado exitosamente'; // Default message if not provided
            // setResults(results);
        } else {
            console.error('Error en la respuesta de la API.');
        }
    } catch (error) {
        message = 'Error al reasignar los datos del tribunal.';
        console.error('Error al reasignarTribunalService:', error);
    }

    // Return message to handle UI notifications or further logic
    return { message };
};


export const obtenerTribunalService = async (setResults, trabajo_id) => {
    let message = '';
    let typeMsg = 'info';
    
    try {
        const response = await axiosInstance.get(`/trabajo-titulacion/obtenerTribunal/${trabajo_id}`);
        if (!response.error) {
            // Asignar el resultado de la respuesta
            const results = response.data;
            message = response?.message ?? 'Datos obtenidos correctamente.'; // Actualizar el mensaje si es necesario
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

