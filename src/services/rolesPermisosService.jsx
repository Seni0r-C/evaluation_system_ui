import axiosInstance from './axiosConfig';

// === ROLES ===
export const getRoles = async () => {
    try {
        const response = await axiosInstance.get('/roles');
        return response.data;
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return [];
    }
};

export const createRol = async (nombre) => {
    try {
        const response = await axiosInstance.post('/roles', { nombre });
        return { typeMsg: 'success', data: response.data };
    } catch (error) {
        console.error('Error al crear rol:', error);
        return { typeMsg: 'error', message: 'No se pudo crear el rol.' };
    }
};

export const updateRol = async (id, nombre) => {
    try {
        await axiosInstance.put(`/roles/${id}`, { nombre });
        return { typeMsg: 'success', message: 'Rol actualizado correctamente.' };
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        return { typeMsg: 'error', message: 'No se pudo actualizar el rol.' };
    }
};

export const deleteRol = async (id) => {
    try {
        await axiosInstance.delete(`/roles/${id}`);
        return { typeMsg: 'success', message: 'Rol eliminado correctamente.' };
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        return { typeMsg: 'error', message: 'No se pudo eliminar el rol.' };
    }
};