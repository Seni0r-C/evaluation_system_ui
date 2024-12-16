import { useState, useEffect } from "react";

const ModalCalificarRubrica = ({ isOpen, onClose, trabajo, integrantesTrabajo }) => {
    const [selectedIntegrante, setSelectedIntegrante] = useState(null); // Active student
    const [tipoRubrica, setTipoRubrica] = useState(""); // Selected rubric type
    const [rubricaItems, setRubricaItems] = useState([]); // Filtered rubric items
    const [calificaciones, setCalificaciones] = useState({}); // Track scores for each item
    const [resumenRubrica, setResumenRubrica] = useState({}); // Summary of rubric scores by type

    const initialItems = [
        { id: 2, tipo_evaluacion: "ESCRITO", item: "Los objetivos están en verbo infinitivo.", valor: 25 },
        { id: 3, tipo_evaluacion: "ESCRITO", item: "Se definen al menos 3 objetivos especificos.", valor: 40 },
        { id: 1, tipo_evaluacion: "DEFENZA", item: "Demuestra dominio del tema.", valor: 10 },
        { id: 4, tipo_evaluacion: "DEFENZA", item: "Contesta de forma proactiva a las preguntas.", valor: 30 },
    ];

    useEffect(() => {
        if (isOpen) {
            setSelectedIntegrante(integrantesTrabajo[0]?.id || null); // Set default student
            setTipoRubrica("");
            setRubricaItems([]);
            setCalificaciones({});
            setResumenRubrica({});
        }
    }, [isOpen, integrantesTrabajo]);

    useEffect(() => {
        if (selectedIntegrante !== null) {
            const estudiante = trabajo?.estudiante_trabajo?.find(
                (et) => et.id === selectedIntegrante
            );
            if (estudiante) {
                setResumenRubrica(
                    estudiante.calificacion.reduce((acc, cal) => {
                        acc[cal.tipo_rubrica] = cal.calificacion_tipo_rubrica;
                        return acc;
                    }, {})
                );
            } else {
                setResumenRubrica({});
            }
        }
    }, [selectedIntegrante, trabajo]);

    const handleIntegranteChange = (id) => {
        setSelectedIntegrante(id);
    };

    const handleTipoRubricaChange = (tipo) => {
        setTipoRubrica(tipo);
        const filteredItems = initialItems.filter((item) => item.tipo_evaluacion === tipo);
        setRubricaItems(filteredItems);

        const estudiante = trabajo?.estudiante_trabajo?.find(
            (et) => et.id === selectedIntegrante
        );
        const calificacionesPrevias = estudiante?.calificacion_detalle || {};

        const initialCalificaciones = {};
        filteredItems.forEach((item) => {
            initialCalificaciones[item.id] = calificacionesPrevias[item.id] || 0;
        });

        setCalificaciones(initialCalificaciones);

        const total = Object.values(initialCalificaciones).reduce((sum, valor) => sum + valor, 0);
        setResumenRubrica((prevResumen) => ({
            ...prevResumen,
            [tipo]: total,
        }));
    };

    const handleScoreChange = (itemId, value) => {
        const maxValue = rubricaItems.find((item) => item.id === itemId)?.valor || 0;
        const newScore = Math.min(Math.max(value, 0), maxValue);

        const updatedCalificaciones = {
            ...calificaciones,
            [itemId]: newScore,
        };

        setCalificaciones(updatedCalificaciones);

        const total = Object.values(updatedCalificaciones).reduce((sum, val) => sum + val, 0);
        setResumenRubrica((prevResumen) => ({
            ...prevResumen,
            [tipoRubrica]: total,
        }));
    };

    const handleAccept = () => {
        const updatedTrabajo = { ...trabajo };

        if (!updatedTrabajo.estudiante_trabajo) {
            updatedTrabajo.estudiante_trabajo = [];
        }

        const estudianteIndex = updatedTrabajo.estudiante_trabajo.findIndex(
            (et) => et.id === selectedIntegrante
        );

        const calificacionesByType = Object.keys(resumenRubrica).map((tipo) => ({
            tipo_rubrica: tipo,
            calificacion_tipo_rubrica: resumenRubrica[tipo],
        }));

        const calificacionDetalle = { ...calificaciones };

        if (estudianteIndex >= 0) {
            updatedTrabajo.estudiante_trabajo[estudianteIndex] = {
                ...updatedTrabajo.estudiante_trabajo[estudianteIndex],
                calificacion: calificacionesByType,
                calificacion_detalle: calificacionDetalle,
            };
        } else {
            updatedTrabajo.estudiante_trabajo.push({
                id: selectedIntegrante,
                calificacion: calificacionesByType,
                calificacion_detalle: calificacionDetalle,
            });
        }

        onClose(updatedTrabajo);
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        style={{ zIndex: 9999 }}        
        >
            <div className="bg-white w-3/4 p-6 rounded shadow relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
                <h2 className="text-xl font-semibold mb-4">Calificar Rúbrica</h2>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Seleccionar Estudiante</label>
                    <select
                        value={selectedIntegrante || ""}
                        onChange={(e) => handleIntegranteChange(parseInt(e.target.value, 10))}
                        className="w-full p-2 border rounded"
                    >
                        {Array.isArray(integrantesTrabajo) && integrantesTrabajo.length > 0 ? (
                            integrantesTrabajo.map((integrante) => (
                                <option key={integrante.id} value={integrante.id}>
                                    {integrante.name} ({integrante.cedula})
                                </option>
                            ))
                        ) : (
                            <option value="">No hay estudiantes disponibles</option>
                        )}
                    </select>
                </div>


                {/* Select Rubric Type */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Tipo de Rúbrica</label>
                    <select
                        value={tipoRubrica}
                        onChange={(e) => handleTipoRubricaChange(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Selecciona --</option>
                        <option value="DEFENZA">DEFENZA</option>
                        <option value="ESCRITO">ESCRITO</option>
                    </select>
                </div>

                {/* Rubric Items Table */}
                {rubricaItems.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Ítems de Rúbrica</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Descripción</th>
                                    <th className="border border-gray-300 p-2">Valor Máximo</th>
                                    <th className="border border-gray-300 p-2">Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rubricaItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border border-gray-300 p-2">{item.item}</td>
                                        <td className="border border-gray-300 p-2 text-center">{item.valor}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <input
                                                type="number"
                                                value={calificaciones[item.id] || ""}
                                                onChange={(e) => handleScoreChange(item.id, parseInt(e.target.value, 10))}
                                                className="w-full p-2 border rounded"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Summary */}
                <div className="mb-6">
                    <h3 className="font-semibold">Resumen</h3>
                    <ul>
                        {Object.keys(resumenRubrica).map((tipo) => (
                            <li key={tipo}>
                                <strong>{tipo}:</strong> {resumenRubrica[tipo]}
                            </li>
                        ))}
                    </ul>
                    <hr className="my-2" />
                    <p>
                        <strong>TOTAL:</strong>{" "}
                        {Object.values(resumenRubrica).reduce((sum, valor) => sum + valor, 0)}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancelar</button>
                    <button onClick={handleAccept} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Aceptar</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalCalificarRubrica;
