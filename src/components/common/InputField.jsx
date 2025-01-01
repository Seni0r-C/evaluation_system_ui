import PropTypes from 'prop-types';
import { capitalizeWords } from '../../utils/constants';

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
}) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        {type === 'select' ? (
            <select
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
                            ? (capitalizeWords(option.nombre || option))
                            : (option.nombre || option)}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border rounded px-3 py-2"
                required={required}
            />
        )}
    </div>
);

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