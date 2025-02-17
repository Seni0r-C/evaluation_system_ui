import { useState } from "react";
import PropTypes from "prop-types";

const ComboBox = ({ 
    label,
    items = [], 
    displayKey = "nombre", 
    displayFn = null, 
    onSelect, 
    placeholder = "Seleccione una opción",
    required = false,
    borderColor = "border-blue-300",   // Color del borde por defecto
    bgColor = "bg-white",              // Color de fondo por defecto
    ringColor = "focus:ring-blue-500"  // Color del ring (borde al enfocar)
}) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        const item = items.find(i => String(i.id) === selectedId);
        setSelectedItem(item);
        onSelect && onSelect(item); // Devuelve el objeto completo
    };

    return (
        <div className="mb-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                onChange={handleChange}
                value={selectedItem?.id || ""}
                className={` ${borderColor} ${bgColor} ${ringColor} border rounded px-2 py-2 focus:outline-none focus:ring-1 `}
                required={required}
            >
                <option value="">{placeholder}</option>
                {items.map(item => (
                    <option key={item.id} value={item.id}>
                        {displayFn ? displayFn(item) : item[displayKey]}
                    </option>
                ))}
            </select>
        </div>
    );
};

ComboBox.propTypes = {
    label: PropTypes.string,
    items: PropTypes.array.isRequired,
    displayKey: PropTypes.string,
    displayFn: PropTypes.func,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    borderColor: PropTypes.string,
    bgColor: PropTypes.string,
    ringColor: PropTypes.string
};

export default ComboBox;
