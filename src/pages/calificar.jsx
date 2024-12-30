import { useState } from "react";

const Calificar = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedRubricaType, setSelectedRubricaType] = useState("oral");

    const students = [
        { id: 1, name: "Estudiante 1", photo: "https://via.placeholder.com/100" },
        { id: 2, name: "Estudiante 2", photo: "https://via.placeholder.com/100" },
    ];

    const rubricas = {
        oral: [
            {
                criterio: "Claridad en la Presentación",
                niveles: [
                    { descripcion: "Presenta ideas confusas y desorganizadas.", porcentaje: 25 },
                    { descripcion: "Presenta ideas parcialmente claras y ordenadas.", porcentaje: 50 },
                    { descripcion: "Presenta ideas claras, pero con algunos detalles faltantes.", porcentaje: 75 },
                    { descripcion: "Presenta ideas muy claras, bien estructuradas y organizadas.", porcentaje: 100 },
                ],
                maxPuntaje: 10,
            },
            {
                criterio: "Dominio del Tema",
                niveles: [
                    { descripcion: "Muestra un conocimiento muy limitado del tema.", porcentaje: 25 },
                    { descripcion: "Demuestra un conocimiento básico del tema.", porcentaje: 50 },
                    { descripcion: "Domina el tema con seguridad, aunque con pocos errores menores.", porcentaje: 75 },
                    { descripcion: "Domina el tema completamente y responde a todas las preguntas con precisión.", porcentaje: 100 },
                ],
                maxPuntaje: 15,
            },
        ],
        escrita: [
            {
                criterio: "Estructura del Documento",
                niveles: [
                    { descripcion: "Documento desorganizado y difícil de seguir.", porcentaje: 25 },
                    { descripcion: "Estructura parcialmente clara pero inconsistente.", porcentaje: 50 },
                    { descripcion: "Buena estructura, con pequeños problemas de organización.", porcentaje: 75 },
                    { descripcion: "Estructura excelente, coherente y lógica.", porcentaje: 100 },
                ],
                maxPuntaje: 20,
            },
            {
                criterio: "Gramática y Ortografía",
                niveles: [
                    { descripcion: "Errores frecuentes y graves en gramática y ortografía.", porcentaje: 25 },
                    { descripcion: "Algunos errores, pero no interfieren significativamente con la comprensión.", porcentaje: 50 },
                    { descripcion: "Pocos errores menores que no afectan la calidad general.", porcentaje: 75 },
                    { descripcion: "Excelente gramática y ortografía, sin errores notables.", porcentaje: 100 },
                ],
                maxPuntaje: 10,
            },
        ],
    };

    const [calificaciones, setCalificaciones] = useState(
        students.reduce((acc, student) => {
            acc[student.id] = {
                oral: rubricas.oral.map(() => null),
                escrita: rubricas.escrita.map(() => null),
            };
            return acc;
        }, {})
    );

    const handleNivelChange = (studentId, rubricaType, criterioIndex, nivelIndex) => {
        setCalificaciones((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [rubricaType]: prev[studentId][rubricaType].map((cal, idx) =>
                    idx === criterioIndex ? nivelIndex : cal
                ),
            },
        }));
    };

    const currentRubrica = rubricas[selectedRubricaType];

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Calificación de Tesis</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Estudiantes</h2>
                        <div className="space-y-4">
                            {students.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 ${selectedStudent === student.id
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-800 hover:bg-blue-200"
                                        }`}
                                >
                                    <img
                                        src={student.photo}
                                        alt={`Foto de ${student.name}`}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                    />
                                    <span className="text-left font-medium">{student.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedStudent && (
                        <div className="lg:col-span-2 mt-6 lg:mt-0">
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={() => setSelectedRubricaType("oral")}
                                    className={`px-6 py-2 rounded-l-lg font-semibold ${selectedRubricaType === "oral" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                                >
                                    Parte Oral
                                </button>
                                <button
                                    onClick={() => setSelectedRubricaType("escrita")}
                                    className={`px-6 py-2 rounded-r-lg font-semibold ${selectedRubricaType === "escrita" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                                >
                                    Parte Escrita
                                </button>
                            </div>

                            <h3 className="text-2xl font-semibold mb-6 text-blue-600">
                                Rúbrica de Calificación - {selectedRubricaType === "oral" ? "Parte Oral" : "Parte Escrita"}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                    <thead className="bg-blue-50 text-blue-700">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-3 text-left">Criterio</th>
                                            {currentRubrica[0].niveles.map((_, index) => (
                                                <th
                                                    key={index}
                                                    className="border border-gray-300 px-4 py-3 text-center font-semibold"
                                                >
                                                    Nivel {index + 1}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRubrica.map((item, criterioIndex) => (
                                            <tr
                                                key={criterioIndex}
                                                className="odd:bg-white even:bg-gray-50"
                                            >
                                                <td className="border border-gray-300 px-4 py-3 font-medium">
                                                    {item.criterio}
                                                </td>
                                                {item.niveles.map((nivel, nivelIndex) => (
                                                    <td
                                                        key={nivelIndex}
                                                        className={`border border-gray-300 px-4 py-3 text-center cursor-pointer transition-colors duration-200 ${calificaciones[selectedStudent][selectedRubricaType][criterioIndex] === nivelIndex
                                                            ? "bg-green-200"
                                                            : "hover:bg-green-100"
                                                            }`}
                                                        onClick={() =>
                                                            handleNivelChange(selectedStudent, selectedRubricaType, criterioIndex, nivelIndex)
                                                        }
                                                    >
                                                        <p className="text-sm font-semibold text-green-700">{nivel.porcentaje}%</p>
                                                        <p className="text-xs text-gray-500">{nivel.descripcion}</p>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calificar;
