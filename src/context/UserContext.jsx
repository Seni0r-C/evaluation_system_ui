import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda la información del usuario
  const [roles, setRoles] = useState([]); // Roles del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      const parsedUser = JSON.parse(info);
      setUser(parsedUser);
      setRoles(parsedUser.roles || []);
    }
    setLoading(false);
  }, []);

  const hasRole = (requiredRoles) => {
    // Verifica si el usuario tiene al menos uno de los roles requeridos
    return roles.some(role => requiredRoles.includes(role));
  };

  if (loading) {
    return <div>Loading...</div>; // Indicador de carga
  }

  return (
    <UserContext.Provider value={{ user, roles, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
