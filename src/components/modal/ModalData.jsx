import { useState } from "react";
import PropTypes from "prop-types";
import GenericModal from "./GenericModal";
import { capitalizeWords } from "../../utils/constants";

const InfoTrabajoModal = ({ isOpen, onClose, data, title }) => {
    const [activeTab, setActiveTab] = useState("general");

    if (!isOpen) return null;

    return (
        <GenericModal isOpen={isOpen} onClose={onClose} title={title} className="p-6">
            <div>
                {/* Tab Buttons */}
                <div role="tablist" className="flex space-x-4 border-b pb-2 mb-4">
                    <button
                        id="tab-general"
                        role="tab"
                        aria-selected={activeTab === "general"}
                        aria-controls="panel-general"
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "general" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"}`}
                        onClick={() => setActiveTab("general")}
                    >
                        Información General
                    </button>
                    <button
                        id="tab-tutors"
                        role="tab"
                        aria-selected={activeTab === "tutors"}
                        aria-controls="panel-tutors"
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "tutors" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"}`}
                        onClick={() => setActiveTab("tutors")}
                    >
                        Tutor y Cotutor
                    </button>
                    <button
                        id="tab-students"
                        role="tab"
                        aria-selected={activeTab === "students"}
                        aria-controls="panel-students"
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "students" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"}`}
                        onClick={() => setActiveTab("students")}
                    >
                        Estudiantes
                    </button>
                    <button
                        id="tab-links"
                        role="tab"
                        aria-selected={activeTab === "links"}
                        aria-controls="panel-links"
                        className={`text-sm font-medium px-4 py-2 rounded-t-md border-b-2 ${activeTab === "links" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-600"}`}
                        onClick={() => setActiveTab("links")}
                    >
                        Enlaces
                    </button>
                </div>

                {/* Tab Content */}
                {data && (
                    <div>
                        <div id="panel-general" role="tabpanel" tabIndex="0" aria-labelledby="tab-general" hidden={activeTab !== "general"}>
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

                        <div id="panel-tutors" role="tabpanel" tabIndex="0" aria-labelledby="tab-tutors" hidden={activeTab !== "tutors"}>
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

                        <div id="panel-students" role="tabpanel" tabIndex="0" aria-labelledby="tab-students" hidden={activeTab !== "students"}>
                            <h3 className="text-lg font-semibold">Estudiantes</h3>
                            <ul className="text-sm text-gray-700 list-disc list-inside">
                                {data?.estudiantes.map((estudiante, index) => (
                                    <li key={index}>{estudiante}</li>
                                ))}
                            </ul>
                        </div>

                        <div id="panel-links" role="tabpanel" tabIndex="0" aria-labelledby="tab-links" hidden={activeTab !== "links"}>
                            <h3 className="text-lg font-semibold">Enlaces</h3>
                            <ul className="text-sm text-blue-500 space-y-1">
                                {data?.link_anteproyecto && (
                                    <li>
                                        <a href={data.link_anteproyecto} target="_blank" rel="noopener noreferrer">
                                            Ver Anteproyecto
                                        </a>
                                    </li>
                                )}
                                {data?.link_final && (
                                    <li>
                                        <a href={data.link_final} target="_blank" rel="noopener noreferrer">
                                            Ver Trabajo Final
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
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