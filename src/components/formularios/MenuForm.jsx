import React, { useEffect, useRef, useState } from "react";
import { iconsMap } from "../../utils/menuUtils";
import PropTypes from "prop-types";

const MenuForm = ({ formState, handleInputChange, handleCreateMenu, rutas, menuItems }) => {
    const [showIconMenu, setShowIconMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState("bottom");
    const buttonRef = useRef(null);

    const handleIconSelect = (iconKey) => {
        handleInputChange({ target: { name: "icon", value: iconKey } });
        setShowIconMenu(false);
    };

    useEffect(() => {
        if (showIconMenu && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Si no hay espacio suficiente abajo, despliega hacia arriba
            if (rect.bottom + 150 > windowHeight) {
                setMenuPosition("top");
            } else {
                setMenuPosition("bottom");
            }
        }
    }, [showIconMenu]);

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Agregar Menú</h2>
            <div className="space-y-2">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del menú"
                    value={formState.nombre}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <select
                    name="ruta_id"
                    value={formState.ruta_id || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Seleccionar Ruta</option>
                    {rutas.map((ruta) => (
                        <option key={ruta.id} value={ruta.id}>
                            {ruta.ruta}
                        </option>
                    ))}
                </select>
                <select
                    name="padre_id"
                    value={formState.padre_id || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Sin Padre</option>
                    {menuItems.map((menu) => (
                        <option key={menu.id} value={menu.id}>
                            {menu.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="orden"
                    placeholder="Orden"
                    value={formState.orden}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <select
                    name="todos"
                    value={formState.todos}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                >
                    <option value={0}>No visible para todos</option>
                    <option value={1}>Visible para todos</option>
                </select>
                <div className="relative">
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={() => setShowIconMenu((prev) => !prev)}
                        className="w-full p-2 border rounded bg-white text-left flex items-center space-x-2"
                    >
                        <span className="text-xl">{iconsMap[formState.icon] && React.createElement(iconsMap[formState.icon])}</span>
                        <span>{formState.icon || "Seleccionar Ícono"}</span>
                    </button>
                    {showIconMenu && (
                        <ul
                            className={`absolute z-10 w-full bg-white border rounded shadow-md ${menuPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
                                }`}
                        >
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleIconSelect("")}
                            >
                                Seleccionar Ícono
                            </li>
                            {Object.keys(iconsMap).map((key) => (
                                <li
                                    key={key}
                                    onClick={() => handleIconSelect(key)}
                                    className="cursor-pointer p-2 hover:bg-gray-100 flex items-center space-x-2"
                                >
                                    <span className="text-xl">{React.createElement(iconsMap[key])}</span>
                                    <span>{key}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={handleCreateMenu}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

MenuForm.propTypes = {
    formState: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleCreateMenu: PropTypes.func.isRequired,
    rutas: PropTypes.array.isRequired,
    menuItems: PropTypes.array.isRequired,
};

export default MenuForm;