import { useState } from 'react';
import BotonAccion from '../common/BotonAccion';
import { FaCalendarDay, FaEdit, FaFilePdf, FaEye } from 'react-icons/fa';
import { MdChecklist, MdGroupAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { permisos } from '../../utils/permisos';
import DynamicModal from '../modal/ModalData';
import { obtenerUnTrabajo } from '../../services/trabajosTitulacion';
import AsignacionTribunalModal from '../utmodal/AsignacionTribunalModal';
import PropTypes from 'prop-types';

const AccionesTrabajo = ({ trabajo, permisosAcciones, user }) => {
  const navigate = useNavigate();
  const [isOpenVerDetalle, setIsOpenVerDetalle] = useState(false);
  const [isOpenAsignarTutor, setIsOpenAsignarTutor] = useState(false);
  const [trabajoSelected, setTrabajoSelected] = useState(null);

  const fectchTrabajoFull = (trabajo) => {
    if (trabajo?.id ?? false) {
      obtenerUnTrabajo(setTrabajoSelected, trabajo.id);
    }
  };

  // Handlers
  const handleCalificar = (trabajo) => {
    navigate('/calificar', { state: { trabajo } });
  };

  const handleAsignarTribunal = (trabajo) => {
    fectchTrabajoFull(trabajo);
    setIsOpenAsignarTutor(true);
  };

  const handleGenerarReporte = (trabajo) => {
    alert(JSON.stringify(trabajo, null, 2));
  };

  const handleVerDetalles = (trabajo) => {
    fectchTrabajoFull(trabajo);
    setIsOpenVerDetalle(true);
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
      onClick: () => alert('Editar'),
    },
    {
      roles: permisos.ROLES_ASIGNACION_FECHA_SUSTENTO_TRABAJOS,
      permiso: 'asignarFecha',
      icono: FaCalendarDay,
      variant: 'primary',
      tooltip: 'Asignar Fecha',
      onClick: () => alert('Asignar Fecha'),
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
        isOpen={isOpenVerDetalle}
        onClose={() => setIsOpenVerDetalle(false)}
        data={trabajoSelected}
        title={"Detalles del Trabajo de Titulación"}
      />

      <AsignacionTribunalModal
        isOpen={isOpenAsignarTutor}
        onClose={() => setIsOpenAsignarTutor(false)}
        trabajoData={trabajoSelected}
        title={"Asignación de tribunal"}
      />

    </div>

  );
};

AccionesTrabajo.propTypes = {
  trabajo: PropTypes.object.isRequired,
  permisosAcciones: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default AccionesTrabajo;
