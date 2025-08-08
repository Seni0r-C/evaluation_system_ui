import PropTypes from 'prop-types';
import { isObject, renderTableHeaders, renderTableRow } from '../../../utils/tableUtils';

/**
 * Componente para renderizar un array de datos en una tabla.
 * La tabla puede tener encabezados dinámicos o no, dependiendo de si los
 * objetos en el array tienen propiedades o no.
 * Si el array es vacío, se muestra un mensaje "No hay datos".
 * @param {string} label - Título del label que se muestra arriba de la tabla.
 * @param {array} data - Array de datos que se van a renderizar en la tabla.
 * @returns {ReactElement} - Un ReactElement que representa una tabla con los datos del array.
 */
const ArrayTable = ({ label, data }) => {
    const isArray = Array.isArray(data);
    const isSimpleArray = isArray && data.length > 0 && !isObject(data[0]);

    /**
     * Renderiza un mensaje de "No hay datos" para cuando el array es vacío.
     * El mensaje se muestra en una celda de una fila que ocupa el ancho de la tabla.
     * La cantidad de columnas se determina según el tipo de array:
     *   - Si es un array de objetos, se toma la cantidad de propiedades del primer objeto.
     *   - Si es un array de valores simples, se toma el valor 1.
     * @returns {ReactElement} - Un ReactElement que representa una celda con el mensaje.
     */
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
            <table className="w-full border-collapse border border-gray-300">
                <caption className="sr-only">{label}</caption>
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

ArrayTable.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default ArrayTable;