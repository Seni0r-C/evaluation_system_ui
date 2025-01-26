import PropTypes from 'prop-types';

const RubricaCriterioList = ({ rubricaCriterios, onDelete, onSelect }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Valor</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rubricaCriterios.map(criterio => (
                        <tr key={criterio.id}>
                            <td className="px-4 py-2 border">{criterio.id}</td>
                            <td className="px-4 py-2 border">{criterio.nombre}</td>
                            <td className="px-4 py-2 border">{criterio.valor}</td>
                            <td className="px-4 py-2 border">
                                <button onClick={() => onSelect(criterio)} className="bg-blue-500 text-white px-2 py-1 mr-2">Editar</button>
                                <button onClick={() => onDelete(criterio.id)} className="bg-red-500 text-white px-2 py-1">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

RubricaCriterioList.propTypes = {
    rubricaCriterios: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default RubricaCriterioList;
