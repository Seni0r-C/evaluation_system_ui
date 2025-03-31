import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Componente que renderiza un select con la lista de items.
 * 
 * @param {{ label: string, items: array, displayKey: string, displayFn: function, onSelect: function, placeholder: string, required: boolean }} props
 * @prop {string} label - Texto del label del campo. Opcional.
 * @prop {array} items - Lista de objetos que se renderizarán como opciones del select. Opcional. Por defecto es un arreglo vacío.
 * @prop {string} displayKey - Clave del objeto que se utilizar  para mostrar el texto en el select. Opcional. Por defecto se utiliza la clave "nombre".
 * @prop {function} displayFn - Función que se utilizar  para mostrar el texto en el select. Opcional. Por defecto se utiliza la clave "nombre" del objeto.
 * @prop {function} onSelect - Función que se llamar  cuando se seleccione un item. Opcional. Por defecto no se llama a ninguna función.
 * @prop {string} placeholder - Texto que se mostrar  en el select antes de que se seleccione un item. Opcional. Por defecto es "Seleccione una opción".
 * @prop {boolean} required - Indica si el campo es requerido. Opcional. Por defecto es false.
 */
const ComboBox = ({
    label,
    items = [],
    displayKey = "nombre",
    displayFn = null,
    onSelect,
    placeholder = "Seleccione una opción",
    required = false,
    selectedInitialItem = null,
    disabled = false 
}) => {
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (selectedInitialItem?.id??null !== null) {
            const item = items.find(i => String(i.id) === String(selectedInitialItem.id));
            setSelectedItem(item || null);
        }
    }, [selectedInitialItem, items]);

    const handleChange = (event) => {
        const selectedId = event.target.value || "";
        const item = items.find(i => String(i.id) === selectedId);
        setSelectedItem(item);
        onSelect && onSelect(item);
    };

    return (
        <div className="my-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                disabled={disabled}
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
    disabled: PropTypes.bool,
};

export default ComboBox;
