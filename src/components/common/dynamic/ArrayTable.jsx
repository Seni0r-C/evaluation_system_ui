import PropTypes from 'prop-types';
import { isObject, renderTableHeaders, renderTableRow } from '../../../utils/tableUtils';

// Componente principal de la tabla
const ArrayTable = ({ label, data }) => {
    // Verificamos que `data` sea un array
    const isArray = Array.isArray(data);
    const isSimpleArray = isArray && data.length > 0 && !isObject(data[0]);

    // Verificamos si hay datos disponibles
    const renderNoDataMessage = () => {
        const columnCount = isSimpleArray ? 1 : Object.keys(data[0]).length;
        return (
            <tr>
                <td colSpan={columnCount} className="p-2 text-center">
                    No hay datos.
                </td>
            </tr>
        );
    };

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">{label}</label>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    {renderTableHeaders(data)}
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index}>
                                {renderTableRow(row, isSimpleArray)}
                            </tr>
                        ))
                    ) : renderNoDataMessage()}
                </tbody>
            </table>
        </div>
    );
};

// Validación de las propiedades del componente
ArrayTable.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default ArrayTable;
