import PropTypes from 'prop-types';

const TipoEvaluacionJerarquiaList = ({ jerarquias, onDelete, onSelect }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Hijo</th>
                        <th className="px-4 py-2 border">Padre</th>
                        <th className="px-4 py-2 border">Modalidad</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {jerarquias.map((jerarquia) => (
                        <tr key={jerarquia.id}>
                            <td className="px-4 py-2 border">{jerarquia.id}</td>
                            <td className="px-4 py-2 border">{jerarquia.nombre_hijo}</td>
                            <td className="px-4 py-2 border">{jerarquia.nombre_padre || 'Ninguno'}</td>
                            <td className="px-4 py-2 border">{jerarquia.modalidad}</td>
                            <td className="px-4 py-2 border">
                                <button onClick={() => onSelect(jerarquia)} className="bg-blue-500 text-white px-2 py-1 mr-2">Editar</button>
                                <button onClick={() => onDelete(jerarquia.id)} className="bg-red-500 text-white px-2 py-1">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TipoEvaluacionJerarquiaList.propTypes = {
    jerarquias: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default TipoEvaluacionJerarquiaList;