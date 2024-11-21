import { useState } from "react";
import ModalBusqueda from "../components/ModalBusqueda";

const RegistroTrabajosTitulacion = () => {
    const [newTrabajo, setNewTrabajo] = useState({
        titulo: "",
        modalidad: "",
        carrera: "",
        tutor: null,
        cotutor: null,
        integrantes: [],
    });

    const [isModalOpen, setIsModalOpen] = useState({ tipo: "", abierto: false });

    const handleOpenModal = (tipo) => {
        setIsModalOpen({ tipo, abierto: true });
    };

    const handleCloseModal = () => {
        setIsModalOpen({ tipo: "", abierto: false });
    };

    const handleSelect = (dato) => {
        if (isModalOpen.tipo === "tutor") {
            setNewTrabajo({ ...newTrabajo, tutor: dato });
        } else if (isModalOpen.tipo === "cotutor") {
            setNewTrabajo({ ...newTrabajo, cotutor: dato });
        } else if (isModalOpen.tipo === "estudiante") {
            setNewTrabajo({
                ...newTrabajo,
                integrantes: [...newTrabajo.integrantes, dato],
            });
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Gestión de Trabajos de Titulación</h1>
            
            {/* Formulario */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="text-xl font-semibold mb-4">Registrar Trabajo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Otros campos */}
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
                        <ul className="mt-2">
                            {newTrabajo.integrantes.map((integrante) => (
                                <li key={integrante.id} className="text-sm">
                                    {integrante.name} ({integrante.cedula})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <ModalBusqueda
                tipo={isModalOpen.tipo}
                isOpen={isModalOpen.abierto}
                onClose={handleCloseModal}
                onSelect={handleSelect}
            />
        </div>
    );
};

export default RegistroTrabajosTitulacion;
