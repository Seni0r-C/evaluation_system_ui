import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { routes } from '../../routes/routes';
import GenericModal from '../../components/modal/GenericModal';
import { Link } from 'react-router-dom';
import { baseRoute } from '../../utils/constants';

const AdminRutas = () => {
    const [roles, setRoles] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [rolRutas, setRolRutas] = useState([]);
    const [selectedRuta, setSelectedRuta] = useState(null);
    const [showRolesModal, setShowRolesModal] = useState(false);

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

    const fetchRutasRol = async () => {
        const res = await axiosInstance.get('/rutas/rutas_rol');
        const data = res.data;
        setRolRutas(data);
    };

    const handleCreateRuta = async (ruta) => {
        const res = await axiosInstance.post('/rutas/crear', { ruta: ruta });
        if (res.status === 200) {
            fetchRutas();
        }
    };

    const handleAssignRole = async (rutaId, rolId) => {
        const res = await axiosInstance.post(`/rutas/${rutaId}/roles/${rolId}`);
        if (res.status === 200) {
            fetchRutasRol();
        }
    };

    const handleUnassignRole = async (rutaId, rolId) => {
        const res = await axiosInstance.delete(`/rutas/${rutaId}/roles/${rolId}`, { method: 'DELETE' });
        if (res.status === 200) {
            fetchRutasRol();
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchRutas();
        fetchRutasRol();
    }, []);

    const rutasExcluidas = [baseRoute + 'login', baseRoute, baseRoute + 'profile', '*', baseRoute + 'rutas'];

    const rutasConEstado = routes
        .filter((ruta) => !rutasExcluidas.includes(ruta.path))
        .map((ruta) => ({
            ...ruta,
            enBaseDatos: rutas.some((r) => r.ruta === ruta.path),
            id: rutas.find((r) => r.ruta === ruta.path)?.id,
        }));

    // Agregar ruta a la base de datos
    const agregarRutaDB = async (ruta) => {
        handleCreateRuta(ruta);
        fetchRutas();
    };

    // Eliminar ruta de la base de datos
    const eliminarRutaDB = async (id) => {
        await axiosInstance.delete(`/rutas/eliminar/${id}`);
        fetchRutas();
    };

    const handleRutaClick = (rutaSeleccionada) => {
        setSelectedRuta(rutaSeleccionada); // Actualiza la ruta seleccionada

        // Filtrar roles con acceso a la ruta seleccionada
        const rolesConAcceso = rolRutas.filter((item) => item.ruta === rutaSeleccionada.path);

        // Obtén los IDs de los roles con acceso
        const rolesConAccesoIds = rolesConAcceso.map((item) => item.rol);

        // Actualiza los roles con los accesos correspondientes
        setRoles(roles.map((role) => ({
            ...role,
            tieneAcceso: rolesConAccesoIds.includes(role.id), // Si el rol tiene acceso a la ruta
        })));

        setShowRolesModal(true);
    };

    return (
        <div className="p-4 px-16">
            <h1 className="text-2xl font-bold mb-4">Administración de Rutas</h1>

            {/* Rutas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Rutas</h2>

                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Ruta</th>
                            <th className="px-4 py-2 border">En Base de Datos</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rutasConEstado.sort((a, b) => {
                            if (a.id == null) return 1; // Si a no tiene id, va al final
                            if (b.id == null) return -1; // Si b no tiene id, va al final
                            return a.id - b.id; // Orden normal por id
                        }).map((ruta, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border text-center">{ruta.id}</td>
                                <td className="px-4 py-2 border">
                                    <Link to={ruta.path} className="text-blue-500 hover:underline">
                                        {ruta.path.replace(baseRoute, '/') || '/'}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {ruta.enBaseDatos ? "Sí" : "No"}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {ruta.enBaseDatos ? (
                                        <>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                                onClick={() => {
                                                    handleRutaClick(ruta);
                                                }}>
                                                Permisos
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() =>
                                                    eliminarRutaDB(ruta.id)
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </>

                                    ) : (
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                            onClick={() => agregarRutaDB(ruta.path)}
                                        >
                                            Agregar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {showRolesModal && (
                <GenericModal title="Permisos" onClose={() => setShowRolesModal(false)}>
                    <>
                        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Gestión de Roles</h2>
                        <p className="text-sm text-center text-gray-600 mb-6">Ruta Seleccionada: <span className="font-semibold text-blue-600">{selectedRuta.path}</span></p>
                        <div className="flex flex-wrap gap-6 justify-center">
                            {roles.filter((role) => role.id !== 1).map((role) => (
                                <div
                                    key={role.id}
                                    className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${role.tieneAcceso ? "bg-green-100 text-green-800" : "bg-gray-300 text-gray-600"} shadow-lg cursor-pointer transition-all transform hover:scale-105`}
                                    onClick={async () => {
                                        // Cambiar el estado de acceso
                                        role.tieneAcceso = !role.tieneAcceso;

                                        // Llamar a la función correspondiente para asignar o desasignar el rol
                                        if (role.tieneAcceso) {
                                            // Si el rol tiene acceso (se asigna), llamar a handleAssignRole
                                            await handleAssignRole(selectedRuta.id, role.id);
                                        } else {
                                            // Si el rol no tiene acceso (se desasigna), llamar a handleUnassignRole
                                            await handleUnassignRole(selectedRuta.id, role.id);
                                        }
                                    }}
                                >
                                    {role.nombre}
                                </div>
                            ))}
                        </div>
                    </>
                </GenericModal>

            )}
        </div>
    );
};

export default AdminRutas;
