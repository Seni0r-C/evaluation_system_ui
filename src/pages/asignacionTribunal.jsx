import { useState, useEffect } from "react";

const ModalAsignarTribunal = ({ isOpen, onClose, onAssign, trabajo }) => {
    const [filtros, setFiltros] = useState({
        cedula: "",
        nombre: "",
    });
    const [resultados, setResultados] = useState([]);
    const [tribunal, setTribunal] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setFiltros({ cedula: "", nombre: "" });
            setResultados([]);
            setTribunal(trabajo?.tribunal || []);
        }
    }, [isOpen, trabajo]);

    const handleSearch = () => {
        setTimeout(() => {
            // Simulación de datos
            const data = [
                { id: 1, cedula: "1234567890", name: "Dr. Roberto Pérez" },
                { id: 2, cedula: "0958827178", name: "Ing. Ana López" },
                { id: 3, cedula: "1112223334", name: "Msc. Carlos Ramírez" },
            ];

            const resultadosFiltrados = data.filter((item) =>
                (!filtros.cedula || item.cedula.includes(filtros.cedula)) &&
                (!filtros.nombre || item.name.toLowerCase().includes(filtros.nombre.toLowerCase()))
            );

            setResultados(resultadosFiltrados);
        }, 500);
    };

    const handleAddToTribunal = (miembro) => {
        if (tribunal.some((t) => t.id === miembro.id)) {
            alert("Este miembro ya está en el tribunal.");
            return;
        }
        setTribunal((prevTribunal) => [...prevTribunal, miembro]);
    };

    const handleRemoveFromTribunal = (id) => {
        setTribunal((prevTribunal) => prevTribunal.filter((miembro) => miembro.id !== id));
    };

    const handleAccept = () => {
        if (tribunal.length === 0) {
            alert("Debe asignar al menos un miembro al tribunal.");
            return;
        }
        onAssign(tribunal);
        onClose();
    };

    return isOpen ? (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
            style={{ zIndex: 9999 }}
        >
            <div className="bg-white w-3/4 p-6 rounded shadow relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Asignar Tribunal</h2>

                {/* Formulario de filtros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block font-medium mb-1">Cédula</label>
                        <input
                            type="text"
                            name="cedula"
                            value={filtros.cedula}
                            onChange={(e) => setFiltros({ ...filtros, cedula: e.target.value })}
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
                            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
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

                {/* Resultados de búsqueda */}
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Resultados de Búsqueda</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Cédula</th>
                                <th className="border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.length > 0 ? (
                                resultados.map((resultado) => (
                                    <tr key={resultado.id}>
                                        <td className="border border-gray-300 p-2">{resultado.cedula}</td>
                                        <td className="border border-gray-300 p-2">{resultado.name}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <button
                                                onClick={() => handleAddToTribunal(resultado)}
                                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Agregar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-300 p-2 text-center">
                                        No hay resultados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tribunal actual */}
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Tribunal Asignado</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Cédula</th>
                                <th className="border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tribunal.length > 0 ? (
                                tribunal.map((miembro) => (
                                    <tr key={miembro.id}>
                                        <td className="border border-gray-300 p-2">{miembro.cedula}</td>
                                        <td className="border border-gray-300 p-2">{miembro.name}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <button
                                                onClick={() => handleRemoveFromTribunal(miembro.id)}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-300 p-2 text-center">
                                        No hay miembros asignados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalAsignarTribunal;
