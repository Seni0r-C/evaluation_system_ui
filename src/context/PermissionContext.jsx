/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { getPermisosByRol } from "../services/rolesPermisosService";

const PermissionContext = createContext([]);

export const PermissionProvider = ({ children }) => {
  const [permisos, setPermisos] = useState([]);
  const { roles, user } = useContext(UserContext);

  async function loadPermisos() {
    const permissions = [];
    let permisosList = [];
    let roles_ids = [];
    if (roles) {
      roles_ids = roles.map(rol => rol.id);

      // console.log(JSON.stringify({ user, roles }, null, 2));
      for (let i = 0; i < roles_ids.length; i++) {
        permisosList = await getPermisosByRol(roles_ids[i]);
        if (permisosList) {
          permisosList = permisosList.map(permiso => permiso.permiso);
          // console.log(JSON.stringify({ permisosList }, null, 2));
          permissions.push(...permisosList);
        }
      }
      // Aquí deberías hacer una petición al backend para obtener permisos del usuario
      //  getPermisosByRol(rolSeleccionado.id).then(setPermisos);
      setPermisos(permissions);
    }
  }

  useEffect(() => {
    if (roles && roles.length > 0 && user) {
      // console.log("Loading permisos para roles:", roles.map(r => r.nombre));
      loadPermisos();
    }
  }, [roles, user]);


  return (
    <PermissionContext.Provider value={{ permisos }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionContext;