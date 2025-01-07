import { useEffect, useState } from "react";
import { FaFilePdf, FaWindowMinimize } from "react-icons/fa"; // Importamos los íconos de react-icons
import BotonAccion from "../components/common/BotonAccion";
import { TbPinFilled, TbPinnedOff } from "react-icons/tb";
import { RiSpeakFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { getEstudiantesByTrabajoId, getUserPhoto } from "../services/usuarioService";
import axios from "axios";

const Calificar = () => {
    const location = useLocation();
    const trabajo = location.state.trabajo ?? null;
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedRubricaType, setSelectedRubricaType] = useState(null);
    const [isPdfVisible, setIsPdfVisible] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const [photos, setPhotos] = useState({}); // Estado para las fotos, { [id]: fotoBase64 }
    const [rubricas, setRubricas] = useState(null);
    const [tipoEvaluacion, setTipoEvaluacion] = useState([]);
    const [currentRubrica, setCurrentRubrica] = useState(null);
    const [calificacionesSeleccionadas, setCalificacionesSeleccionadas] = useState({});


    useEffect(() => {
        if (trabajo) {
            getEstudiantesByTrabajoId(trabajo.id, setEstudiantes);
        }
    }, [trabajo]);

    useEffect(() => {
        if (selectedRubricaType && rubricas) {
            const rubricaSeleccionada = rubricas[selectedRubricaType] ?? null;
            setCurrentRubrica(rubricaSeleccionada);
        }
    }, [selectedRubricaType, rubricas]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const photoPromises = estudiantes.map(async (student) => {
                const photo = await getUserPhoto(student.id_personal);
                return { id: student.id_personal, photo };
            });

            const photosArray = await Promise.all(photoPromises); // Espera todas las fotos
            const photosObject = photosArray.reduce((acc, { id, photo }) => {
                acc[id] = photo; // Crea un objeto con el id como clave y la foto como valor
                return acc;
            }, {});

            setPhotos(photosObject);
        };

        fetchPhotos();
    }, [estudiantes]);

    useEffect(() => {
        const fetchRubricas = async () => {
            try {
                const tiposResponse = await axios.get(
                    `http://localhost:3000/calificacion/tipo-evaluacion/${trabajo?.modalidad_id}`
                );
                const tiposEvaluacion = tiposResponse.data ?? [];
                setTipoEvaluacion(tiposEvaluacion);

                const rubricasPromises = tiposEvaluacion.map(async (tipo) => {
                    try {
                        const response = await axios.get("http://localhost:3000/calificacion/rubrica", {
                            params: {
                                id_tipo_evaluacion: tipo.tipo_evaluacion_id,
                                id_modalidad: trabajo?.modalidad_id,
                            },
                        });
                        console.log("Rubrica para", tipo.tipo_evaluacion_nombre, ":", response.data);
                        return {
                            tipo: tipo.tipo_evaluacion_nombre,
                            rubrica: response.data,
                        };
                    } catch (error) {
                        console.error(`Error fetching rubrica for ${tipo.tipo_evaluacion_nombre}:`, error);
                        return { tipo: tipo.tipo_evaluacion_nombre, rubrica: null };
                    }
                });

                const rubricasData = await Promise.all(rubricasPromises);
                const rubricasFormatted = rubricasData.reduce((acc, item) => {
                    if (item.rubrica) {
                        // Asegúrate de incluir el id de la rubrica junto con la rubrica misma
                        const { id } = item.rubrica.rubrica;  // Extraer el id de la rubrica
                        acc[item.tipo] = {
                            rubrica: item.rubrica,  // La información completa de la rubrica
                            rubrica_id: id          // El id de la rubrica
                        };
                    }
                    return acc;
                }, {});

                setRubricas(rubricasFormatted);
            } catch (error) {
                console.error("Error al obtener las rúbricas:", error);
            }
        };

        fetchRubricas();
    }, [trabajo]);

    const handleNivelChange = async (criterioIndex, nivelIndex) => {
        if (!currentRubrica.rubrica || !selectedStudent) {
            alert("Por favor, seleccione un estudiante y una rúbrica.");
            return;
        }

        const criterio = currentRubrica.rubrica.criterios[criterioIndex];
        const nivel = criterio.niveles[nivelIndex];

        // Asumimos que `trabajo_id` y `docente_id` se obtienen de algún lugar, por ejemplo:
        const trabajo_id = trabajo.id;
        const info = localStorage.getItem('userInfo');
        const parsedUser = JSON.parse(info);
        const docente_id = parsedUser.id;

        const calificacionData = {
            trabajo_id,               // ID del trabajo
            rubrica_id: currentRubrica.rubrica_id,
            rubrica_criterio_id: criterio.id,  // ID del criterio
            rubrica_nivel_id: nivel.id,        // ID del nivel
            docente_id,               // ID del docente
            estudiante_id: estudiantes[(selectedStudent - 1)].estudiante_id,  // ID del estudiante
            puntaje_obtenido: (nivel.porcentaje * criterio.puntaje_maximo),  // Convertir el porcentaje a puntaje obtenido
        };

        try {
            // Llamada al endpoint para guardar la calificación
            const response = await axios.post("http://localhost:3000/calificacion/rubrica-evaluacion", calificacionData);

            if (response.status !== 201) {
                throw new Error("Error al guardar la calificación.");
            }

            // Actualizar el estado de calificaciones seleccionadas
            setCalificacionesSeleccionadas((prev) => ({
                ...prev,
                [criterioIndex]: nivelIndex,
            }));

            alert("Calificación guardada exitosamente.");
        } catch (error) {
            console.error("Error al guardar la calificación:", error);
            alert("Ocurrió un error al guardar la calificación.");
        }
    };

    return (
        <div className="w-full overflow-hidden relative h-full">
            <div className="bg-white rounded-xl p-8 pr-14 mx-auto">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Calificación de Tesis</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {selectedStudent && (
                        <div className="lg:col-span-3 mt-6 lg:mt-0">
                            <div className="flex justify-center mb-4">
                                {tipoEvaluacion.map((tipo) => {
                                    const isSelected = selectedRubricaType === tipo.tipo_evaluacion_id;
                                    const Icon = tipo.tipo_evaluacion_nombre === "Defensa" ? RiSpeakFill : IoDocumentText;

                                    return (
                                        <button
                                            key={tipo.tipo_evaluacion_id}
                                            onClick={() => setSelectedRubricaType(tipo.tipo_evaluacion_nombre)}
                                            className={`px-6 py-2 font-semibold flex items-center ${isSelected
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                                } ${tipo.tipo_evaluacion_id === 1 ? "rounded-l-lg" : ""} ${tipo.tipo_evaluacion_id === tipoEvaluacion.length ? "rounded-r-lg" : ""
                                                }`}
                                        >
                                            {tipo.tipo_evaluacion_nombre}
                                            <Icon className="ml-2" />
                                        </button>
                                    );
                                })}
                            </div>

                            <h3 className="text-2xl font-semibold mb-6 text-blue-600">
                                Rúbrica de Calificación - {selectedRubricaType === "oral" ? "Parte Oral" : "Parte Escrita"}
                            </h3>
                            <div className="overflow-x-auto">
                                {/* Validaciones para evitar errores */}
                                {currentRubrica ? (
                                    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                        <thead className="bg-blue-50 text-blue-700">
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-3 text-left">Criterio</th>
                                                {currentRubrica.rubrica.criterios[0]?.niveles.map((nivel, index) => (
                                                    <th
                                                        key={index}
                                                        className="border border-gray-300 px-4 py-3 text-center font-semibold"
                                                    >
                                                        {nivel.nombre}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRubrica.rubrica.criterios.map((criterio, criterioIndex) => (
                                                <tr
                                                    key={criterioIndex}
                                                    className="odd:bg-white even:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-4 py-3 font-medium">
                                                        {criterio.nombre}
                                                    </td>
                                                    {criterio.niveles.map((nivel, nivelIndex) => {
                                                        const isSelected = calificacionesSeleccionadas[criterioIndex] === nivelIndex;

                                                        return (
                                                            <td
                                                                key={nivelIndex}
                                                                className={`border border-gray-300 px-4 py-3 text-center cursor-pointer transition-colors duration-200 ${isSelected ? "bg-green-200 text-white" : "hover:bg-green-50"}`}
                                                                onClick={() => handleNivelChange(criterioIndex, nivelIndex)}
                                                            >
                                                                <p className="text-sm font-semibold text-blue-700">{nivel.porcentaje * 100}%</p>
                                                                <p className="text-xs text-gray-500">{nivel.descripcion}</p>
                                                            </td>
                                                        );
                                                    })}

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Seleccione una rúbrica para visualizarla.</p>
                                )}

                            </div>
                        </div>
                    )}
                    <div className="col-span-1 lg:col-span-1 lg:col-start-4">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Estudiantes</h2>
                        <div className="space-y-4">
                            {estudiantes.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 ${selectedStudent === student.id
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-800 hover:bg-blue-200"
                                        }`}
                                >
                                    <img
                                        src={
                                            photos[student.id_personal]
                                                ? `data:image/jpeg;base64,${photos[student.id_personal]}`
                                                : 'https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg' // Foto por defecto si no está cargada
                                        }
                                        alt={`Foto de ${student.nombre}`}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                    />
                                    <span className="text-left font-medium">{student.nombre}</span>
                                </button>
                            ))}
                            <button
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 bg-red-600 hover:bg-red-700 text-white`}
                                onClick={() => setIsPdfVisible(true)}
                            >
                                <FaFilePdf className="w-12 h-12" />
                                <span className="text-left font-medium">Ver Documento</span>

                            </button>
                        </div>
                    </div>
                </div>

                {/* PDF viewer */}
                <div
                    className={`fixed top-0 right-0 z-50 h-full bg-white transition-transform transform ${isPdfVisible ? "translate-x-0" : "translate-x-full"} duration-500`}
                    style={{ width: "23%" }}
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
