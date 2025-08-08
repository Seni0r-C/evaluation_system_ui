import PropTypes from 'prop-types';
import { capitalizeWords } from '../../utils/constants';

/**
 * Componente de campo de entrada de formulario que puede ser de tipo text, checkbox, select, etc.
 * 
 * @param {string} label Etiqueta del campo, opcional
 * @param {string} type Tipo de campo, predeterminado 'text'
 * @param {string} value Valor actual del campo
 * @param {string} name Nombre del campo
 * @param {Function} onChange Función que se llama cuando se produce un cambio en el campo
 * @param {string} placeholder Texto que se muestra en el campo cuando no tiene valor, opcional
 * @param {Array} options Arreglo de opciones que se muestran cuando type es 'select', predeterminado []
 * @param {boolean} required Indica si el campo es requerido, predeterminado false
 * @param {boolean} capitalize Indica si se deben capitalizar las palabras de las opciones del select, predeterminado false
 * 
 * @returns {ReactElement} - Un ReactElement que representa el campo de entrada
 */
const InputField = ({
    label,
    type = 'text',
    value,
    name,
    onChange,
    placeholder,
    options = [],
    required = false,
    capitalize = false
}) => {
    const inputId = `input-field-${name}`;

    return (
        <div className="mb-4">
            {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            {type === 'select' ? (
                <select
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full border rounded px-3 py-2"
                    required={required}
                >
                    <option value="">{placeholder || 'Seleccione una opción'}</option>
                    {options.map((option) => (
                        <option key={option.id || option} value={option.id || option}>
                            {capitalize
                                ? capitalizeWords(option.nombre || option)
                                : option.nombre || option}
                        </option>
                    ))}
                </select>

            ) : (
                <input
                    id={inputId}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full border rounded px-3 py-2"
                    required={required}
                />
            )}
        </div >
    );
};

InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    capitalize: PropTypes.bool
};

export default InputField;