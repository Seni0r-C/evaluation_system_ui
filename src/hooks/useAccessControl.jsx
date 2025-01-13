import { useContext, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import UserContext from '../context/UserContext';

const useAccessControl = () => {
    const { roles } = useContext(UserContext); // Obtener los roles del contexto
    const [accessStatus, setAccessStatus] = useState(null); // Estado para guardar si tiene acceso

    // Función para verificar acceso a una ruta
    const hasAccessToRoute = async (ruta) => {
        try {
            const response = await axiosInstance.post('/rutas/hasAccess', {
                rol: roles, // Suponiendo que el primer rol del usuario es el rol principal
                ruta,
            });

            if (response.data.exito) {
                setAccessStatus(true); // Si tiene acceso, guarda el estado como true
                return true; // Devuelve true si el acceso está permitido
            } else {
                setAccessStatus(false); // Si no tiene acceso, guarda el estado como false
                return false; // Devuelve false si no tiene acceso
            }
        } catch (error) {
            console.error('Error verificando el acceso:', error);
            setAccessStatus(false); // En caso de error, el acceso se marca como denegado
            return false;
        }
    };

    return { hasAccessToRoute, accessStatus };
};

export default useAccessControl;