import React, { useEffect, useRef, useState } from "react";
import { iconsMap } from "../../utils/menuUtils";
import PropTypes from "prop-types";

const MenuForm = ({ formState, setFormState, handleInputChange, handleCreateMenu, rutas, menuItems, handleUpdateMenu }) => {
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
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del menú</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre del menú"
                        value={formState.nombre}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ruta_id" className="block text-sm font-medium text-gray-700">Ruta</label>
                    <select
                        name="ruta_id"
                        id="ruta_id"
                        value={formState.ruta_id || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Ruta</option>
                        {rutas.map((ruta) => (
                            <option key={ruta.id} value={ruta.id}>
                                {ruta.ruta}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="padre_id" className="block text-sm font-medium text-gray-700">Menú Padre</label>
                    <select
                        name="padre_id"
                        id="padre_id"
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
                </div>
                <div>
                    <label htmlFor="todos" className="block text-sm font-medium text-gray-700">Visibilidad</label>
                    <select
                        name="todos"
                        id="todos"
                        value={formState.todos}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value={0}>No visible para todos</option>
                        <option value={1}>Visible para todos</option>
                    </select>
                </div>
                <div className="relative">
                    <label htmlFor="icon-button" className="block text-sm font-medium text-gray-700">Icono</label>
                    <button
                        id="icon-button"
                        type="button"
                        ref={buttonRef}
                        onClick={() => setShowIconMenu((prev) => !prev)}
                        className="w-full p-2 border rounded bg-white text-left flex items-center space-x-2"
                        aria-haspopup="true"
                        aria-expanded={showIconMenu}
                        aria-controls="icon-menu"
                    >
                        <span className="text-xl">{iconsMap[formState.icon] && React.createElement(iconsMap[formState.icon])}</span>
                        <span>{formState.icon || "Seleccionar Ícono"}</span>
                    </button>
                    {showIconMenu && (
                        <ul
                            id="icon-menu"
                            role="menu"
                            className={`absolute z-10 w-full bg-white border rounded shadow-md ${menuPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
                                }`}
                        >
                            <li role="menuitem">
                                <button
                                    onClick={() => handleIconSelect("")}
                                    className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Seleccionar Ícono
                                </button>
                            </li>
                            {Object.keys(iconsMap).map((key) => (
                                <li key={key} role="menuitem">
                                    <button
                                        onClick={() => handleIconSelect(key)}
                                        className="w-full text-left cursor-pointer p-2 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <span className="text-xl">{React.createElement(iconsMap[key])}</span>
                                        <span>{key}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={formState.id ? handleUpdateMenu : handleCreateMenu}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {formState.id ? "Actualizar Menú" : "Crear Menú"}
                </button>
                {formState.id && (
                    <button
                        onClick={() => setFormState({ nombre: "", ruta_id: null, padre_id: null, orden: 0, todos: 0, icon: "" })}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                )}
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
    handleUpdateMenu: PropTypes.func.isRequired,
    setFormState: PropTypes.func
};

export default MenuForm;