import PropTypes from "prop-types";

/**
 * Componente que renderiza un campo de texto solo para lectura.
 * @param {{ label: string, value: string }} props
 * @prop {string} label - Texto del label del campo.
 * @prop {string} value - Valor a mostrar en el campo.
 * @returns {ReactElement} - Un ReactElement que representa el campo de texto.
 */
const SimpleField = ({ label, value }) => {
    const inputId = `simple-field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className="mb-4">
            <label htmlFor={inputId} className="block mb-2 font-medium">{label}</label>
            <input
                id={inputId}
                type="text"
                value={value || ""}
                readOnly
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

SimpleField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default SimpleField;