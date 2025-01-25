import PropTypes from 'prop-types';

const colorMap = {
  1: 'bg-gray-200 text-gray-800',
  2: 'bg-yellow-100 text-yellow-800',
  3: 'bg-green-100 text-green-800',
  4: 'bg-blue-100 text-blue-800',
};

const EstadoTrabajo = ({ estado, estado_id }) => {
  const colorClass = colorMap[estado_id] || 'bg-gray-200 text-gray-800';
  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colorClass}`}>
      {estado}
    </span>
  );
};

EstadoTrabajo.propTypes = {
  estado: PropTypes.string.isRequired,
  estado_id: PropTypes.number.isRequired,
};

export default EstadoTrabajo;