const REGISTRADO = 'REGISTRADO';
const ASIGNADO = 'ASIGNADO';
const CALIFICADO = 'CALIFICADO';
const INFORME_GENERADO = 'INFORME GENERADO';
const FINALIZADO = 'FINALIZADO';
const RECHAZADO = 'RECHAZADO';
const colorMap = {
  [REGISTRADO]: 'bg-blue-100 text-blue-800',
  [ASIGNADO]: 'bg-orange-100 text-orange-800',
  [CALIFICADO]: 'bg-green-100 text-green-800',
  [INFORME_GENERADO]: 'bg-purple-100 text-purple-800',
  [FINALIZADO]: 'bg-cyan-100 text-cyan-800',
  [RECHAZADO]: 'bg-red-100 text-red-800',
};

const EstadoTrabajo = ({ estado }) => (
  <span className={`px-2 py-1 rounded-full text-sm ${colorMap[estado] || 'bg-gray-200 text-gray-800'}`}>
    {estado}
  </span>
);

export default EstadoTrabajo;
