const isObject = (variable) => variable && typeof variable === 'object' && !Array.isArray(variable);

const ArrayTable = ({ label, data }) => {
    // Verificamos si los datos son un array
    const isArray = Array.isArray(data);
    // Verificamos si los elementos en el array son objetos simples (no array, no funciones, etc.)
    const isSimpleArray = isArray && data.length > 0 && !isObject(data[0]);

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">{label}</label>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    {/* Si es un array de objetos complejos, mostramos los encabezados */}
                    {!isSimpleArray && isArray && data.length > 0 && (
                        <tr className="bg-gray-200">
                            {Object.keys(data[0]).map((col) => (
                                <th key={col} className="border border-gray-300 p-2">{col}</th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index}>
                                {isSimpleArray ? (
                                    // Si es un array de valores simples (como strings o números), mostramos solo los valores
                                    <td className="border border-gray-300 p-2">{row}</td>
                                ) : (
                                    // Si es un array de objetos complejos, mostramos los valores del objeto
                                    Object.values(row).map((cell, idx) => (
                                        <td key={idx} className="border border-gray-300 p-2">{cell}</td>
                                    ))
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={isSimpleArray ? 1 : Object.keys(data[0]).length} className="p-2 text-center">
                                No hay datos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ArrayTable;
