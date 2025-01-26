import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { transformMenuData } from "../../utils/menuUtils";
import axiosInstance from "../../services/axiosConfig";
import MenuForm from "../../components/formularios/MenuForm";


const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [formState, setFormState] = useState({
        nombre: "",
        ruta_id: null,
        padre_id: null,
        orden: 0,
        todos: 0,
        icon: "",
    });
    const [expandedMenus, setExpandedMenus] = useState({});

    useEffect(() => {
        fetchMenu();
        fetchRutas();
    }, []);

    const fetchMenu = async () => {
        try {
            const res = await axiosInstance.get(`/rutas/menu/1`);
            const formattedMenu = transformMenuData(res.data);
            setMenuItems(formattedMenu);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };

    const fetchRutas = async () => {
        try {
            const res = await axiosInstance.get(`/rutas/listar`);
            setRutas(res.data);
        } catch (error) {
            console.error("Error fetching rutas:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleCreateMenu = async () => {
        try {
            await axiosInstance.post(`rutas/menu`, formState);
            fetchMenu();
            setFormState({ nombre: "", ruta_id: null, padre_id: null, orden: 0, todos: 0, icon: "" });
        } catch (error) {
            console.error("Error creating menu:", error);
        }
    };

    const handleDeleteMenu = async (id) => {
        try {
            await axiosInstance.delete(`rutas/menu/${id}`);
            fetchMenu();
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };

    const toggleExpandMenu = (menuId) => {
        setExpandedMenus((prevState) => ({
            ...prevState,
            [menuId]: !prevState[menuId],
        }));
    };

    const renderMenuItems = (items) => {
        return (
            <ul className="space-y-2">
                {items.filter((item) => item.name !== "Inicio").map((menu) => (
                    <li key={menu.name} className="p-2 border rounded">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <span>{menu.orden}</span>
                                <span>{menu.icon}</span>
                                <span>{menu.name}</span>
                            </div>
                            {menu.subOptions.length > 0 && (
                                <button
                                    onClick={() => toggleExpandMenu(menu.name)}
                                    className="text-blue-500 underline"
                                >
                                    {expandedMenus[menu.name] ? "Ocultar" : "Ver Submenu"}
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteMenu(menu.id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                                <FaTrash />
                            </button>
                        </div>
                        {expandedMenus[menu.name] && menu.subOptions.length > 0 && (
                            <div className="ml-4 mt-2 border-l pl-4">
                                {renderMenuItems(menu.subOptions)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Administrar Menú</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Formulario */}
                <MenuForm formState={formState} handleInputChange={handleInputChange} handleCreateMenu={handleCreateMenu} rutas={rutas} menuItems={menuItems} />

                {/* Lista del menú */}
                <div className="border rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Menús</h2>
                    {renderMenuItems(menuItems)}
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
