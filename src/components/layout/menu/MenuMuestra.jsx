import { useState } from "react";
import axios from "axios";
import { getIcon } from "../../../utils/menuUtils";
import PropTypes from "prop-types";

const MenuMuestra = ({ menu, setSelectedMenu, fetchMenuData }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/menu/${menu.id}`);
            fetchMenuData();
        } catch (error) {
            console.error("Error eliminando el menú:", error);
        }
    };

    const handleEdit = () => {
        setSelectedMenu(menu);
    };

    return (
        <div className="border-b border-gray-200 py-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {getIcon(menu.icon)}
                    <span className="text-lg font-medium">{menu.menu_nombre}</span>
                </div>
                <div className="flex space-x-3">
                    <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">Editar</button>
                    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">Eliminar</button>
                </div>
            </div>

            {/* Submenú */}
            {menu.submenu && isExpanded && (
                <div className="pl-6 mt-2">
                    {menu.submenu.map(subMenu => (
                        <MenuMuestra key={subMenu.id} menu={subMenu} setSelectedMenu={setSelectedMenu} fetchMenuData={fetchMenuData} />
                    ))}
                </div>
            )}

            {/* Toggle Submenu */}
            {menu.submenu && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 text-blue-500 hover:text-blue-700"
                >
                    {isExpanded ? "Ocultar Submenú" : "Ver Submenú"}
                </button>
            )}
        </div>
    );
};

MenuMuestra.propTypes = {
    menu: PropTypes.object.isRequired,
    setSelectedMenu: PropTypes.func.isRequired,
    fetchMenuData: PropTypes.func.isRequired,
};

export default MenuMuestra;
