import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosConfig';

const AdminRutasMenu = () => {
    const [roles, setRoles] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [menus, setMenus] = useState([]);
    const [newRuta, setNewRuta] = useState('');
    const [newMenu, setNewMenu] = useState({ nombre: '', ruta_id: '', padre_id: '', orden: 0, todos: 0, icon: '' });
    const [assignments, setAssignments] = useState([]);

    const fetchRoles = async () => {
        const res = await axiosInstance.get('/roles');
        const data = res.data;
        setRoles(data);
    };

    const fetchRutas = async () => {
        const res = await axiosInstance.get('/rutas/listar');
        const data = res.data;
        setRutas(data);
    };

    const fetchMenus = async () => {
        const res = await axiosInstance.get('/rutas/menu');
        const data = res.data;
        setMenus(data);
    };

    const handleCreateRuta = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post('/rutas/crear', { ruta: newRuta });
        if (res.status === 200) {
            fetchRutas();
            setNewRuta('');
        }
    };

    const handleCreateMenu = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post('/rutas/menu', newMenu);
        if (res.status === 200) {
            fetchMenus();
            setNewMenu({ nombre: '', ruta_id: '', padre_id: '', orden: 0, todos: 0, icon: '' });
        }
    };

    const fetchAssignments = async () => {
        // Simulate fetching assignments between roles and routes
        // const res = await fetch('/rutas/asignaciones');
        // const data = await res.json();
        const res = await axiosInstance.get('/rutas/asignaciones');
        const data = res.data;
        setAssignments(data);
    };

    const handleAssignRole = async (rutaId, rolId) => {
        const res = await axiosInstance.post(`/rutas/${rutaId}/roles/${rolId}`);
        if (res.status === 200) fetchAssignments();
    };

    // const handleUnassignRole = async (rutaId, rolId) => {
    //     const res = await fetch(`/rutas/${rutaId}/roles/${rolId}`, { method: 'DELETE' });
    //     if (res.ok) fetchAssignments();
    // };

    useEffect(() => {
        fetchRoles();
        fetchRutas();
        fetchMenus();
        // fetchAssignments();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Administración de Rutas y Menús</h1>

            {/* Roles */}
            {/* <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Roles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roles.map((rol) => (
                        <div
                            key={rol.id}
                            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-medium text-gray-700">{rol.nombre}</h3>
                        </div>
                    ))}
                </div>
            </section> */}


            {/* Rutas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Rutas</h2>

                <form className="mt-4" onSubmit={handleCreateRuta}>
                    <input
                        type="text"
                        value={newRuta}
                        onChange={(e) => setNewRuta(e.target.value)}
                        placeholder="Nombre de la ruta"
                        className="border border-gray-300 rounded px-2 py-1"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Agregar Ruta</button>
                </form>

                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Ruta</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rutas.map((ruta) => (
                            <tr key={ruta.id}>
                                <td className="px-4 py-2 border text-center">{ruta.id}</td>
                                <td className="px-4 py-2 border">{ruta.ruta}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </section>

            {/* Menús */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Menús</h2>
                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Nombre</th>
                            <th className="px-4 py-2 border">Ruta</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu.id}>
                                <td className="px-4 py-2 border text-center">{menu.id}</td>
                                <td className="px-4 py-2 border">{menu.nombre}</td>
                                <td className="px-4 py-2 border">{menu.ruta_id}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <form className="mt-4" onSubmit={handleCreateMenu}>
                    <input
                        type="text"
                        value={newMenu.nombre}
                        onChange={(e) => setNewMenu({ ...newMenu, nombre: e.target.value })}
                        placeholder="Nombre del menú"
                        className="border border-gray-300 rounded px-2 py-1 mb-2"
                    />
                    <select
                        value={newMenu.ruta_id}
                        onChange={(e) => setNewMenu({ ...newMenu, ruta_id: e.target.value })}
                        className="border border-gray-300 rounded px-2 py-1 mb-2"
                    >
                        <option value="">Seleccionar Ruta</option>
                        {rutas.map((ruta) => (
                            <option key={ruta.id} value={ruta.id}>
                                {ruta.ruta}
                            </option>
                        ))}
                    </select>
                    <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Agregar Menú</button>
                </form>
            </section>

            {/* Asignaciones */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Asignación de Roles a Rutas</h2>
                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Ruta</th>
                            <th className="px-4 py-2 border">Roles Asignados</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rutas.map((ruta) => (
                            <tr key={ruta.id}>
                                <td className="px-4 py-2 border">{ruta.ruta}</td>
                                <td className="px-4 py-2 border">
                                    {assignments
                                        .filter((a) => a.ruta_id === ruta.id)
                                        .map((a) => roles.find((r) => r.id === a.rol_id)?.nombre)
                                        .join(', ')}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {roles.map((rol) => (
                                        <button
                                            key={rol.id}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleAssignRole(ruta.id, rol.id)}
                                        >
                                            Asignar {rol.nombre}
                                        </button>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminRutasMenu;
