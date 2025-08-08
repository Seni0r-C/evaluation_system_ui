import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

const RubricaList = ({ rubricas, onDelete, onSelect }) => {
    // Agrupar las rúbricas por modalidad y tipo de evaluación
    const groupedRubricas = rubricas.reduce((acc, rubrica) => {
        const { modalidad_nombre, modalidad_id, tipo_evaluacion_id, tipo_evaluacion_nombre, rubrica_id, criterio_nombre, puntaje_maximo } = rubrica;

        if (!acc[modalidad_nombre]) {
            acc[modalidad_nombre] = {};
        }

        if (!acc[modalidad_nombre][tipo_evaluacion_nombre]) {
            acc[modalidad_nombre][tipo_evaluacion_nombre] = [];
        }

        acc[modalidad_nombre][tipo_evaluacion_nombre].push({
            rubrica_id,
            criterio_nombre,
            puntaje_maximo,
            tipo_evaluacion_id,
            modalidad_id

        });

        return acc;
    }, {});

    const [selectedRubrica, setSelectedRubrica] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalTriggerRef = useRef(null);

    const openModal = (rubrica) => {
        setSelectedRubrica(rubrica);
        setIsModalOpen(true);
        modalTriggerRef.current = document.activeElement;
    };

    // Manejar el cierre del modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRubrica(null);
        modalTriggerRef.current && modalTriggerRef.current.focus();
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th scope="col" className="px-4 py-2 border">ID</th>
                        <th scope="col" className="px-4 py-2 border">Modalidad</th>
                        <th scope="col" className="px-4 py-2 border">Tipo de Evaluación</th>
                        <th scope="col" className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedRubricas).map(modalidad => (
                        Object.keys(groupedRubricas[modalidad]).map(tipoEvaluacion => (
                            <tr key={`${modalidad}-${tipoEvaluacion}`}>
                                <td className="px-4 py-2 border">{groupedRubricas[modalidad][tipoEvaluacion][0].rubrica_id}</td>
                                <td className="px-4 py-2 border">{modalidad}</td>
                                <td className="px-4 py-2 border">{tipoEvaluacion}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => openModal(groupedRubricas[modalidad][tipoEvaluacion])}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        Ver Criterios
                                    </button>
                                    <button
                                        onClick={() => onSelect(groupedRubricas[modalidad][tipoEvaluacion])}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(groupedRubricas[modalidad][tipoEvaluacion][0].rubrica_id)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>

            {/* Modal para mostrar criterios */}
            {isModalOpen && selectedRubrica && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl">
                        <h3 id="modal-title" className="text-xl font-bold mb-4">Criterios</h3>
                        {selectedRubrica.every(criterio => criterio.criterio_nombre === null) ? (
                            <p className="mb-4">No hay criterios disponibles.</p>
                        ) : (
                            <ul className="mb-4" aria-live="polite">
                                {selectedRubrica.map((criterio, index) => (
                                    criterio.criterio_nombre !== null && (
                                        <li key={index} className="mb-2">
                                            <strong>{criterio.criterio_nombre}:</strong> {criterio.puntaje_maximo} puntos
                                        </li>
                                    )
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={closeModal}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            autoFocus
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

RubricaList.propTypes = {
    rubricas: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default RubricaList;
