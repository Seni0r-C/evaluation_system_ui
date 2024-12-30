import { useState } from "react";
import { useLocation } from "react-router-dom";
import { capitalizeWords } from "../utils/constants";

const Calificar = () => {
    const location = useLocation();
    const { trabajo } = location.state || {}; // Obtenemos el objeto trabajo desde el estado de navegación

    const [selectedStudent, setSelectedStudent] = useState(null);
    const students = [
        { id: 1, name: "Estudiante 1" },
        { id: 2, name: "Estudiante 2" },
    ];
    const rubrica = [
        { criterio: "Claridad en la presentación", maxPuntaje: 10 },
        { criterio: "Dominio del tema", maxPuntaje: 15 },
        { criterio: "Calidad del trabajo escrito", maxPuntaje: 20 },
    ];

    const [calificaciones, setCalificaciones] = useState(
        students.reduce((acc, student) => {
            acc[student.id] = rubrica.map(() => 0);
            return acc;
        }, {})
    );

    const handleCalificacionChange = (studentId, index, value) => {
        setCalificaciones((prev) => ({
            ...prev,
            [studentId]: prev[studentId].map((cal, idx) =>
                idx === index ? Number(value) : cal
            ),
        }));
    };

    if (!trabajo) {
        return <p className="text-center text-red-500">Error: No se encontró el trabajo.</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Calificación de Tesis</h1>
                <p className="text-gray-600 text-center mb-6">
                    Modalidad: {trabajo.modalidad} - Carrera: {capitalizeWords(trabajo.carrera)}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sección del documento */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Documento de Titulación</h2>
                        <div className="border-2 border-gray-300 rounded-md h-96 overflow-hidden bg-gray-50">
                            {trabajo.link_archivo ? (
                                <iframe
                                    src={`https://drive.google.com/file/d/${trabajo.link_archivo.split('/d/')[1].split('/')[0]}/preview`}
                                    className="w-full h-full"
                                ></iframe>
                            ) : (
                                <p className="text-gray-500 flex items-center justify-center h-full">
                                    No se pudo cargar el documento.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sección de selección de estudiante y evaluación */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Estudiantes</h2>
                        <div className="space-y-4">
                            {students.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student.id)}
                                    className={`block w-full text-left px-4 py-2 rounded-md ${selectedStudent === student.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {student.name}
                                </button>
                            ))}
                        </div>

                        {selectedStudent && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Rúbrica de Calificación</h3>
                                <form className="space-y-4">
                                    {rubrica.map((item, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {item.criterio} (Máx: {item.maxPuntaje})
                                            </label>
                                            <input
                                                type="number"
                                                max={item.maxPuntaje}
                                                min={0}
                                                value={calificaciones[selectedStudent][index]}
                                                onChange={(e) =>
                                                    handleCalificacionChange(selectedStudent, index, e.target.value)
                                                }
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    ))}
                                </form>
                                <div className="mt-4">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                        Guardar Calificación
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calificar;
