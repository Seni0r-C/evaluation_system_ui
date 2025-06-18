/* eslint-disable react/prop-types */
import React from "react";
import { usePermission } from "../hooks/usePermission";

const getPermissionBehavior = ({ permissionId, user, permissionIdBehavior = null }) => {
  if (permissionIdBehavior) return permissionIdBehavior;
  if (!user) return "hide";
  // Lógica para decidir comportamiento por permiso, rol, etc.
  if (permissionId) return "fallback";
  return "fallback";
  // return "disabled";
};

const PermissionInterceptor = ({ children }) => {
  // Utiliza el hook usePermission
  const { user, hasPermission } = usePermission();

  const processElement = (element, index) => {
    if (!React.isValidElement(element)) return element;

    const { permissionId: permissionIdBruto, children: innerChildren } = element.props || {};
    let processedChildren = innerChildren;
    const permissionId = permissionIdBruto ? permissionIdBruto.substring(0, permissionIdBruto.lastIndexOf("_")) : null;
    const permissionIdBehavior = permissionIdBruto ? permissionIdBruto.substring(permissionIdBruto.lastIndexOf("_") + 1) : null;

    if (innerChildren) {
      processedChildren = React.Children.map(innerChildren, (child, i) => processElement(child, i));
    }

    const allowed = hasPermission(permissionId);
    const behavior = getPermissionBehavior({ permissionId, user, permissionIdBehavior });

    const cloneProps = {
      children: processedChildren,
      key: element.key || index, // ✅ Aquí asignas una key única si no existe
    };

    if (permissionId && allowed) {
      return React.cloneElement(element, cloneProps);
    }
    if (!permissionId) {
      return React.cloneElement(element, cloneProps);
    }

    switch (behavior) {
      case "disabled":
        return React.cloneElement(element, {
          ...cloneProps,
          disabled: true,
          className: `${element.props.className || ""} opacity-50 pointer-events-none`,
        });
      case "blur":
        return React.cloneElement(element, {
          ...cloneProps,
          className: `${element.props.className || ""} blur pointer-events-none`,
        });
      case "fallback":
        return <span key={`fallback-${index}`} className="text-sm text-red-500">No tienes acceso</span>;
      case "hide":
      default:
        return null;
    }
  };

  return <>{React.Children.map(children, processElement)}</>;
};

export default PermissionInterceptor;
