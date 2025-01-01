const colorMap = {
    Aprobado: 'bg-green-100 text-green-800',
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Rechazado: 'bg-red-100 text-red-800',
    Registrado: 'bg-gray-100 text-gray-800',
  };
  
  const EstadoTrabajo = ({ estado }) => (
    <span className={`px-2 py-1 rounded-full text-sm ${colorMap[estado] || 'bg-gray-200 text-gray-800'}`}>
      {estado}
    </span>
  );
  
  export default EstadoTrabajo;
  