import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenCreationTime = localStorage.getItem('tokenCreationTime');
    const expirationTime = 12 * 60 * 60 * 1000; // 12 horas en milisegundos
    const now = new Date().getTime();

    // Verifica si el token existe, userInfo está presente, y el token no ha expirado
    if (token && tokenCreationTime && (now - tokenCreationTime) < expirationTime) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenCreationTime');
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Puedes reemplazar esto por un spinner u otro indicador de carga
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
