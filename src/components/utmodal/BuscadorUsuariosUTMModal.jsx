import PropTypes from 'prop-types';
import GenericModal from '../modal/GenericModal';
import { buscarUsuariosUTM } from '../../services/usuarioService';

const BuscadorUsuariosUTMModal = ({
    isOpen,
    onClose,
    searchTerm,
    onSearch,
    users,
    onSelectUser,
    selectedUser,
    roles,
    carreras,
    selectedRol,
    setSelectedRol,
    selectedCarrera,
    setSelectedCarrera,
    onAddUser,
    setUsers
}) => {

    const handleBuscarClick = async () => {
        if (searchTerm.trim() !== '') {
            await buscarUsuariosUTM(searchTerm, setUsers);
        } else {
            setUsers([]);
        }
    };

    return (
        <GenericModal
            isOpen={isOpen}
            onClose={onClose}
            title="Buscar y Agregar Usuario desde UTM"
        >
            <div className="p-4">
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por cédula o nombre"
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleBuscarClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Buscar
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Resultados de la búsqueda</h3>
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {users.map(user => (
                                <li
                                    key={user.cedula}
                                    onClick={() => onSelectUser(user)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedUser?.cedula === user.cedula ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="font-medium">{user.nombre}</div>
                                    <div className="text-sm text-gray-500">Cédula: {user.cedula}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedUser && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Asignar Rol y Carrera</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="rol-select" className="block text-sm font-medium text-gray-700">Rol</label>
                                    <select
                                        id="rol-select"
                                        value={selectedRol}
                                        onChange={(e) => setSelectedRol(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map(rol => (
                                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="carrera-select" className="block text-sm font-medium text-gray-700">Carrera</label>
                                    <select
                                        id="carrera-select"
                                        value={selectedCarrera}
                                        onChange={(e) => setSelectedCarrera(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="">Seleccione una carrera</option>
                                        {carreras.map(carrera => (
                                            <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onAddUser}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        disabled={!selectedUser || !selectedRol || !selectedCarrera}
                    >
                        Agregar Usuario
                    </button>
                </div>
            </div>
        </GenericModal>
    );
};

BuscadorUsuariosUTMModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    onSelectUser: PropTypes.func.isRequired,
    selectedUser: PropTypes.object,
    roles: PropTypes.array.isRequired,
    carreras: PropTypes.array.isRequired,
    selectedRol: PropTypes.string.isRequired,
    setSelectedRol: PropTypes.func.isRequired,
    selectedCarrera: PropTypes.string.isRequired,
    setSelectedCarrera: PropTypes.func.isRequired,
    onAddUser: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
};

export default BuscadorUsuariosUTMModal;
