import { useState } from "react";
import PropTypes from "prop-types";

const ComboBox = ({
    label,
    items = [],
    displayKey = "nombre",
    displayFn = null,
    onSelect,
    placeholder = "Seleccione una opción",
    required = false
}) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleChange = (event) => {
        const selectedId = event.target?.value || "";
        const item = items.find(i => String(i.id) === selectedId);
        setSelectedItem(item);
        onSelect && onSelect(item); // Devuelve el objeto completo
    };

    return (
        <div className="my-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                onChange={handleChange}
                value={selectedItem?.id || ""}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
};

export default ComboBox;
