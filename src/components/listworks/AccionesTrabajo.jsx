import React from 'react';
import BotonAccion from '../common/BotonAccion';
import { FaCalendarDay, FaEdit } from 'react-icons/fa';
import { MdChecklist } from 'react-icons/md';

const handleEdit = (trabajo) => {
  // setEditTrabajo(trabajo);
  // setModalEditTrabajo(true);
  alert(JSON.stringify(trabajo, null, 2));
};

const handleAsignarFecha = (trabajo) => {
  // setAsignarFecha(trabajo);
  // setModalAsignarFecha(true);
  alert(JSON.stringify(trabajo, null, 2));
};

const handleCalificar = (trabajo) => {
  alert(JSON.stringify(trabajo, null, 2));
  // navigate("/calificar", { state: { trabajo } });
};

const accionesObjs = [
    {
      roles: [1, 2],
      permiso: 'editar',
      icono: FaEdit,
      variant: 'secondary',
      tooltip: 'Editar',
      onClick: handleEdit,
    },
    {
      roles: [1, 2],
      permiso: 'asignarFecha',
      icono: FaCalendarDay,
      variant: 'primary',
      tooltip: 'Asignar Fecha',
      onClick: handleAsignarFecha,
    },
    {
      roles: [1, 3],
      permiso: 'calificar',
      icono: MdChecklist,
      variant: 'primary',
      tooltip: 'Calificar',
      onClick: handleCalificar,
    },
  ];

const AccionesTrabajo = ({ trabajo, acciones, user }) => (
  <div className="flex justify-end gap-4">
    {accionesObjs.map(({ roles, permiso, icono, variant, tooltip, onClick }) =>
      roles.some((role) => user.roles.includes(role)) && acciones.includes(permiso) ? (
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
