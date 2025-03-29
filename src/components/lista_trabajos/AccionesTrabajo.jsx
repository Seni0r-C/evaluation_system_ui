import { useState } from 'react';
import BotonAccion from '../common/BotonAccion';
import { FaCalendarDay, FaEdit, FaFilePdf, FaEye, FaFileArchive, FaFileAlt, FaFileSignature } from 'react-icons/fa';
import { MdArticle, MdChecklist, MdGavel, MdGroupAdd, MdRecordVoiceOver } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { permisos } from '../../utils/permisos';
import InfoTrabajoModal from '../modal/ModalData';
import { obtenerUnTrabajo2 } from '../../services/trabajosTitulacion';
import AsignarTribunalModal from '../utmodal/AsignacionTribunalModal';
import PropTypes from 'prop-types';
import { GrDocumentUser } from 'react-icons/gr';
import TrabajoFinalModal from '../utmodal/SubirTrabajoFinal';
import { generarActa } from '../../services/actaService';
import { generarDocCalificacion } from '../../services/notasDocService';
import { useMessage } from '../../hooks/useMessage';


const AccionesTrabajo = ({ trabajo, permisosAcciones, user }) => {
  const navigate = useNavigate();
  const [isOpenVerDetalle, setIsOpenVerDetalle] = useState(false);
  const [isOpenAsignarTribunal, setIsOpenAsignarTribunal] = useState(false);
  const [trabajoSelected, setTrabajoSelected] = useState(null);
  const [isOpenSubirTrabajoFinal, setIsOpenSubirTrabajoFinal] = useState(false);
  const { showMsg, showIfError } = useMessage();

  const fectchTrabajoFull = async (trabajo) => {
    if (trabajo?.id ?? false) {
      return await obtenerUnTrabajo2(setTrabajoSelected, trabajo.id);
    }
  };

  // Handlers
  const handleCalificar = (trabajo) => {
    navigate('/calificar', { state: { trabajo } });
  };

  const handleAsignarTribunal = (trabajo) => {
    showMsg({ typeMsg: 'wait', message: 'Cargando datos de tribunal...' });
    fectchTrabajoFull(trabajo).then(showIfError);
    setIsOpenAsignarTribunal(true);
  };

  const handleGenerarActa = (trabajo) => {
    showMsg({ typeMsg: 'wait', message: 'Generando Acta...' });
    generarActa(trabajo)
      .then(showIfError);
  };
  
  const handleDocCalificacion = (trabajo) => {
    showMsg({ typeMsg: 'wait', message: 'Generando documento calificación...' });
    generarDocCalificacion(trabajo)
      .then(showIfError);
  };

  const handleVerDetalles = (trabajo) => {
    showMsg({ typeMsg: 'wait', message: 'Cargando datos de trabajo...' });
    fectchTrabajoFull(trabajo).then(showIfError);
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
    // },
    // {
    //   roles: permisos.ROLES_GENERACION_DOCUMENTO_EVALUACION,
    //   permiso: 'generarReporte',
    //   icono: FaFileSignature,
    //   variant: 'blue',
    //   tooltip: 'Documento evaluación escrita',
    //   onClick: handleGenerarActa,
    },
    {
      roles: permisos.ROLES_GENERACION_DOCUMENTO_EVALUACION,
      permiso: 'generarReporte',
      // icono: MdRecordVoiceOver,
      // icono: FaFileSignature,
      icono: MdChecklist,
      variant: 'blue',
      tooltip: 'Generar documento calificación',
      onClick: handleDocCalificacion,
    },
    {
      roles: permisos.ROLES_GENERACION_DOCUMENTO_CALIFICACION,
      permiso: 'generarReporte',
      // icono: FaFilePdf,
      icono: MdGavel,
      variant: 'orange',
      // tooltip: 'Generar documento califiación',
      tooltip: 'Descargar acta',
      onClick: handleGenerarActa,
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
      roles: permisos.ROLES_CALIFICACION_TRABAJOS,
      permiso: 'ver-calificar',
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
      {accionesObjs.map(({ roles, permiso, icono, variant, tooltip, onClick }, index) =>
        roles.some((role) => user.roles.some(r => r.nombre === role)) &&
          permisosAcciones.includes(permiso) ? (
          <BotonAccion
            key={`btn-action-${index}`}
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
