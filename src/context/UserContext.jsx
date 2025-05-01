import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const getUserName = (userData) => {
  const partesNombre = userData?.nombre?.split(' ');
  if (!partesNombre || partesNombre.length < 2) return 'Usuario';

  const [primerApellido, , primerNombre] = partesNombre;
  return [primerNombre, primerApellido]
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ');
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda la información del usuario
  const [roles, setRoles] = useState([]); // Roles del usuario
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const initUser = (newUserData) => {
    setUser(newUserData);    
    const userNameStr = getUserName(newUserData);
    setUserName(userNameStr);
    if (newUserData.fotoBase64) {
      setUserPhoto(`data:image/jpeg;base64,${newUserData.fotoBase64}`);
    } else {
      setUserPhoto(`https://ui-avatars.com/api/?name=${userNameStr.replaceAll(' ', '+')}&rounded=true`);
    }
    setRoles(newUserData.roles || []);
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
  }, []);

  /**
   * Checks if the user has at least one of the required roles.
   *
   * @param {Array} requiredRoles - An array of roles to check against the user's roles.
   * @returns {boolean} - Returns true if the user has at least one of the required roles, otherwise false.
   */
  const hasRole = (requiredRoles) => {
    return roles.some(role => requiredRoles.includes(role.nombre));
  };

  return (
    <UserContext.Provider value={{ updateUser, userName, userPhoto, hasRole, user, roles }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
