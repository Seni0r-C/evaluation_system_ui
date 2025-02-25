import PropTypes from "prop-types";

const BotonAccion = ({ onClick, icono: Icono, variant = 'primary', tooltip }) => {
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
    orange: 'bg-orange-500 text-white hover:bg-orange-600',
    yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
    purple: 'bg-purple-500 text-white hover:bg-purple-600',
    teal: 'bg-teal-600 text-white hover:bg-teal-700',
  };

  const baseClasses = 'p-2 rounded focus:outline-none focus:ring transition duration-300';
  const appliedClasses = variantClasses[variant] || variantClasses['primary']; // Usa 'primary' como predeterminado

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${appliedClasses}`}
      title={tooltip}
    >
      {Icono && <Icono className="text-lg" />}
    </button>
  );
};

BotonAccion.propTypes = {
  onClick: PropTypes.func.isRequired,
  icono: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'red', 'green', 'yellow', 'purple', 'teal']),
  tooltip: PropTypes.string,
};

export default BotonAccion;
