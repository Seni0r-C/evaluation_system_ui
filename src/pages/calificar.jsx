import { useState } from "react";
import {  FaFilePdf, FaWindowMinimize } from "react-icons/fa"; // Importamos los íconos de react-icons
import BotonAccion from "../components/common/BotonAccion";
import { TbPinFilled, TbPinnedOff } from "react-icons/tb";
import { RiSpeakFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";

const Calificar = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedRubricaType, setSelectedRubricaType] = useState("oral");
    const [isPdfVisible, setIsPdfVisible] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

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
        <div className="w-full overflow-hidden relative h-full">
            <div className="bg-white rounded-xl p-8 pr-14 mx-auto">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Calificación de Tesis</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {selectedStudent && (
                        <div className="lg:col-span-3 mt-6 lg:mt-0">
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={() => setSelectedRubricaType("oral")}
                                    className={`px-6 py-2 rounded-l-lg font-semibold ${selectedRubricaType === "oral" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} flex justify-between items-center`}
                                >
                                    Defensa
                                    <RiSpeakFill className="ml-2" /> {/* Agregar un margen izquierdo al ícono */}
                                </button>
                                <button
                                    onClick={() => setSelectedRubricaType("escrita")}
                                    className={`px-6 py-2 rounded-r-lg font-semibold ${selectedRubricaType === "escrita" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} flex justify-between items-center`}
                                >
                                    Documento
                                    <IoDocumentText className="ml-2" /> {/* Agregar un margen izquierdo al ícono */}
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
                    <div className="col-span-1 lg:col-span-1 lg:col-start-4">
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
                </div>
                <div
                    className="fixed right-0 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-4xl text-black transition-all duration-300 ease-in-out hover:scale-110 hover:text-yellow-500"
                    onMouseEnter={() => setIsPdfVisible(true)}
                    onMouseLeave={() => !isPinned && setIsPdfVisible(false)}
                >
                    {/* Icono representativo de abrir PDF (usa el icono adecuado para representar el PDF) */}
                    {/* <FaFilePdf className="transition-all duration-300 ease-in-out" /> */}

                    {/* Óvalo detrás del icono con animación */}
                    <div className="absolute -left-4 top-1/2 transform z-10 -translate-y-1/2 w-32 h-16 bg-red-600 opacity-60 rounded-full scale-100 hover:scale-110 transition-transform duration-300 border-4 border-red-900"></div>

                    <FaFilePdf className="transition-all duration-300 ease-in-out z-50" />

                </div>

                {/* PDF viewer */}
                <div
                    className={`fixed top-0 right-0 z-50 h-full bg-white transition-transform transform ${isPdfVisible ? "translate-x-0" : "translate-x-full"} duration-500 w-2/5`}
                    // style={{ height: "calc(100vh - 70px)" }}
                    onMouseEnter={() => setIsPdfVisible(true)}
                    onMouseLeave={() => !isPinned && setIsPdfVisible(false)}

                >
                    <div className="relative h-full">
                        <BotonAccion
                            icono={isPinned ? TbPinnedOff :
                                TbPinFilled}
                            onClick={() => setIsPinned(!isPinned)}
                            className="absolute top-3 left-3"
                            tooltip="Anclar"
                            variant="primary"
                        />

                        <BotonAccion
                            icono={FaWindowMinimize}
                            onClick={() => setIsPdfVisible(false)}
                            className="absolute top-3 left-14 disabled:opacity-50 disabled:bg-slate-500"
                            disabled={!isPinned}
                            tooltip={"Minimizar"}
                            variant="secondary"
                        />
                        <iframe
                            src="https://drive.google.com/file/d/17O9N2Q9NRs6L-LgJnTYpD-sjzAqvyEfB/preview"
                            title="PDF Viewer"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calificar;
