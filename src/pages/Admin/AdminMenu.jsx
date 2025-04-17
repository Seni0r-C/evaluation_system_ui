import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { transformMenuData } from "../../utils/menuUtils";
import axiosInstance from "../../services/axiosConfig";
import MenuForm from "../../components/formularios/MenuForm";

const AdminMenu = () => {
// const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [formState, setFormState] = useState({
        nombre: "",
        ruta_id: null,
        padre_id: null,
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

    const handleUpdateMenu = async () => {
        try {
            await axiosInstance.put(`rutas/menu/${formState.id}`, formState);
            fetchMenu();
            setFormState({ nombre: "", ruta_id: null, padre_id: null, orden: 0, todos: 0, icon: "" });
        } catch (error) {
            console.error("Error updating menu:", error);
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

    const updateMenuOrder = async (items) => {
        try {
            await axiosInstance.patch('/rutas/menu/reorder', { items });
            fetchMenu();
        } catch (error) {
            console.error("Error updating menu order:", error);
        }
    };

    const moveMenuItem = (id, direction, arrayMenu) => {
        const newMenuItems = [...arrayMenu];
        const index = newMenuItems.findIndex(item => item.id === id);
        if (index === -1) return;

        // Cambiar el orden según la dirección (subir o bajar)
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newMenuItems.length) return;

        // Intercambiar los ítems en el arreglo
        [newMenuItems[index].orden, newMenuItems[targetIndex].orden] = [newMenuItems[targetIndex].orden, newMenuItems[index].orden];
        // setMenuItems(newMenuItems);

        // Llamar al servidor para actualizar el orden
        updateMenuOrder(newMenuItems);
    };

    const handleEditMenu = (menu) => {
        console.log(menu);
        setFormState({
            id: menu.id,
            nombre: menu.name,
            ruta_id: menu.ruta_id,
            padre_id: menu.padre,
            todos: menu.todos,
            icon: menu.icon_name,
        });
    };

    const renderMenuItems = (items, isSubmenu = false) => {
        return (
            <ul className="space-y-2" >
                {items.filter((item) => item.name !== "Inicio").map((menu) => (
                    <li key={menu.id} className="p-2 border rounded">
                        <div className="flex  items-center">
                            <div className="flex space-x-2 mr-2">
                                <button
                                    onClick={() => moveMenuItem(menu.id, 'up', items)}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600  disabled:opacity-50"
                                    disabled={isSubmenu ? menu.orden === 1 : menu.orden === 2}
                                >
                                    ↑
                                </button>
                                <button
                                    onClick={() => moveMenuItem(menu.id, 'down', items)}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                    disabled={menu.orden === items.length}
                                >
                                    ↓
                                </button>
                            </div>
                            <div className="flex items-center space-x-2 mr-auto">
                                <span>{menu.orden}</span>
                                <span>{menu.icon}</span>
                                <span>{menu.name}</span>
                            </div>

                            {menu.subOptions.length > 0 ? (
                                <button
                                    onClick={() => toggleExpandMenu(menu.id)}
                                    className="text-blue-500 underline mr-4"
                                >
                                    {expandedMenus[menu.id] ? "Ocultar" : "Ver Submenu"}
                                </button>
                            )
                                :
                                <button
                                    onClick={() => handleDeleteMenu(menu.id)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                >
                                    <FaTrash />
                                </button>
                            }
                            <button
                                onClick={() => handleEditMenu(menu)}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
                            >
                                <FaEdit />
                            </button>

                        </div>
                        {expandedMenus[menu.id] && menu.subOptions.length > 0 && (
                            <div className="ml-4 mt-2 border-l pl-4">
                                {renderMenuItems(menu.subOptions, true)}
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
                <MenuForm
                    formState={formState}
                    handleInputChange={handleInputChange}
                    handleCreateMenu={handleCreateMenu}
                    rutas={rutas}
                    menuItems={menuItems}
                    handleUpdateMenu={handleUpdateMenu}
                    setFormState={setFormState}
                />

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