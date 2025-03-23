import axiosInstance from './axiosConfig';

// Refactored version of asignarTribunalService using async/await
export const asignarTribunalService = async (setResults, trabajo_id, docents_ids, fecha_defensa, estado_id) => {
    let message = '';
    let typeMsg = 'info';
    const [quien_preside_id, ...docente_ids] = docents_ids;
    try {
        const response = await axiosInstance.post(`/trabajo-titulacion/asignarTribunal`, { trabajo_id, docente_ids, fecha_defensa, quien_preside_id, estado_id });
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
export const reasignarTribunalService = async (_, trabajo_id, docents_ids, fecha_defensa) => {
    const [quien_preside_id, ...docente_ids] = docents_ids;
    try {
        const response = await axiosInstance.post(`/trabajo-titulacion/reasignarTribunal`, { trabajo_id, docente_ids, fecha_defensa, quien_preside_id });

        if (response.data) {
            return response.data;
        } else {
            return {
                typeMsg: 'error',
                message: 'Error en la respuesta del servidor.'
            };
        }
    } catch (error) {
        console.error('Error al reasignarTribunalService:', error);
        return {
            typeMsg: 'error',
            message: 'Error en el cliente al reasignar los datos del tribunal.'
        };
    }
};


export const obtenerTribunalService = async (setResults, trabajo_id) => {
    try {
        const response = await axiosInstance.get(`/trabajo-titulacion/obtenerTribunal/${trabajo_id}`);
        if (response.data) {
            const results = response.data;
            setResults(results.data);
            return response.data;
        } else {
            console.error('Error en la respuesta de la API: ', response.error);
            return {
                typeMsg: 'error',
                message: 'Error en la respuesta del servidor.'
            };
        }
    } catch (error) {
        console.error('Error al obtenerTribunalService:', error);
        return {
            typeMsg: 'error',
            message: 'Error al obtener los datos del tribunal.'
        };
    }
};

