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

// === PERMISOS ===
export const getPermisos = async () => {
    try {
        const response = await axiosInstance.get('/permisos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        return [];
    }
};

export const createPermiso = async ({ nombre, permiso, permiso_id = null }) => {
    try {
        const response = await axiosInstance.post('/permisos', { nombre, permiso, permiso_id });
        return { typeMsg: 'success', data: response.data };
    } catch (error) {
        console.error('Error al crear permiso:', error);
        return { typeMsg: 'error', message: 'No se pudo crear el permiso.' };
    }
};

export const updatePermiso = async (id, { nombre, permiso, permiso_id = null }) => {
    try {
        await axiosInstance.put(`/permisos/${id}`, { nombre, permiso, permiso_id });
        return { typeMsg: 'success', message: 'Permiso actualizado correctamente.' };
    } catch (error) {
        console.error('Error al actualizar permiso:', error);
        return { typeMsg: 'error', message: 'No se pudo actualizar el permiso.' };
    }
};

export const deletePermiso = async (id) => {
    try {
        await axiosInstance.delete(`/permisos/${id}`);
        return { typeMsg: 'success', message: 'Permiso eliminado correctamente.' };
    } catch (error) {
        console.error('Error al eliminar permiso:', error);
        return { typeMsg: 'error', message: 'No se pudo eliminar el permiso.' };
    }
};

// === RELACIÓN ROLES ↔ PERMISOS ===

export const getPermisosByRol = async (id_rol) => {
    try {
        const response = await axiosInstance.get(`/roles-permisos/${id_rol}/permisos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener permisos del rol:', error);
        return [];
    }
};
    
export const asignarPermisoARol = async (id_rol, id_permiso) => {
    try {
        await axiosInstance.post('/roles-permisos', { id_rol, id_permiso });
        return { typeMsg: 'success', message: 'Permiso asignado correctamente.' };
    } catch (error) {
        console.error('Error al asignar permiso al rol:', error);
        return { typeMsg: 'error', message: 'No se pudo asignar el permiso.' };
    }
};

export const quitarPermisoDeRol = async (id_rol, id_permiso) => {
    try {
        await axiosInstance.delete('/roles-permisos', { data: { id_rol, id_permiso } });
        return { typeMsg: 'success', message: 'Permiso eliminado del rol.' };
    } catch (error) {
        console.error('Error al quitar permiso del rol:', error);
        return { typeMsg: 'error', message: 'No se pudo quitar el permiso.' };
    }
};
