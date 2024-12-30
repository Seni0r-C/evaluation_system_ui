import { useState } from "react";

const Calificar = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        { id: 1, name: "Estudiante 1", photo: "https://via.placeholder.com/100" },
        { id: 2, name: "Estudiante 2", photo: "https://via.placeholder.com/100" },
    ];

    const rubrica = [
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
    ];

    const [calificaciones, setCalificaciones] = useState(
        students.reduce((acc, student) => {
            acc[student.id] = rubrica.map(() => null);
            return acc;
        }, {})
    );

    const handleNivelChange = (studentId, criterioIndex, nivelIndex) => {
        setCalificaciones((prev) => ({
            ...prev,
            [studentId]: prev[studentId].map((cal, idx) =>
                idx === criterioIndex ? nivelIndex : cal
            ),
        }));
    };

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
                            <h3 className="text-2xl font-semibold mb-6 text-blue-600">Rúbrica de Calificación</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                    <thead className="bg-blue-50 text-blue-700">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-3 text-left">Criterio</th>
                                            {rubrica[0].niveles.map((_, index) => (
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
                                        {rubrica.map((item, criterioIndex) => (
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
                                                        className={`border border-gray-300 px-4 py-3 text-center cursor-pointer transition-colors duration-200 ${calificaciones[selectedStudent][criterioIndex] === nivelIndex
                                                            ? "bg-green-200"
                                                            : "hover:bg-green-100"
                                                            }`}
                                                        onClick={() =>
                                                            handleNivelChange(selectedStudent, criterioIndex, nivelIndex)
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
