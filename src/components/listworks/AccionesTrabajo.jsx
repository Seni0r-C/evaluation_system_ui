// import React, { useEffect } from 'react';
import BotonAccion from '../common/BotonAccion';
import { FaCalendarDay, FaEdit, FaFilePdf } from 'react-icons/fa';
import { MdChecklist, MdGroupAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AccionesTrabajo = ({ trabajo, acciones, user, setEditTrabajo, setModalEditTrabajo, setAsignarFecha, setModalAsignarFecha }) => {
  const navigate = useNavigate();

  // Handlers
  const handleEdit = (trabajo) => {
    setEditTrabajo(trabajo);
    setModalEditTrabajo(true);
  };

  const handleAsignarFecha = (trabajo) => {
    setAsignarFecha(trabajo);
    setModalAsignarFecha(true);
  };

  const handleCalificar = (trabajo) => {
    navigate('/calificar', { state: { trabajo } });
  };

  const handleAsignarTribunal = (trabajo) => {
    alert(JSON.stringify(trabajo, null, 2));
    // navigate('/asignar-tribunal', { state: { trabajo } });
  };

  const handleGenerarReporte = (trabajo) => {
    alert(JSON.stringify(trabajo, null, 2));
    // navigate('/asignar-tribunal', { state: { trabajo } });
  };

  // Definición de acciones
  const accionesObjs = [
    {
      roles: [1, 2],
      permiso: 'asignarTribunal',
      icono: MdGroupAdd,      
      variant: 'purple',
      tooltip: 'Asignar Tribunal',
      onClick: handleAsignarTribunal,
    },
    {
      roles: [1],
      permiso: 'generarReporte',
      icono: FaFilePdf,      
      variant: 'red',
      tooltip: 'Generar Reporte',
      onClick: handleGenerarReporte,
    },
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

  return (
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
};

export default AccionesTrabajo;
