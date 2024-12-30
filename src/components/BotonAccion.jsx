import PropsTypes from 'prop-types';

const BotonAccion = ({ onClick, icono: Icono, tooltip, className = '', variant = 'primary' }) => {
    const baseClasses = "p-2 text-[#4c4c4a] rounded transition duration-300 transform hover:scale-110";

    const variants = {
        primary: "bg-[#f8cf12]",
        secondary: "bg-gray-300"
    }

    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`${baseClasses} ${variants[variant]} ${className}`}
            >
                <Icono />
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {tooltip}
            </div>
        </div>
    )
};

BotonAccion.propTypes = {
    onClick: PropsTypes.func.isRequired,
    icono: PropsTypes.elementType.isRequired,
    tooltip: PropsTypes.string,
    className: PropsTypes.string,
    variant: PropsTypes.oneOf(['primary', 'secondary'])
};

export default BotonAccion;