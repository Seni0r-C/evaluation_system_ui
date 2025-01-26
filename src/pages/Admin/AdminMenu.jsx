import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import MenuForm from "../../components/formularios/MenuForm";
import MenuMuestra from "../../components/layout/menu/MenuMuestra";

const AdminMenu = () => {
    const [menuData, setMenuData] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        fetchMenuData();
        fetchRutas();
    }, []);

    const fetchMenuData = async () => {
        // Obtén el menú de acuerdo a los roles
        // Aquí va tu lógica para hacer fetch de los datos del menú
        // Por ejemplo, axiosInstance.get('/rutas/menu') para obtener los menús por rol
        const res = await axiosInstance.get("/rutas/menu/1"); // Cambia el id de rol según sea necesario
        setMenuData(res.data);
    };

    const fetchRutas = async () => {
        const res = await axiosInstance.get("/rutas/listar");
        setRutas(res.data);
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Gestión de Menús</h2>

            {/* Formulario para Crear o Editar Menú */}
            <MenuForm selectedMenu={selectedMenu} rutas={rutas} fetchMenuData={fetchMenuData} />

            {/* Lista de Menús */}
            <div className="space-y-4">
                {menuData.map(menu => (
                    <MenuMuestra key={menu.id} menu={menu} setSelectedMenu={setSelectedMenu} fetchMenuData={fetchMenuData} />
                ))}
            </div>
        </div>
    );
};

export default AdminMenu;
