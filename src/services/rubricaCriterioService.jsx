import axiosInstance from './axiosConfig';

// Obtener todas las modalidades
export const obtenerModalidades = async (setModalidades) => {
    try {
        const response = await axiosInstance.get('/rubrica/modalidades');
        if (response?.data) {
            setModalidades(response.data);
            return { typeMsg: 'success', message: 'Modalidades obtenidas correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se encontraron modalidades.' };
        }
    } catch (error) {
        console.error('Error al obtener modalidades:', error);
        return { typeMsg: 'error', message: 'Error al obtener modalidades.' };
    }
};

// Obtener todos los tipos de evaluación
export const obtenerTiposEvaluacion = async (setTiposEvaluacion) => {
    try {
        const response = await axiosInstance.get('/rubrica/tipos-evaluacion');
        if (response?.data) {
            setTiposEvaluacion(response.data);
            return { typeMsg: 'success', message: 'Tipos de evaluación obtenidos correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se encontraron tipos de evaluación.' };
        }
    } catch (error) {
        console.error('Error al obtener tipos de evaluación:', error);
        return { typeMsg: 'error', message: 'Error al obtener tipos de evaluación.' };
    }
};

export const obtenerTiposEvaluacionByModalidad = async (setTiposEvaluacion, modalidadId) => {
    try {
        const response = await axiosInstance.get(`/rubrica/tipos-evaluacion/${modalidadId}`);
        if (response?.data) {
            setTiposEvaluacion(response.data);
            return { typeMsg: 'success', message: 'Tipos de evaluación obtenidos correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se encontraron tipos de evaluación.' };
        }
    } catch (error) {
        console.error('Error al obtener tipos de evaluación:', error);
        return { typeMsg: 'error', message: 'Error al obtener tipos de evaluación.' };
    }
};

// Obtener criterios de rúbrica filtrados
export const obtenerCriteriosRubrica = async (setCriterios, modalidadId, tipoEvaluacionId) => {
    try {
        const response = await axiosInstance.get(`/rubrica/criterios?modalidadId=${modalidadId}&tipoEvaluacionId=${tipoEvaluacionId}`);
        if (response?.data) {
            setCriterios(response.data);
            return { typeMsg: 'success', message: 'Criterios obtenidos correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se encontraron criterios para la selección dada.' };
        }
    } catch (error) {
        console.error('Error al obtener criterios de rúbrica:', error);
        return { typeMsg: 'error', message: 'Error al obtener criterios de rúbrica.' };
    }
};

// Actualizar un criterio de rúbrica
export const actualizarCriterioRubrica = async (id, nombre, puntaje_maximo) => {
    try {
        const response = await axiosInstance.patch('/rubrica/criterios', {
            id, nombre, puntaje_maximo
        });

        if (response?.data) {
            return { typeMsg: 'success', message: 'Criterio actualizado correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se pudo actualizar el criterio.' };
        }
    } catch (error) {
        console.error('Error al actualizar criterio:', error);
        return { typeMsg: 'error', message: 'Error al actualizar criterio.' };
    }
};

// Actualizar un criterio de rúbrica
export const crearCriterioRubrica = async (nombre, puntaje_maximo,  modalidad_id, tipo_evaluacion_id) => {
    try {
        const response = await axiosInstance.post('/rubrica/criterios/crear', {
            nombre, puntaje_maximo, modalidad_id, tipo_evaluacion_id
        });

        if (response?.data) {
            return { typeMsg: 'success', message: 'Criterio creado correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se pudo crear el criterio.' };
        }
    } catch (error) {
        console.error('Error al crear criterio:', error);
        return { typeMsg: 'error', message: 'Error al crear criterio.' };
    }
};

// Eliminar un criterio de rúbrica
export const eliminarCriterioRubrica = async (id) => {
    try {
        const response = await axiosInstance.delete(`/rubrica/criterios/${id}`);

        if (response?.data) {
            return { typeMsg: 'success', message: 'Criterio eliminado correctamente.' };
        } else {
            return { typeMsg: 'error', message: 'No se pudo eliminar el criterio.' };
        }
    } catch (error) {
        console.error('Error al eliminar criterio:', error);
        return { typeMsg: 'error', message: 'Error al eliminar criterio.' };
    }
}