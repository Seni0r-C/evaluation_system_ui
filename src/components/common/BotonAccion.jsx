import PropTypes from "prop-types";

/**
 * Componente que renderiza un botón de acción que se puede
 * personalizar con diferentes variantes de colores.
 *
 * @param {function} onClick - Función que se llama al hacer clic en
 *   el botón.
 * @param {ReactNode} icono - Un componente React que renderiza un icono
 *   que se mostrar  dentro del botón.
 * @param {string} [variant=primary] - El nombre de la variante de colores
 *   que se usar  para el botón. Puede ser 'primary', 'secondary', 'red',
 *   'green', 'yellow', 'purple', 'teal', o 'gray'. Si se omite, se
 *   usar  'primary' por defecto.
 * @param {string} [tooltip] - El texto que se mostrará como tooltip
 *   cuando el usuario pase el cursor sobre el botón.
 */
const ActionButton = ({ onClick, icono: Icono, variant = 'primary', tooltip }) => {
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
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
  const appliedClasses = variantClasses[variant] || variantClasses['primary'];

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

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icono: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'red', 'green', 'yellow', 'purple', 'teal', 'gray', 'orange', 'blue']),	
  tooltip: PropTypes.string,
};

export default ActionButton;