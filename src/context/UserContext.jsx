import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MAP_ROLE_STR } from '../utils/roles';

const getUserName = (userData) => {
  // Dividir el nombre en partes  
  const partesNombre = userData?.nombre?.split(' ');
  if (partesNombre) {
    const primerApellido = partesNombre[0];
    const primerNombre = partesNombre[2];
    // Configurar el nombre del usuario    
    return [primerNombre, primerApellido].map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()).join(' ');
  } else {
    return 'Usuario';
  }
};

const getRolesText = (roles) => {
  if (!roles) return '';
  return roles.map(role => MAP_ROLE_STR[role] || `${role?.toUpperCase()}`).join(', ');
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda la información del usuario
  const [roles, setRoles] = useState([]); // Roles del usuario
  const [rolesAsStr, setRolesAsStr] = useState(null); // Roles del usuario
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const initUser = (newUserData) => {
    setUser(newUserData);
    setUserPhoto(`data:image/jpeg;base64,${newUserData.fotoBase64}`);
    setRoles(newUserData.roles || []);
    setUserName(getUserName(newUserData));
    setRolesAsStr(getRolesText(newUserData?.roles));
  };

  const updateUser = (newUserData) => {
    localStorage.setItem('userInfo', JSON.stringify(newUserData));
    initUser(newUserData);
  };

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      const parsedUser = JSON.parse(info);
      initUser(parsedUser);
    }
    setLoading(false);
  }, []);

  /**
   * Checks if the user has at least one of the required roles.
   *
   * @param {Array} requiredRoles - An array of roles to check against the user's roles.
   * @returns {boolean} - Returns true if the user has at least one of the required roles, otherwise false.
   */
  const hasRole = (requiredRoles) => {
    return roles.some(role => requiredRoles.includes(role));
  };


  if (loading) {
    return <div>Loading...</div>; // Indicador de carga
  }

  return (
    <UserContext.Provider value={{ updateUser, userName, userPhoto, rolesAsStr, hasRole, user, roles }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
