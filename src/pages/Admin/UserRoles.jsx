import { useState, useEffect } from 'react';
import { buscarUsuarios } from '../../services/usuarioService';
import { getRoles, obtenerRolesDeUsuario, actualizarRolesDeUsuario } from '../../services/rolesService';
import { useMessage } from '../../hooks/useMessage';

const UserRoles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const { showMsg, showQuestion } = useMessage();
    const [hadSearch, setHadSearch] = useState(false);

    useEffect(() => {
        getRoles().then(setRoles);
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setUsers([]);
            return;
        }
        buscarUsuarios(searchTerm, setUsers);
        setHadSearch(true);
    };

    const handleSelectUser = async (user) => {
        setSelectedUser(user);
        const fetchedRoles = await obtenerRolesDeUsuario(user.id);
        setUserRoles(fetchedRoles.map(rol => rol.id));
    };

    const handleRoleChange = (rolId) => {
        setUserRoles(prev =>
            prev.includes(rolId) ? prev.filter(id => id !== rolId) : [...prev, rolId]
        );
    };

    const handleSaveChanges = async () => {
        const action = async () => {
            showMsg({ typeMsg: 'wait', message: 'Guardando cambios...' });
            const response = await actualizarRolesDeUsuario(selectedUser.id, userRoles);
            showMsg(response);
        };
        showQuestion('¿Está seguro de que desea guardar los cambios?', action);
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Gestión de Roles de Usuarios</h1>

            <div className="bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Panel de búsqueda de usuarios */}
                    <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Buscar Usuario</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Nombre o correo del usuario"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                onClick={handleSearch}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Resultados de búsqueda</h3>
                            {users.length > 0 ? (
                                <ul className="space-y-2">
                                    {users.map(user => (
                                        <li
                                            key={user.id}
                                            onClick={() => handleSelectUser(user)}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'}`}
                                        >
                                            <div className="font-medium">{user.nombre}</div>
                                            <div className="text-sm text-gray-500">Cédula: {user.cedula}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    {!hadSearch ? 'Ingrese un término de búsqueda' : 'No se encontraron usuarios'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panel de asignación de roles */}
                    {selectedUser ? (
                        <div className="w-full md:w-2/3 bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Roles de: <span className="text-blue-600">{selectedUser.nombre}</span>
                                </h2>
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Guardar Cambios
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium mb-4 text-gray-700">Seleccione los permisos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {roles.map(rol => (
                                        <div
                                            key={rol.id}
                                            className={`p-3 border rounded-lg transition-all ${userRoles.includes(rol.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    id={`rol-${rol.id}`}
                                                    checked={userRoles.includes(rol.id)}
                                                    onChange={() => handleRoleChange(rol.id)}
                                                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <div>
                                                    <span className="block font-medium text-gray-800">{rol.nombre}</span>
                                                    <span className="block text-xs text-gray-500 mt-1">
                                                        {rol.descripcion || 'Sin descripción disponible'}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">¿Cómo funcionan los roles?</h3>
                                <p className="text-sm text-blue-700">
                                    Seleccione los roles que desea asignar al usuario. Cada rol otorga la capacidad de ver ciertas rutas dentro del sistema.
                                    Los cambios se aplicarán después de hacer clic en &quot;Guardar Cambios&quot;.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full md:w-2/3 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-600">Seleccione un usuario</h3>
                            <p className="mt-2 text-sm text-gray-500 text-center">
                                Busque y seleccione un usuario de la lista para ver y editar sus roles.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserRoles;