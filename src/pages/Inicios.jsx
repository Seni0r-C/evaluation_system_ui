import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import InicioNormal from '../pages/InicioNormal';
import InicioEstudiante from '../pages/InicioEstudiante';
import { ESTUDIANTE } from '../utils/roles';


const Inicios = () => {
    const { hasRole } = useContext(UserContext);
    return (
        <div className="p-6 space-y-6">             
            {hasRole([ESTUDIANTE])? <InicioEstudiante />: <InicioNormal /> } 
        </div>
    )
};

export default Inicios;