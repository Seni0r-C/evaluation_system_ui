import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import InicioEstudiante from './inicio/InicioEstudiante';
import InicioAdmin from './inicio/InicioAdmin';
import InicioDefault from './inicio/InicioDefault';

const Home = () => {
    const { hasRole } = useContext(UserContext);
    return (
        <div className="p-6 space-y-6">
            {
                hasRole(["ESTUDIANTE"]) ?
                    <InicioEstudiante /> :
                    hasRole(["ADMINISTRACIÓN", "VICEDECANATO", "SECRETARíA"]) ?
                        <InicioAdmin /> :
                        <InicioDefault />
            }
        </div>
    )
};

export default Home;