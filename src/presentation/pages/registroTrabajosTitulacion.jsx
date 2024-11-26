import { useState, useEffect } from "react";
import ModalBusqueda from "../components/ModalBusqueda";
import DynamicModal from "../components/modal/ModalData";
import ModalAsignarTribunal from "../pages/asignacionTribunal";

const RegistroTrabajosTitulacion = () => {
    const [modalidades, setModalidades] = useState([]);
    const [newTrabajo, setNewTrabajo] = useState({
        titulo: "",
        modalidad: "",
        carrera: "",
        tutor: null,
        cotutor: null,
        integrantes: [],
        enlace: "",
    });
    const [proyectos, setProyectos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState({ tipo: "", abierto: false });
    const [selectedTrabajo, setSelectedTrabajo] = useState(null);
    const [isModalDataOpen, setIsModalDataOpen] = useState(false);
    const [isModalTribunalOpen, setIsModalTribunalOpen] = useState(false);

    const handleOpenModalTribunal = (trabajo) => {
        setSelectedTrabajo(trabajo);
        setIsModalTribunalOpen(true);
    };

    const handleCloseModalTribunal = () => {
        setIsModalTribunalOpen(false);
    };

    const handleAssignTribunal = (tribunal) => {
        setProyectos((prevProyectos) =>
            prevProyectos.map((proyecto) =>
                proyecto.id === selectedTrabajo.id ? { ...proyecto, tribunal } : proyecto
            )
        );
        alert("Tribunal asignado exitosamente.");
    };

    const handleOpenModal = (tipo) => {
        setIsModalOpen({ tipo, abierto: true });
    };

    const handleCloseModal = () => {
        setIsModalOpen({ tipo: "", abierto: false });
    };

    const handleOpenModalData = (trabajo) => {
        setSelectedTrabajo(trabajo);
        setIsModalDataOpen(true);
    };

    const handleCloseModalData = () => {
        setSelectedTrabajo(null);
        setIsModalDataOpen(false);
    };

    const handleSelect = (dato) => {
        if (isModalOpen.tipo === "tutor") {
            setNewTrabajo({ ...newTrabajo, tutor: dato });
        } else if (isModalOpen.tipo === "cotutor") {
            setNewTrabajo({ ...newTrabajo, cotutor: dato });
        } else if (isModalOpen.tipo === "estudiante") {
            const nuevoIntegrante = dato;
            const existe = newTrabajo.integrantes.some(
                (integrante) => integrante.id === nuevoIntegrante.id
            );

            if (existe) {
                alert("Este integrante ya ha sido añadido.");
                return;
            }

            setNewTrabajo((prevState) => ({
                ...prevState,
                integrantes: [...prevState.integrantes, nuevoIntegrante],
            }));
        }
    };

    const handleRemoveIntegrante = (id) => {
        setNewTrabajo((prevState) => ({
            ...prevState,
            integrantes: prevState.integrantes.filter(
                (integrante) => integrante.id !== id
            ),
        }));
    };

    const handleRegistrarTrabajo = () => {
        if (!newTrabajo.titulo || !newTrabajo.modalidad || !newTrabajo.enlace) {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }

        setProyectos([...proyectos, { ...newTrabajo, id: Date.now() }]);
        setNewTrabajo({
            titulo: "",
            modalidad: "",
            carrera: "",
            tutor: null,
            cotutor: null,
            integrantes: [],
            enlace: "",
        });
        alert("Trabajo registrado exitosamente.");
    };

    useEffect(() => {
        setTimeout(() => {
            setModalidades(["PROPUESTA TECNOLOGICA", "ARTICULO ACADEMICO"]);
        }, 500);
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Gestión de Trabajos de Titulación</h1>

            {/* Formulario */}
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
                        <label className="block mb-2 font-medium">Enlace</label>
                        <input
                            type="text"
                            value={newTrabajo.enlace}
                            onChange={(e) => setNewTrabajo({ ...newTrabajo, enlace: e.target.value })}
                            placeholder="Ej: https://drive.google.com/archivo"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block mb-2 font-medium">Tutor</label>
                        <input
                            type="text"
                            readOnly
                            value={newTrabajo.tutor?.name || ""}
                            placeholder="Seleccionar tutor"
                            className="w-full p-2 border rounded cursor-pointer"
                            onClick={() => handleOpenModal("tutor")}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Cotutor</label>
                        <input
                            type="text"
                            readOnly
                            value={newTrabajo.cotutor?.name || ""}
                            placeholder="Seleccionar cotutor"
                            className="w-full p-2 border rounded cursor-pointer"
                            onClick={() => handleOpenModal("cotutor")}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Integrantes</label>
                        <button
                            onClick={() => handleOpenModal("estudiante")}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Agregar integrante
                        </button>

                        {/* Tabla de integrantes */}
                        <table className="mt-4 w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Cédula</th>
                                    <th className="border border-gray-300 p-2">Nombre</th>
                                    <th className="border border-gray-300 p-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newTrabajo.integrantes.length > 0 ? (
                                    newTrabajo.integrantes.map((integrante) => (
                                        <tr key={integrante.id}>
                                            <td className="border border-gray-300 p-2">{integrante.cedula}</td>
                                            <td className="border border-gray-300 p-2">{integrante.name}</td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <button
                                                    onClick={() => handleRemoveIntegrante(integrante.id)}
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
                                            No hay integrantes añadidos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button
                    onClick={handleRegistrarTrabajo}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Registrar Trabajo
                </button>
            </div>

            {/* Tabla de proyectos registrados */}
            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Trabajos Registrados</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Título</th>
                            <th className="border border-gray-300 p-2">Modalidad</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.length > 0 ? (
                            proyectos.map((proyecto) => (
                                <tr key={proyecto.id}>
                                    <td className="border border-gray-300 p-2">{proyecto.titulo}</td>
                                    <td className="border border-gray-300 p-2">{proyecto.modalidad}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={() => handleOpenModalData(proyecto)}
                                        >
                                            Ver detalles
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-yellow-500 ml-2 text-white rounded hover:bg-yellow-600"
                                            onClick={() => handleOpenModalTribunal(proyecto)}
                                        >
                                            Asignar tribunal
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 p-2 text-center">
                                    No hay trabajos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Modal de detalles */}
            <DynamicModal
                isOpen={isModalDataOpen}
                onClose={handleCloseModalData}
                data={selectedTrabajo}
            />
            <ModalBusqueda
                tipo={isModalOpen.tipo}
                isOpen={isModalOpen.abierto}
                onClose={handleCloseModal}
                onSelect={handleSelect}
            />
            <ModalAsignarTribunal
                isOpen={isModalTribunalOpen}
                onClose={handleCloseModalTribunal}
                onAssign={handleAssignTribunal}
                trabajo={selectedTrabajo}
            />
        </div>
    );
};

export default RegistroTrabajosTitulacion;
