import { useContext } from "react";
import UserContext from "../context/UserContext";
import PermissionContext from "../context/PermissionContext";

export const usePermission = () => {
  const { permisos } = useContext(PermissionContext);
  const { user } = useContext(UserContext);
  return { user, hasPermission: (permisoId) => permisos.includes(permisoId) };
};