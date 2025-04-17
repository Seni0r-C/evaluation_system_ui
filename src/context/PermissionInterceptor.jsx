import React from "react";
import { usePermission } from "../hooks/usePermission";

const getPermissionBehavior = ({ permissionId, user }) => {
  if (!user) return "hide";
  // Lógica para decidir comportamiento por permiso, rol, etc.
  if (permissionId === "ver_panel_admin") return "fallback";
  return "disabled";
};

const PermissionInterceptor = ({ children }) => {
  // Utiliza el hook usePermission
  const { user, hasPermission } = usePermission();

  const processElement = (element) => {
    console.log("Procesando elemento:", element);
    console.log(element);
    if (!React.isValidElement(element)) return element;

    const { permissionId, children: innerChildren } = element.props || {};
    let processedChildren = innerChildren;

    // Recursivamente procesa los hijos
    if (innerChildren) {
      processedChildren = React.Children.map(innerChildren, processElement);
    }

    // Si no tiene permiso asociado, renderiza con hijos procesados
    if (!permissionId) {
      return React.cloneElement(element, { children: processedChildren });
    }

    const allowed = hasPermission(permissionId);
    const behavior = getPermissionBehavior({ permissionId, user });

    if (allowed) {
      return React.cloneElement(element, { children: processedChildren });
    }

    switch (behavior) {
      case "disabled":
        return React.cloneElement(element, {
          disabled: true,
          className: `${element.props.className || ""} opacity-50 pointer-events-none`,
          children: processedChildren,
        });
      case "blur":
        return React.cloneElement(element, {
          className: `${element.props.className || ""} blur pointer-events-none`,
          children: processedChildren,
        });
      case "fallback":
        return <span className="text-sm text-red-500">No tienes acceso</span>;
      case "hide":
      default:
        return null;
    }
  };

  return <>{React.Children.map(children, processElement)}</>;
};

export default PermissionInterceptor;
