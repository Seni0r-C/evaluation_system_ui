import { useState } from 'react';
import BotonAccion from '../common/BotonAccion';
import { FaCalendarDay, FaEdit, FaFilePdf, FaEye } from 'react-icons/fa';
import { MdChecklist, MdGroupAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { permisos } from '../../utils/permisos';
import InfoTrabajoModal from '../modal/ModalData';
import { obtenerUnTrabajo } from '../../services/trabajosTitulacion';
import AsignarTribunalModal from '../utmodal/AsignacionTribunalModal';
import PropTypes from 'prop-types';
import { GrDocumentUser } from 'react-icons/gr';
import TrabajoFinalModal from '../utmodal/SubirTrabajoFinal';
import { generarActa } from '../../services/actaService';
import { useMessage } from '../../hooks/useMessage';


const AccionesTrabajo = ({ trabajo, permisosAcciones, user }) => {
  const navigate = useNavigate();
  const [isOpenVerDetalle, setIsOpenVerDetalle] = useState(false);
  const [isOpenAsignarTribunal, setIsOpenAsignarTribunal] = useState(false);
  const [trabajoSelected, setTrabajoSelected] = useState(null);
  const [isOpenSubirTrabajoFinal, setIsOpenSubirTrabajoFinal] = useState(false);
  const { showMsg } = useMessage();

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
    setIsOpenAsignarTribunal(true);
  };

  const handleGenerarReporte = (trabajo) => {
    showMsg({ typeMsg: 'wait', message: 'Generando Acta...' });
    generarActa(trabajo)
      .then(showMsg);
  };

  const handleVerDetalles = (trabajo) => {
    fectchTrabajoFull(trabajo);
    setIsOpenVerDetalle(true);
  };

  const handleSubirTrabajoFinal = (trabajo) => {
    setTrabajoSelected(trabajo);
    setIsOpenSubirTrabajoFinal(true);
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
    {
      roles: permisos.ROLES_REGISTRO_TRABAJO,
      permiso: 'subirTrabajoFinal',
      icono: GrDocumentUser,
      variant: 'primary',
      tooltip: 'Subir Trabajo Final',
      onClick: handleSubirTrabajoFinal,
    }
  ];

  return (
    <div className="flex justify-end gap-4">
      {accionesObjs.map(({ roles, permiso, icono, variant, tooltip, onClick }) =>
        roles.some((role) => user.roles.some(r => r.nombre === role)) &&
          permisosAcciones.includes(permiso) ? (
          <BotonAccion
            key={permiso}
            onClick={() => onClick(trabajo)}
            icono={icono}
            variant={variant}
            tooltip={tooltip}
          />
        ) : null
      )}

      <InfoTrabajoModal
        isOpen={isOpenVerDetalle}
        onClose={() => setIsOpenVerDetalle(false)}
        data={trabajoSelected}
        title={"Detalles del Trabajo de Titulación"}
      />

      <AsignarTribunalModal
        isOpen={isOpenAsignarTribunal}
        onClose={() => setIsOpenAsignarTribunal(false)}
        trabajoData={trabajoSelected}
        title={"Asignación de tribunal"}
      />

      <TrabajoFinalModal
        isOpen={isOpenSubirTrabajoFinal}
        onClose={() => setIsOpenSubirTrabajoFinal(false)}
        trabajoData={trabajoSelected}
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
