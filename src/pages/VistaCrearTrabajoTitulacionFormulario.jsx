import { useEffect } from 'react';
import CrearTrabajoTitulacionFormulario from './TrabajoTitulacionCrear';
import { useLocation, useNavigate } from 'react-router-dom';
import useAccessControl from '../hooks/useAccessControl';
import Unauthorized from './Unauthorized';

const VistaCrearTrabajoTitulacionFormulario = () => {
    const { hasAccessToRoute, accessStatus } = useAccessControl();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAccess = async () => {
            await hasAccessToRoute(location.pathname); // Usa location.pathname para obtener la ruta actual
        };

        checkAccess();
    }, [hasAccessToRoute, navigate]);

    return (
        <div className="p-6 space-y-6">
            {
                accessStatus === true ?
                    <CrearTrabajoTitulacionFormulario />
                    :
                    <Unauthorized />
            }
        </div>
    )
};

export default VistaCrearTrabajoTitulacionFormulario;