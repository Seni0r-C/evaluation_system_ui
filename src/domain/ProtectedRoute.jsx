import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';
import { useContext } from 'react';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // Verifica si el usuario está autenticado
    if (!isAuthenticated) {
        return <Navigate to={`/login`} replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
