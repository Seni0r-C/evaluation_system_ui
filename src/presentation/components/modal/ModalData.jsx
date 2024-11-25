import { useState } from "react";

const DynamicModal = ({ isOpen, onClose, data }) => {
    const [nestedData, setNestedData] = useState(null);

    if (!isOpen) return null;

    const renderField = (key, value) => {
        if (Array.isArray(value)) {
            return (
                <div key={key} className="mb-4">
                    <label className="block mb-2 font-medium">{key}</label>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                {Object.keys(value[0] || {}).map((col) => (
                                    <th key={col} className="border border-gray-300 p-2">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {value.length > 0 ? (
                                value.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((cell, idx) => (
                                            <td key={idx} className="border border-gray-300 p-2">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={Object.keys(value[0] || {}).length} className="p-2 text-center">
                                        No hay datos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        } else if (typeof value === "object" && value !== null) {
            return (
                <div key={key} className="mb-4">
                    <label className="block mb-2 font-medium">{key}</label>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setNestedData(value)}
                    >
                        Ver detalle
                    </button>
                </div>
            );
        } else {
            return (
                <div key={key} className="mb-4">
                    <label className="block mb-2 font-medium">{key}</label>
                    <input
                        type="text"
                        value={value || ""}
                        readOnly
                        className="w-full p-2 border rounded"
                    />
                </div>
            );
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center"
            style={{ zIndex: 9999 }}
        >
            <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Botón "Cerrar" en la esquina superior derecha */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Detalles del Trabajo</h2>
                <div className="space-y-4">
                    {nestedData
                        ? Object.entries(nestedData).map(([key, value]) => renderField(key, value))
                        : Object.entries(data).map(([key, value]) => renderField(key, value))}
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    {nestedData && (
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => setNestedData(null)}
                        >
                            Volver
                        </button>
                    )}
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicModal;
