import React from 'react';
import BotonAccion from '../common/BotonAccion';

const AccionesTrabajo = ({ trabajo, acciones, user }) => (
  <div className="flex justify-end gap-4">
    {acciones.map(({ roles, permiso, icono, variant, tooltip, onClick }) =>
      roles.some((role) => user.roles.includes(role)) ? (
        <BotonAccion
          key={permiso}
          onClick={() => onClick(trabajo)}
          icono={icono}
          variant={variant}
          tooltip={tooltip}
        />
      ) : null
    )}
  </div>
);

export default AccionesTrabajo;
