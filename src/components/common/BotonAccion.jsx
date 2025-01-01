import React from 'react';

const BotonAccion = ({ onClick, icono: Icono, variant = 'primary', tooltip }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded focus:outline-none focus:ring transition duration-300 ${
      variant === 'primary'
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : 'bg-gray-500 text-white hover:bg-gray-600'
    }`}
    title={tooltip}
  >
    {Icono && <Icono className="text-lg" />}
  </button>
);

export default BotonAccion;
