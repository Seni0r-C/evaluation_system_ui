import { useState, useEffect } from "react";

const RegistroTrabajosTitulacion = () => {
    const [modalidades, setModalidades] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [docentesTutorado, setDocentesTutorado] = useState([]);
    const [docentesCotutorado, setDocentesCotutorado] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [trabajos, setTrabajos] = useState([]);

    const [newTrabajo, setNewTrabajo] = useState({
        titulo: "",
        modalidad: "",
        carrera: "",
        tutorId: null,
        cotutorId: null,
        integrantesIds: [],
        archivoLink: "",
    });

    // Simula la obtención de datos desde una API
    useEffect(() => {
        setTimeout(() => {
            setModalidades(["PROPUESTA TECNOLOGICA", "ARTICULO ACADEMICO"]);
            setCarreras([
                "INGENIERIA EN SISTEMAS DE INFORMACION",
                "INGENIERIA DE SOFTWARE",
                "TECNOLOGIAS DE LA INFORMACION Y COMUNICACION",
            ]);
            setDocentesTutorado([
                { id: 1, name: "ALCIVAR CEDEÑO ROBERTH ABEL" },
                { id: 4, name: "QUIMIZ CALCELO IVAN ALFONZO" },
            ]);
            setDocentesCotutorado([{ id: 3, name: "BARREIRO CEDEÑO BERNARDA LUCIA" }]);
            setEstudiantes([
                { id: 1, name: "RODRIGUEZ MALDONADO JUAN PECHICHO" },
                { id: 2, name: "MENDOZA CASTRO IGNACIO GUTEMBERG" },
            ]);
            setTrabajos([
                {
                    id: 1,
                    titulo: "ChatBot de atención a estudiantes de nivelación en la Universidad Técnica de Manabí.",
                    fechaRegistro: "2021-11-12",
                    modalidad: "PROPUESTA TECNOLOGICA",
                    carrera: "INGENIERIA EN SISTEMAS DE INFORMACION",
                    tutorId: 1,
                    integrantesIds: [1, 2],
                    archivoLink: "archivo-link.com",
                },
            ]);
        }, 500);
    }, []);

    const handleAddTrabajo = () => {
        if (
            newTrabajo.titulo.trim() &&
            newTrabajo.modalidad &&
            newTrabajo.carrera &&
            newTrabajo.tutorId &&
            newTrabajo.integrantesIds.length > 0
        ) {
            const newId = trabajos.length + 1;
            const updatedTrabajos = [
                ...trabajos,
                { ...newTrabajo, id: newId, fechaRegistro: new Date().toISOString().split("T")[0] },
            ];
            setTrabajos(updatedTrabajos);

            // Reinicia el formulario
            setNewTrabajo({
                titulo: "",
                modalidad: "",
                carrera: "",
                tutorId: null,
                cotutorId: null,
                integrantesIds: [],
                archivoLink: "",
            });
        }
    };

    const handleRemoveTrabajo = (id) => {
        setTrabajos(trabajos.filter((trabajo) => trabajo.id !== id));
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Gestión de Trabajos de Titulación</h1>

            {/* Formulario para agregar trabajo */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Registrar Trabajo de Titulación</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Título</label>
                        <input
                            type="text"
                            value={newTrabajo.titulo}
                            onChange={(e) => setNewTrabajo({ ...newTrabajo, titulo: e.target.value })}
                            placeholder="Ej: Sistema de gestión académica"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Modalidad</label>
                        <select
                            value={newTrabajo.modalidad}
                            onChange={(e) => setNewTrabajo({ ...newTrabajo, modalidad: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {modalidades.map((modalidad, index) => (
                                <option key={index} value={modalidad}>
                                    {modalidad}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Carrera</label>
                        <select
                            value={newTrabajo.carrera}
                            onChange={(e) => setNewTrabajo({ ...newTrabajo, carrera: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {carreras.map((carrera, index) => (
                                <option key={index} value={carrera}>
                                    {carrera}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Tutor</label>
                        <select
                            value={newTrabajo.tutorId || ""}
                            onChange={(e) => setNewTrabajo({ ...newTrabajo, tutorId: parseInt(e.target.value, 10) })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {docentesTutorado.map((docente) => (
                                <option key={docente.id} value={docente.id}>
                                    {docente.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Cotutor</label>
                        <select
                            value={newTrabajo.cotutorId || ""}
                            onChange={(e) => setNewTrabajo({ ...newTrabajo, cotutorId: parseInt(e.target.value, 10) })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Selecciona --</option>
                            {docentesCotutorado.map((docente) => (
                                <option key={docente.id} value={docente.id}>
                                    {docente.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Integrantes</label>
                        <select
                            multiple
                            value={newTrabajo.integrantesIds}
                            onChange={(e) => {
                                const selectedIds = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
                                setNewTrabajo({ ...newTrabajo, integrantesIds: selectedIds });
                            }}
                            className="w-full p-2 border rounded"
                        >
                            {estudiantes.map((estudiante) => (
                                <option key={estudiante.id} value={estudiante.id}>
                                    {estudiante.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleAddTrabajo}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Registrar Trabajo
                </button>
            </div>

            {/* Listado de trabajos */}
            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Trabajos Registrados</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Título</th>
                            <th className="border border-gray-300 p-2">Modalidad</th>
                            <th className="border border-gray-300 p-2">Carrera</th>
                            <th className="border border-gray-300 p-2">Tutor</th>
                            <th className="border border-gray-300 p-2">Integrantes</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trabajos.map((trabajo) => (
                            <tr key={trabajo.id}>
                                <td className="border border-gray-300 p-2">{trabajo.titulo}</td>
                                <td className="border border-gray-300 p-2">{trabajo.modalidad}</td>
                                <td className="border border-gray-300 p-2">{trabajo.carrera}</td>
                                <td className="border border-gray-300 p-2">
                                    {docentesTutorado.find((docente) => docente.id === trabajo.tutorId)?.name || "N/A"}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {trabajo.integrantesIds
                                        .map((id) => estudiantes.find((estudiante) => estudiante.id === id)?.name || "N/A")
                                        .join(", ")}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => handleRemoveTrabajo(trabajo.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistroTrabajosTitulacion;
