import PropTypes from 'prop-types';
import { useMessage } from '../../hooks/useMessage';

const PermisoLista = ({ permisos, onDelete, onSelect }) => {

    const { showMsg, showQuestion, showIfError } = useMessage();
    

    const handleOnDelete = (id) => {
        const confirm = async () => {
            showMsg({ typeMsg: "wait", message: "Eliminando permiso..." });
            await onDelete(id);
        };
        showQuestion("¿Seguro que desea eliminar este permiso?", confirm);        
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Permiso</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {permisos && permisos.map((permiso) => (
                        <tr key={permiso.id}>
                            <td className="px-4 py-2 border">{permiso.id}</td>
                            <td className="px-4 py-2 border">{permiso.nombre}</td>
                            <td className="px-4 py-2 border">{permiso.permiso}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => onSelect(permiso)}
                                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                                >
                                    Editar
                                </button>
                                <button                                
                                    onClick={() => handleOnDelete(permiso.id)}
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

PermisoLista.propTypes = {
    permisos: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default PermisoLista;
