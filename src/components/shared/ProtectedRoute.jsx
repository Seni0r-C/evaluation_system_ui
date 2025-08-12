import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/AuthContext';
import { useContext, useEffect } from 'react';
import useAccessControl from '../../hooks/useAccessControl';
import Spinner from './logo_carga/Spinner';
import Unauthorized from '../../pages/usuario/Unauthorized';
import { baseRoute } from '../../utils/constants';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const { hasAccessToRoute, accessStatus } = useAccessControl();
    const location = useLocation();

    useEffect(() => {
        const checkAccess = async () => {
            await hasAccessToRoute(location.pathname); // Usa location.pathname para obtener la ruta actual
        };

        checkAccess();
    }, [hasAccessToRoute, location]);

    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to={baseRoute + "/login"} replace />;
    }

    // Mientras se verifica el permiso, muestra un indicador de carga elegante
    if (accessStatus === null) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <Spinner />
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
    if (!accessStatus) {
        return <Unauthorized />;
    }

    // Si está autenticado y tiene permiso, renderiza el contenido
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;