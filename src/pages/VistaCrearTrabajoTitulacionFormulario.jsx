import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { TUTOR } from '../utils/roles';
import { permisos } from '../utils/permisos';
import CrearTrabajoTitulacionFormulario from './TrabajoTitulacionCrear';


const VistaCrearTrabajoTitulacionFormulario = () => {
    const { hasRole } = useContext(UserContext);
    return (
        <div className="p-6 space-y-6">
            {
                hasRole(permisos.ROLES_REGISTRO_TRABAJO) ?
                    <CrearTrabajoTitulacionFormulario iamTutor={hasRole([TUTOR])} /> :
                    null
            }
        </div>
    )
};

export default VistaCrearTrabajoTitulacionFormulario;