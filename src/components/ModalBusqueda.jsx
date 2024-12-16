import { useState, useEffect } from "react";

const ModalBusqueda = ({ tipo, isOpen, onClose, onSelect }) => {
    const [filtros, setFiltros] = useState({
        cedula: "",
        nombre: "",
    });
    const [resultados, setResultados] = useState([]);

    // Limpiar filtros y resultados al abrir el modal
    useEffect(() => {
        if (isOpen) {
            setFiltros({ cedula: "", nombre: "" });
            setResultados([]);
        }
    }, [isOpen]);

    const handleSearch = () => {
        // Simula una petición a la API basada en los filtros
        setTimeout(() => {
            let data = [];
            if (tipo === "estudiante") {
                data = [
                    { id: 1, cedula: "1351337603", name: "Juan Rodríguez" },
                    { id: 2, cedula: "1234567890", name: "Ana Mendoza" },
                ];
            } else if (tipo === "tutor") {
                data = [
                    { id: 1, cedula: "1351337603", name: "Roberto Alcívar" },
                    { id: 4, cedula: "1234567890", name: "Iván Quimiz" },
                ];
            } else if (tipo === "cotutor") {
                data = [
                    { id: 1, cedula: "1351337603", name: "Marcelo Villamar" },
                    { id: 4, cedula: "1234567890", name: "Humberto Castro Salazar" },
                ];
            } else if (tipo === "tribunal") {
                data = [
                    { id: 1, cedula: "1351337603", name: "Marco Antonio Soliz" },
                    { id: 4, cedula: "1234567890", name: "Benavides María Sandoval" },
                ];
            }

            // Filtrar resultados según los criterios ingresados
            const resultadosFiltrados = data.filter((item) => {
                return (
                    (!filtros.cedula || item.cedula.includes(filtros.cedula)) &&
                    (!filtros.nombre || item.name.toLowerCase().includes(filtros.nombre.toLowerCase()))
                );
            });

            setResultados(resultadosFiltrados);
        }, 500);
    };

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-3/4 p-6 rounded shadow relative">
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Buscar {tipo}</h2>
                
                {/* Formulario de filtros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block font-medium mb-1">Cédula</label>
                        <input
                            type="text"
                            name="cedula"
                            value={filtros.cedula}
                            onChange={handleChange}
                            placeholder="Ingresar cédula"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={filtros.nombre}
                            onChange={handleChange}
                            placeholder="Ingresar nombre"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Buscar
                </button>

                {/* Resultados en tabla */}
                <div className="mt-4">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Cédula</th>
                                <th className="border border-gray-300 p-2">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.map((resultado) => (
                                <tr
                                    key={resultado.id}
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        onSelect(resultado);
                                        onClose();
                                    }}
                                >
                                    <td className="border border-gray-300 p-2">{resultado.cedula}</td>
                                    <td className="border border-gray-300 p-2">{resultado.name}</td>
                                </tr>
                            ))}
                            {resultados.length === 0 && (
                                <tr>
                                    <td colSpan="2" className="border border-gray-300 p-2 text-center">
                                        No se encontraron resultados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalBusqueda;
