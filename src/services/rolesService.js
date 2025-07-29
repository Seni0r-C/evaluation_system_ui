import axiosInstance from './axiosConfig';

export const getRoles = async () => {
    try {
        const response = await axiosInstance.get('/roles');
        return response.data;
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return [];
    }
};

export const obtenerRolesDeUsuario = async (userId) => {
    try {
        const response = await axiosInstance.get(`/usuarios/${userId}/roles`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los roles del usuario:', error);
        return [];
    }
};

export const actualizarRolesDeUsuario = async (userId, roles) => {
    try {
        await axiosInstance.put(`/usuarios/${userId}/roles`, { roles });
        return { typeMsg: 'success', message: 'Roles actualizados correctamente.' };
    } catch (error) {
        console.error('Error al actualizar los roles del usuario:', error);
        return { typeMsg: 'error', message: 'No se pudo actualizar los roles.' };
    }
};
