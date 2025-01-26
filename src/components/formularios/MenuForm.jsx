import  { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MenuForm = ({ selectedMenu, rutas, fetchMenuData }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        ruta_id: "",
        padre_id: "",
        orden: "",
        todos: 0,
        icon: "",
    });

    useEffect(() => {
        if (selectedMenu) {
            setFormData({
                nombre: selectedMenu.menu_nombre,
                ruta_id: selectedMenu.ruta_id,
                padre_id: selectedMenu.padre_id,
                orden: selectedMenu.orden,
                todos: selectedMenu.todos,
                icon: selectedMenu.icon,
            });
        }
    }, [selectedMenu]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedMenu) {
                await axios.patch(`/menu/${selectedMenu.id}`, formData);
            } else {
                await axios.post("/menu", formData);
            }
            fetchMenuData();
        } catch (error) {
            console.error("Error al guardar el menú:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Menú</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Ruta</label>
                <select
                    name="ruta_id"
                    value={formData.ruta_id}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                >
                    {rutas.map((ruta) => (
                        <option key={ruta.id} value={ruta.id}>
                            {ruta.ruta}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Orden</label>
                <input
                    type="number"
                    name="orden"
                    value={formData.orden}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded-md">
                    {selectedMenu ? "Actualizar Menú" : "Crear Menú"}
                </button>
            </div>
        </form>
    );
};

MenuForm.propTypes = {
    selectedMenu: PropTypes.object,
    rutas: PropTypes.array,
    fetchMenuData: PropTypes.func,
};

export default MenuForm;