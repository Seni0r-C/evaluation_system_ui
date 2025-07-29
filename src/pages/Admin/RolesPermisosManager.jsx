import { useState, useEffect } from 'react';
import {
    getRoles, createRol, updateRol, deleteRol
} from '../../services/rolesPermisosService';

import RolFormulario from '../../components/formularios/RolFormulario';
import RolLista from '../../components/listas/RolLista';

function RolesPermisosManager() {
    const [roles, setRoles] = useState([]);
    const [selectedRol, setSelectedRol] = useState(null);

    // Fetch inicial
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            console.error("Error al obtener roles", error);
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Roles y Permisos</h1>
            <div>
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
            </div>
        </div>
    );
}

export default RolesPermisosManager;
