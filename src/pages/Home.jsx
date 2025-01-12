import { useContext } from 'react';
import UserContext from '../context/UserContext';
import InicioAdmin from './inicio/InicioAdmin';
import InicioEstudiante from './inicio/InicioEstudiante';
import InicioDefault from './inicio/InicioDefault';
import { ESTUDIANTE, ADMIN, VICEDECANO, TRIBUNAL, SECRETARIA } from '../utils/roles';

const Home = () => {
    const { hasRole } = useContext(UserContext);
    return (
        <div className="p-6 space-y-6">
            {
                hasRole([ESTUDIANTE]) ?
                    <InicioEstudiante /> :
                    hasRole([ADMIN, VICEDECANO, TRIBUNAL, SECRETARIA]) ?
                        <InicioAdmin /> :
                        <InicioDefault />
            }
        </div>
    )
};

export default Home;