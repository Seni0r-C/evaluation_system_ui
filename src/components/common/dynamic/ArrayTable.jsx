const ArrayTable = ({ label, data }) => {
    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">{label}</label>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {Object.keys(data[0] || {}).map((col) => (
                            <th key={col} className="border border-gray-300 p-2">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((cell, idx) => (
                                    <td key={idx} className="border border-gray-300 p-2">{cell}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={Object.keys(data[0] || {}).length} className="p-2 text-center">
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
