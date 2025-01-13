import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Unauthorized from '../pages/Unauthorized';

const ProtectedRoute = ({ children, route }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isAllowed, setIsAllowed] = useState(null); // null mientras se verifica el permiso

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                // Llama al endpoint para verificar permisos
                const response = await axios.get('/api/check-permissions', {
                    params: { route }, // Envía la ruta actual para verificar permisos
                });
                setIsAllowed(response.data.allowed); // true o false según el backend
            } catch (error) {
                console.error('Error al verificar permisos:', error);
                setIsAllowed(false); // Bloquea el acceso si ocurre un error
            }
        };

        if (isAuthenticated) {
            checkPermissions(); // Solo verifica permisos si está autenticado
        }
    }, [route, isAuthenticated]);

    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Mientras se verifica el permiso, muestra un indicador de carga elegante
    if (isAllowed === null) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-dashed rounded-full animate-spin mx-auto"></div>
                    <h1 className="mt-4 text-lg font-semibold text-gray-700">
                        Verificando permisos de acceso...
                    </h1>
                    <p className="text-gray-500">
                        Por favor, espera un momento mientras confirmamos tu acceso a esta sección.
                    </p>
                </div>
            </div>
        );
    }

    // Si no tiene permiso, redirige a una página de "No autorizado"
    // if (!isAllowed) {
    //     return <Unauthorized />;
    // }

    // Si está autenticado y tiene permiso, renderiza el contenido
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    route: PropTypes.string.isRequired, // Ahora requiere la ruta como prop
};

export default ProtectedRoute;