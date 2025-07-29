import { useState, useEffect } from 'react';
import { buscarUsuarios } from '../../services/usuarioService';
import { getRoles, obtenerRolesDeUsuario, actualizarRolesDeUsuario } from '../../services/rolesService';
import { useMessage } from '../../hooks/useMessage';

const UserPermissions = () => {
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Administrar Permisos de Usuario</h1>
            <div className="flex gap-4">
                <div className="w-1/3">
                    <input
                        type="text"
                        placeholder="Buscar usuario por nombre o email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <button onClick={handleSearch} className="w-full mt-2 p-2 bg-blue-500 text-white rounded">Buscar</button>
                    <ul className="mt-4">
                        {users.map(user => (
                            <li key={user.id} onClick={() => handleSelectUser(user)} className="cursor-pointer p-2 hover:bg-gray-200">
                                {user.nombre}
                            </li>
                        ))}
                        {users.length === 0 &&
                            <li className="p-2"> {!hadSearch ? '' : 'No se encontraron usuarios'}</li>
                        }
                    </ul>
                </div>
                {selectedUser && (
                    <div className="w-2/3">
                        <h2 className="text-xl font-bold">Roles de {selectedUser.nombre}</h2>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {roles.map(rol => (
                                <div key={rol.id}>
                                    <input
                                        type="checkbox"
                                        id={`rol-${rol.id}`}
                                        checked={userRoles.includes(rol.id)}
                                        onChange={() => handleRoleChange(rol.id)}
                                    />
                                    <label htmlFor={`rol-${rol.id}`} className="ml-2">{rol.nombre}</label>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSaveChanges} className="mt-4 p-2 bg-green-500 text-white rounded">Guardar Cambios</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPermissions;
