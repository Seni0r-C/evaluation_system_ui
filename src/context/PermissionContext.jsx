import { createContext, useState, useEffect } from "react";

// permisosMock.js
export const permisosMock = [
  "ver_tabla_usuarios",
  "ver_boton_descargar",
  // "ver_panel_admin"
];

const PermissionContext = createContext([]);

export const PermissionProvider = ({ children }) => {
  const [permisos, setPermisos] = useState([]);

  useEffect(() => {
    // Aquí deberías hacer una petición al backend para obtener permisos del usuario
    setPermisos(permisosMock);
  }, []);

  return (
    <PermissionContext.Provider value={{ permisos }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionContext;