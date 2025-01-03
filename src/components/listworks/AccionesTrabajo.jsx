import { useState } from 'react';
import BotonAccion from '../common/BotonAccion';
import { FaCalendarDay, FaEdit, FaFilePdf, FaEye } from 'react-icons/fa';
import { MdChecklist, MdGroupAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { permisos } from '../../utils/permisos';
import DynamicModal from '../modal/ModalData';
import {obtenerUnTrabajo} from '../../services/trabajosTitulacion';

const AccionesTrabajo = ({ trabajo, permisosAcciones, user, setEditTrabajo, setModalEditTrabajo, setAsignarFecha, setModalAsignarFecha }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(null);
  const [trabajoSelected, setTrabajoSelected] = useState(null);

  const fectchTrabajoFull = (trabajo) => {
    if(trabajo?.id??false){
      // alert(JSON.stringify(trabajo, null, 2));
      obtenerUnTrabajo(setTrabajoSelected, trabajo.id);
    }
  };
  
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

  const handleVerDetalles = (trabajo) => {
    fectchTrabajoFull(trabajo);
    setIsOpen(true);
  };

  // Definición de acciones
  const accionesObjs = [
    {
      roles: permisos.VER_DETALLES_TRABAJO_TITULACION,
      permiso: 'detallesTrabajo',
      icono: FaEye,      
      variant: 'teal',
      tooltip: 'Ver Detalles',
      onClick: handleVerDetalles,
    },
    {
      roles: permisos.ROLES_ASIGNACION_TRIBUNAL,
      permiso: 'asignarTribunal',
      icono: MdGroupAdd,      
      variant: 'purple',
      tooltip: 'Asignar Tribunal',
      onClick: handleAsignarTribunal,
    },
    {
      roles: permisos.ROLES_GENERACION_DOCUMENTO_CALIFICACION,
      permiso: 'generarReporte',
      icono: FaFilePdf,      
      variant: 'red',
      tooltip: 'Generar Reporte',
      onClick: handleGenerarReporte,
    },
    {
      roles: permisos.ROLES_EDICION_TRABAJOS,
      permiso: 'editar',
      icono: FaEdit,
      variant: 'secondary',
      tooltip: 'Editar',
      onClick: handleEdit,
    },
    {
      roles: permisos.ROLES_ASIGNACION_FECHA_SUSTENTO_TRABAJOS,
      permiso: 'asignarFecha',
      icono: FaCalendarDay,
      variant: 'primary',
      tooltip: 'Asignar Fecha',
      onClick: handleAsignarFecha,
    },
    {
      roles: permisos.ROLES_CALIFICACION_TRABAJOS,
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
        roles.some((role) => user.roles.includes(role)) && permisosAcciones.includes(permiso) ? (
          <BotonAccion
            key={permiso}
            onClick={() => onClick(trabajo)}
            icono={icono}
            variant={variant}
            tooltip={tooltip}
          />
        ) : null
      )}
      <DynamicModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
      data={trabajoSelected}
      title={"Detalles del Trabajo de Titulación"}
        />
    </div>
    
  );
};

export default AccionesTrabajo;
