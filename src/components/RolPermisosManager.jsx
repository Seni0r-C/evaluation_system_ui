import { useEffect, useState } from "react";
import {
    getRoles,
    getPermisos,
    getPermisosByRol,
    asignarPermisoARol,
    quitarPermisoDeRol
} from "../services/rolesPermisosService";

const RolPermisosManager = () => {
    const [roles, setRoles] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);

    const [permisos, setPermisos] = useState([]);
    const [permisosAsignados, setPermisosAsignados] = useState([]);
    const [seleccionadosDisponibles, setSeleccionadosDisponibles] = useState(new Set());

    useEffect(() => {
        getRoles().then(setRoles);
        getPermisos().then(setPermisos);
    }, []);

    useEffect(() => {
        if (rolSeleccionado) {
            getPermisosByRol(rolSeleccionado.id).then(setPermisosAsignados);
            setSeleccionadosDisponibles(new Set());
        }
    }, [rolSeleccionado]);

    const getPermisosDisponibles = () => {
        const idsAsignados = permisosAsignados.map(p => p.id);
        return permisos.filter(p => !idsAsignados.includes(p.id));
    };

    const handleAsignarPermisos = async () => {
        for (let id_permiso of seleccionadosDisponibles) {
            await asignarPermisoARol(rolSeleccionado.id, id_permiso);
        }
        const actualizados = await getPermisosByRol(rolSeleccionado.id);
        setPermisosAsignados(actualizados);
        setSeleccionadosDisponibles(new Set());
    };

    const handleQuitarPermiso = async (id_permiso) => {
        await quitarPermisoDeRol(rolSeleccionado.id, id_permiso);
        const actualizados = await getPermisosByRol(rolSeleccionado.id);
        setPermisosAsignados(actualizados);
    };

    return (
        <div className="p-4">
            <label className="block font-semibold mb-2">Rol:</label>
            <select
                className="border p-2 w-full mb-4"
                onChange={(e) => {
                    const rol = roles && roles.find(r => r.id == e.target.value);
                    setRolSeleccionado(rol || null);
                }}
            >
                <option value="">Seleccione un rol</option>
                {roles && roles.map(rol => (
                    <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                ))}
            </select>

            {rolSeleccionado && (
                <div className="flex gap-6">
                    {/* Permisos disponibles */}
                    <div className="flex-1 border p-2">
                        <h3 className="font-bold mb-2">Permisos disponibles</h3>
                        {getPermisosDisponibles().map(p => (
                            <label key={p.id} className="block">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        const newSet = new Set(seleccionadosDisponibles);
                                        e.target.checked ? newSet.add(p.id) : newSet.delete(p.id);
                                        setSeleccionadosDisponibles(newSet);
                                    }}
                                />
                                <span className="ml-2">{p.nombre}</span>
                            </label>
                        ))}

                        <button
                            onClick={handleAsignarPermisos}
                            className="bg-blue-500 text-white px-4 py-2 mt-4"
                            disabled={seleccionadosDisponibles.size === 0}
                        >
                            Asignar →
                        </button>
                    </div>

                    {/* Permisos asignados */}
                    <div className="flex-1 border p-2">
                        <h3 className="font-bold mb-2">Permisos asignados al rol</h3>
                        {permisosAsignados && permisosAsignados.map(p => (
                            <div key={p.id} className="flex justify-between items-center mb-2">
                                <span>{p.nombre}</span>
                                <button
                                    onClick={() => handleQuitarPermiso(p.id)}
                                    className="bg-red-500 text-white px-2 py-1"
                                >
                                    Quitar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolPermisosManager;
