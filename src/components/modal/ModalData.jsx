import { useState } from "react";
import PropTypes from "prop-types";
import GenericModal from "./GenericModal";
import { capitalizeWords } from "../../utils/constants";

const InfoTrabajoModal = ({ isOpen, onClose, data, title }) => {
    const [activeTab, setActiveTab] = useState("general");

    if (!isOpen) return null;

    return (
        <GenericModal onClose={onClose} title={title} className="p-6">
            <div>
                {/* Tab Buttons */}
                <div className="flex space-x-4 border-b pb-2 mb-4">
                    <button
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "general" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"
                            }`}
                        onClick={() => setActiveTab("general")}
                    >
                        Información General
                    </button>
                    <button
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "tutors" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"
                            }`}
                        onClick={() => setActiveTab("tutors")}
                    >
                        Tutor y Cotutor
                    </button>
                    <button
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "students" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"
                            }`}
                        onClick={() => setActiveTab("students")}
                    >
                        Estudiantes
                    </button>
                    <button
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "links" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"
                            }`}
                        onClick={() => setActiveTab("links")}
                    >
                        Enlaces
                    </button>
                </div>

                {/* Tab Content */}
                {data && (

                    <div>
                        {activeTab === "general" && (
                            <div>
                                <h3 className="text-lg font-semibold">Información General</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>
                                        <strong>Carrera:</strong> {capitalizeWords(data?.carrera) || data?.carrera || "No asignada"}
                                    </li>
                                    <li>
                                        <strong>Modalidad:</strong> {data?.modalidad}
                                    </li>
                                    <li>
                                        <strong>Estado:</strong> {data?.estado_id === 2 ? "En Proceso" : "Finalizado"}
                                    </li>
                                    <li>
                                        <strong>Fecha de Defensa:</strong> {data?.fecha_defensa || "No definida"}
                                    </li>
                                    <li>
                                        <strong>Título:</strong> {data?.titulo}
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "tutors" && (
                            <div>
                                <h3 className="text-lg font-semibold">Tutor y Cotutor</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>
                                        <strong>Tutor:</strong> {data?.tutor}
                                    </li>
                                    <li>
                                        <strong>Cotutor:</strong> {data?.cotutor || "No asignado"}
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "students" && (
                            <div>
                                <h3 className="text-lg font-semibold">Estudiantes</h3>
                                <ul className="text-sm text-gray-700 list-disc list-inside">
                                    {data?.estudiantes.map((estudiante, index) => (
                                        <li key={index}>{estudiante}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === "links" && (
                            <div>
                                <h3 className="text-lg font-semibold">Enlaces</h3>
                                <ul className="text-sm text-blue-500 space-y-1">
                                    <li>
                                        <a href={data?.link_anteproyecto} target="_blank" rel="noopener noreferrer">
                                            Ver Anteproyecto
                                        </a>
                                    </li>
                                    <li>
                                        <a href={data?.link_final} target="_blank" rel="noopener noreferrer">
                                            Ver Trabajo Final
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
    
            </div>
        </GenericModal>
    );
};

InfoTrabajoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object,
    title: PropTypes.string.isRequired,
};

export default InfoTrabajoModal;