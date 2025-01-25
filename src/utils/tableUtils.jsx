// Función auxiliar para verificar si una variable es un objeto simple
const isObject = (variable) => variable && typeof variable === 'object' && !Array.isArray(variable);

const renderTableRow = (row, isSimpleArray) => {
    if (isSimpleArray) {
        // Si es un array de valores simples, renderizamos una celda por cada valor
        return <td key={row} className="border border-gray-300 p-2">{row}</td>;
    }

    // Si es un array de objetos complejos, renderizamos una celda por cada valor del objeto
    return Object.values(row).map((cell, idx) => (
        <td key={idx} className="border border-gray-300 p-2">{cell}</td>
    ));
};

// Función para renderizar los encabezados de la tabla si es un array de objetos complejos
const renderTableHeaders = (data) => {
    if (Array.isArray(data) && data.length > 0 && isObject(data[0])) {
        return (
            <tr className="bg-gray-200">
                {Object.keys(data[0]).map((key) => (
                    <th key={key} className="border border-gray-300 p-2">{key}</th>
                ))}
            </tr>
        );
    }
    return null;
};

export { renderTableRow, renderTableHeaders , isObject };