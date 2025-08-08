/**
 * Renderiza una fila de la tabla.
 * Si el array es de valores simples, renderiza una celda por cada valor.
 * Si el array es de objetos complejos, renderiza una celda por cada valor del objeto.
 * @param {array} row - El array que se va a renderizar.
 * @param {boolean} isSimpleArray - Indica si el array es de valores simples o de objetos complejos.
 * @returns {ReactElement} - Un ReactElement que representa una fila de la tabla.
 */
const renderTableRow = (row, isSimpleArray) => {
    if (isSimpleArray) {
        return <td key={row} className="border border-gray-300 p-2">{row}</td>;
    }

    return Object.values(row).map((cell, idx) => (
        <td key={idx} className="border border-gray-300 p-2">{cell}</td>
    ));
};


/**
 * Renderiza la fila de títulos de la tabla.
 * Si el array es de objetos complejos, renderiza una celda por cada clave del objeto.
 * @param {array} data - El array que se va a renderizar.
 * @returns {ReactElement} - Un ReactElement que representa la fila de títulos de la tabla.
 */
const renderTableHeaders = (data) => {
    if (Array.isArray(data) && data.length > 0 && isObject(data[0])) {
        return (
            <tr className="bg-gray-200">
                {Object.keys(data[0]).map((key) => (
                    <th key={key} scope="col" className="border border-gray-300 p-2">{key}</th>
                ))}
            </tr>
        );
    }
    return null;
};

/**
 * Verifica si una variable es un objeto no nulo y no es un array.
 * @param {*} variable - La variable a verificar.
 * @returns {boolean} - True si es un objeto, false en caso contrario.
 */
const isObject = (variable) => variable && typeof variable === 'object' && !Array.isArray(variable);

export { renderTableRow, renderTableHeaders, isObject };