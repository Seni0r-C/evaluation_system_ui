import { estadosTrabajos } from '../../utils/estados_trabajos';

const colorMap = {
  [estadosTrabajos.REGISTRADO]: 'bg-blue-100 text-blue-800',
  [estadosTrabajos.ASIGNADO]: 'bg-orange-100 text-orange-800',
  [estadosTrabajos.CALIFICADO]: 'bg-green-100 text-green-800',
  [estadosTrabajos.INFORME_GENERADO]: 'bg-purple-100 text-purple-800',
  [estadosTrabajos.FINALIZADO]: 'bg-cyan-100 text-cyan-800',
  [estadosTrabajos.RECHAZADO]: 'bg-red-100 text-red-800',
};

const EstadoTrabajo = ({ estado }) => (
  <span className={`px-2 py-1 rounded-full text-sm ${colorMap[estado] || 'bg-gray-200 text-gray-800'}`}>
    {estado}
  </span>
);

export default EstadoTrabajo;
