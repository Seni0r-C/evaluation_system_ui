import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminRutas() {
    const [rutas, setRutas] = useState([]);
    const [roles, setRoles] = useState([]);
    //   const [nuevoRol, setNuevoRol] = useState("");
    const [nuevaRuta, setNuevaRuta] = useState({ nombre: "", ruta: "", padre: null, orden: 0 });
    const [rolId, setRolId] = useState(null);

    // Cargar rutas y roles al iniciar
    useEffect(() => {
        fetchRutas();
        fetchRoles();
    }, []);

    // Obtener las rutas
    const fetchRutas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/rutas");
            setRutas(response.data);
        } catch (error) {
            console.error("Error al obtener rutas", error);
        }
    };

    // Obtener los roles (esto es un ejemplo, puedes adaptarlo según tu base de datos)
    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:3000/roles");
            setRoles(response.data);
        } catch (error) {
            console.error("Error al obtener roles", error);
        }
    };

    // Crear una nueva ruta
    const handleAddRuta = async () => {
        try {
            const response = await axios.post("http://localhost:3000/rutas", nuevaRuta);
            setRutas([...rutas, response.data]);
            setNuevaRuta({ nombre: "", ruta: "", padre: null, orden: 0 });
        } catch (error) {
            console.error("Error al agregar ruta", error);
        }
    };

    // Asignar rol a ruta
    const handleAssignRole = async (rutaId, rolId) => {
        try {
            await axios.post(`http://localhost:3000/rutas/${rutaId}/roles/${rolId}`);
            fetchRutas(); // Recargar rutas después de asignar rol
        } catch (error) {
            console.error("Error al asignar rol", error);
        }
    };

    // Eliminar rol de ruta
    const handleRemoveRole = async (rutaId, rolId) => {
        try {
            await axios.delete(`http://localhost:3000/rutas/${rutaId}/roles/${rolId}`);
            fetchRutas(); // Recargar rutas después de eliminar rol
        } catch (error) {
            console.error("Error al eliminar rol", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8">Gestión de Rutas y Roles</h1>

                {/* Crear Ruta */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Crear nueva ruta</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre de la Ruta"
                            className="input"
                            value={nuevaRuta.nombre}
                            onChange={(e) => setNuevaRuta({ ...nuevaRuta, nombre: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Ruta (ej. /dashboard)"
                            className="input"
                            value={nuevaRuta.ruta}
                            onChange={(e) => setNuevaRuta({ ...nuevaRuta, ruta: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Orden"
                            className="input"
                            value={nuevaRuta.orden}
                            onChange={(e) => setNuevaRuta({ ...nuevaRuta, orden: e.target.value })}
                        />
                        {/* Selector de Padre */}
                        <div className="space-y-2">
                            <label className="text-lg">Padre (opcional)</label>
                            <select
                                value={nuevaRuta.padre || ""}
                                onChange={(e) => setNuevaRuta({ ...nuevaRuta, padre: e.target.value === "" ? null : e.target.value })}
                                className="input w-full"
                            >
                                <option value="">Seleccionar Padre</option>
                                {rutas.map((ruta) => (
                                    <option key={ruta.id} value={ruta.id}>
                                        {ruta.nombre} ({ruta.ruta})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAddRuta}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Crear Ruta
                        </button>
                    </div>
                </div>

                {/* Lista de rutas y roles asignados */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Rutas Disponibles</h2>
                    <table className="min-w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left">Ruta</th>
                                <th className="px-6 py-3 text-left">Roles Asignados</th>
                                <th className="px-6 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rutas.map((ruta) => (
                                <tr key={ruta.id} className="border-b">
                                    <td className="px-6 py-4">{ruta.nombre}</td>
                                    <td className="px-6 py-4">
                                        {ruta.roles ? (
                                            ruta.roles.map((role) => (
                                                <span key={role.id} className="badge bg-green-500 text-white mr-2">
                                                    {role.nombre}
                                                    <button
                                                        onClick={() => handleRemoveRole(ruta.id, role.id)}
                                                        className="ml-2 text-xs text-red-500"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </span>
                                            ))
                                        ) : (
                                            <span>No asignados</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            onChange={(e) => setRolId(e.target.value)}
                                            className="px-4 py-2 border rounded"
                                        >
                                            <option value="">Seleccionar Rol</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleAssignRole(ruta.id, rolId)}
                                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Asignar Rol
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminRutas;
