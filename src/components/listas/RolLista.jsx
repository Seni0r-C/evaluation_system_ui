import PropTypes from 'prop-types';

const RolLista = ({ roles, onDelete, onSelect }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles && roles.map((rol) => (
                        <tr key={rol.id}>
                            <td className="px-4 py-2 border">{rol.id}</td>
                            <td className="px-4 py-2 border">{rol.nombre}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => onSelect(rol)}
                                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(rol.id)}
                                    className="bg-red-500 text-white px-2 py-1"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

RolLista.propTypes = {
    roles: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default RolLista;
