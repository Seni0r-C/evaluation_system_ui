// Import React and Tailwind CSS
import { useState, useEffect } from "react";

const AdminCarrerasModalidades = () => {
    const [carreras, setCarreras] = useState([]); // List of carreras
    const [modalidades, setModalidades] = useState([]); // List of modalidades
    const [carreraModalidades, setCarreraModalidades] = useState([]); // Associations

    const [selectedCarrera, setSelectedCarrera] = useState("");
    const [selectedModalidad, setSelectedModalidad] = useState("");

    const [newCarrera, setNewCarrera] = useState("");
    const [newModalidad, setNewModalidad] = useState("");

    // Mock data fetching (replace with API calls)
    useEffect(() => {
        // Replace with real API calls
        setCarreras([
            { id: 1, nombre: "Ingeniería de Software" },
            { id: 2, nombre: "Ingeniería Civil" },
        ]);
        setModalidades([
            { id: 1, nombre: "Tesis" },
            { id: 2, nombre: "Proyecto Final" },
        ]);
        setCarreraModalidades([
            { id: 1, id_carrera: 1, id_modalidad: 1 },
            { id: 2, id_carrera: 1, id_modalidad: 2 },
        ]);
    }, []);

    const handleAddAssociation = () => {
        if (selectedCarrera && selectedModalidad) {
            setCarreraModalidades([
                ...carreraModalidades,
                {
                    id: carreraModalidades.length + 1,
                    id_carrera: parseInt(selectedCarrera),
                    id_modalidad: parseInt(selectedModalidad),
                },
            ]);
            setSelectedCarrera("");
            setSelectedModalidad("");
        }
    };

    const handleRemoveAssociation = (id) => {
        setCarreraModalidades(carreraModalidades.filter((item) => item.id !== id));
    };

    const handleAddCarrera = () => {
        if (newCarrera.trim() !== "") {
            setCarreras([...carreras, { id: carreras.length + 1, nombre: newCarrera }]);
            setNewCarrera("");
        }
    };

    const handleAddModalidad = () => {
        if (newModalidad.trim() !== "") {
            setModalidades([...modalidades, { id: modalidades.length + 1, nombre: newModalidad }]);
            setNewModalidad("");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Administrar Modalidades de Titulación por Carrera</h1>

            {/* Form to Add Association */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Modalidad a Carrera</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Selecciona Carrera</label>
                        <select
                            value={selectedCarrera}
                            onChange={(e) => setSelectedCarrera(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {carreras.map((carrera) => (
                                <option key={carrera.id} value={carrera.id}>
                                    {carrera.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Selecciona Modalidad</label>
                        <select
                            value={selectedModalidad}
                            onChange={(e) => setSelectedModalidad(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {modalidades.map((modalidad) => (
                                <option key={modalidad.id} value={modalidad.id}>
                                    {modalidad.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleAddAssociation}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Agregar
                </button>
            </div>

            {/* List of Associations */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Modalidades por Carrera</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Carrera</th>
                            <th className="border border-gray-300 p-2">Modalidad</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carreraModalidades.map((assoc) => {
                            const carrera = carreras.find((c) => c.id === assoc.id_carrera);
                            const modalidad = modalidades.find((m) => m.id === assoc.id_modalidad);
                            return (
                                <tr key={assoc.id}>
                                    <td className="border border-gray-300 p-2">{carrera?.nombre}</td>
                                    <td className="border border-gray-300 p-2">{modalidad?.nombre}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            onClick={() => handleRemoveAssociation(assoc.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Add Carrera */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Carrera</h2>
                <input
                    type="text"
                    value={newCarrera}
                    onChange={(e) => setNewCarrera(e.target.value)}
                    placeholder="Nombre de la carrera"
                    className="w-full p-2 border rounded mb-4"
                />
                <button
                    onClick={handleAddCarrera}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Agregar Carrera
                </button>
            </div>

            {/* Add Modalidad */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Modalidad</h2>
                <input
                    type="text"
                    value={newModalidad}
                    onChange={(e) => setNewModalidad(e.target.value)}
                    placeholder="Nombre de la modalidad"
                    className="w-full p-2 border rounded mb-4"
                />
                <button
                    onClick={handleAddModalidad}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Agregar Modalidad
                </button>
            </div>
        </div>
    );
};

export default AdminCarrerasModalidades;
