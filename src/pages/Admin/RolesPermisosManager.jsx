import { useState, useEffect } from 'react';
import {
    getRoles, createRol, updateRol, deleteRol,
    getPermisos, createPermiso, updatePermiso, deletePermiso
} from '../../services/rolesPermisosService';

import RolFormulario from '../../components/formularios/RolFormulario';
import RolLista from '../../components/listas/RolLista';
import PermisoFormulario from '../../components/formularios/PermisoFormulario';
import PermisoLista from '../../components/listas/PermisoLista';
import RolPermisosManager from '../../components/RolPermisosManager';

function RolesPermisosManager() {
    const [roles, setRoles] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedPermiso, setSelectedPermiso] = useState(null);
    const [activeTab, setActiveTab] = useState("roles");

    // Fetch inicial
    useEffect(() => {
        fetchRoles();
        fetchPermisos();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            console.error("Error al obtener roles", error);
        }
    };

    const fetchPermisos = async () => {
        try {
            const response = await getPermisos();
            setPermisos(response.data);
        } catch (error) {
            console.error("Error al obtener permisos", error);
        }
    };

    // Métodos Roles
    const handleCreateRol = async (data) => {
        const res = await createRol(data);
        if (res) fetchRoles();
    };

    const handleUpdateRol = async (id, data) => {
        const res = await updateRol(id, data);
        if (res) fetchRoles();
    };

    const handleDeleteRol = async (id) => {
        const res = await deleteRol(id);
        if (res) fetchRoles();
    };

    // Métodos Permisos
    const handleCreatePermiso = async (data) => {
        const res = await createPermiso(data);
        if (res) fetchPermisos();
    };

    const handleUpdatePermiso = async (id, data) => {
        const res = await updatePermiso(id, data);
        if (res) fetchPermisos();
    };

    const handleDeletePermiso = async (id) => {
        const res = await deletePermiso(id);
        if (res) fetchPermisos();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Roles y Permisos</h1>

            <div className="border-b mb-4">
                <nav className="flex space-x-4">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "roles" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                        onClick={() => setActiveTab("roles")}
                    >
                        Roles
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "permisos" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                        onClick={() => setActiveTab("permisos")}
                    >
                        Permisos
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "rol-permisos" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                        onClick={() => setActiveTab("rol-permisos")}
                    >
                        Autorización de Permisos a Roles
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === "roles" && (
                    <section>
                        <RolFormulario
                            onCreate={handleCreateRol}
                            onUpdate={handleUpdateRol}
                            selected={selectedRol}
                            setSelected={setSelectedRol}
                        />
                        <RolLista
                            roles={roles}
                            onDelete={handleDeleteRol}
                            onSelect={setSelectedRol}
                        />
                    </section>
                )}

                {activeTab === "permisos" && (
                    <section>
                        <PermisoFormulario
                            onCreate={handleCreatePermiso}
                            onUpdate={handleUpdatePermiso}
                            selected={selectedPermiso}
                            setSelected={setSelectedPermiso}
                        />
                        <PermisoLista
                            items={permisos}
                            onDelete={handleDeletePermiso}
                            onSelect={setSelectedPermiso}
                        />
                    </section>
                )}
                {activeTab === "rol-permisos" && (
                    <section>
                    <h2 className="text-xl font-semibold mb-4"> Autorización de Permisos a Roles</h2>
                    {/* <RolesPermisosView /> */}
                    <RolPermisosManager />
                    </section>
                )}
            </div>
        </div>
    );
}

export default RolesPermisosManager;
