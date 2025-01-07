/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa"; // Importamos los íconos de react-icons
import { RiSpeakFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { getEstudiantesByTrabajoId, getUserPhoto } from "../services/usuarioService";
import axios from "axios";
import { MdDoneOutline } from "react-icons/md";
import { API_URL } from "../utils/constants";

const Calificar = () => {
    const location = useLocation();
    const trabajo = location.state.trabajo ?? null;
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedRubricaType, setSelectedRubricaType] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [photos, setPhotos] = useState({}); // Estado para las fotos, { [id]: fotoBase64 }
    const [rubricas, setRubricas] = useState(null);
    const [tipoEvaluacion, setTipoEvaluacion] = useState([]);
    const [currentRubrica, setCurrentRubrica] = useState(null);
    const [calificacionesSeleccionadas, setCalificacionesSeleccionadas] = useState({});
    const [calificaciones, setCalificaciones] = useState({});
    const [showFinalizar, setShowFinalizar] = useState(false);

    useEffect(() => {
        setShowFinalizar(isCalificacionCompleta());
    }, [calificacionesSeleccionadas]);


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
                    `${API_URL}/calificacion/tipo-evaluacion/${trabajo?.modalidad_id}`
                );
                const tiposEvaluacion = tiposResponse.data ?? [];
                setTipoEvaluacion(tiposEvaluacion);

                const rubricasPromises = tiposEvaluacion.map(async (tipo) => {
                    try {
                        const response = await axios.get(API_URL + "/calificacion/rubrica", {
                            params: {
                                id_tipo_evaluacion: tipo.tipo_evaluacion_id,
                                id_modalidad: trabajo?.modalidad_id,
                            },
                        });
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

    useEffect(() => {
        // Aquí puedes cargar los datos guardados desde el backend para el estudiante y rúbrica seleccionados.
        // Si no hay datos, simplemente asegura que se inicialicen correctamente.
        setCalificacionesSeleccionadas((prev) => ({
            ...prev,
            [selectedStudent]: prev[selectedStudent] || {},
        }));
    }, [selectedStudent, selectedRubricaType]);

    const handleNivelChange = async (criterioIndex, nivelIndex) => {
        if (!currentRubrica.rubrica || !selectedStudent) {
            alert("Por favor, seleccione un estudiante y una rúbrica.");
            return;
        }

        const criterio = currentRubrica.rubrica.criterios[criterioIndex];
        const nivel = criterio.niveles[nivelIndex];

        const trabajo_id = trabajo.id;
        const info = localStorage.getItem('userInfo');
        const parsedUser = JSON.parse(info);
        const docente_id = parsedUser.id;

        const estudiante_id = estudiantes.find((student) => student.id === selectedStudent)?.estudiante_id;

        if (!estudiante_id) {
            alert("No se encontró el ID del estudiante seleccionado.");
            return;
        }

        const calificacionData = {
            trabajo_id,
            rubrica_id: currentRubrica.rubrica_id,
            rubrica_criterio_id: criterio.id,
            rubrica_nivel_id: nivel.id,
            docente_id,
            estudiante_id,
            puntaje_obtenido: nivel.porcentaje * criterio.puntaje_maximo,
        };

        try {
            // Verificar si ya existe una calificación para este estudiante, criterio y rúbrica
            const existingCalificacion = Object.values(calificaciones[estudiante_id]?.[currentRubrica.rubrica_id] || {}).find(
                (cal) => cal.rubrica_criterio_id === criterio.id
            );

            if (existingCalificacion) {
                // Si existe, actualizar
                const updateResponse = await axios.put(
                    `${API_URL}/calificacion/rubrica-evaluacion/${existingCalificacion.id}`,
                    calificacionData
                );

                if (updateResponse.status === 200) {
                    console.log("Calificación actualizada correctamente.");
                } else {
                    throw new Error("Error al actualizar la calificación.");
                }
            } else {
                // Si no existe, crear una nueva
                const createResponse = await axios.post(API_URL + "/calificacion/rubrica-evaluacion", calificacionData);

                if (createResponse.status === 201) {
                    console.log("Calificación creada correctamente.");
                    // Agregar al estado local
                    setCalificaciones((prev) => ({
                        ...prev,
                        [estudiante_id]: {
                            ...prev[estudiante_id],
                            [currentRubrica.rubrica_id]: {
                                ...(prev[estudiante_id]?.[currentRubrica.rubrica_id] || {}),
                                [criterio.id]: { id: createResponse.data.id, nivelIndex },
                            },
                        },
                    }));
                } else {
                    throw new Error("Error al crear la calificación.");
                }
            }

            // Actualizar el estado local de calificaciones seleccionadas
            setCalificacionesSeleccionadas((prev) => ({
                ...prev,
                [selectedStudent]: {
                    ...prev[selectedStudent],
                    [selectedRubricaType]: {
                        ...prev[selectedStudent]?.[selectedRubricaType],
                        [criterioIndex]: nivelIndex,
                    },
                },
            }));
        } catch (error) {
            console.error("Error al guardar o actualizar la calificación:", error);
            alert("Ocurrió un error al guardar o actualizar la calificación.");
        }
    };

    const isCalificacionCompleta = () => {
        if (selectedStudent === null)
            return false;

        return estudiantes.every((student) => {
            return tipoEvaluacion.every((tipo) => {
                const rubrica = rubricas[tipo.tipo_evaluacion_nombre];
                if (!rubrica) return false; // Verifica que la rúbrica exista

                return rubrica.rubrica.criterios.every((criterio, criterioIndex) => {
                    return (
                        calificacionesSeleccionadas[student.id]?.[tipo.tipo_evaluacion_nombre]?.[criterioIndex] !== undefined
                    );
                });
            });
        });
    };

    const handleFinalizar = async () => {
        try {
            // Lógica para finalizar la calificación (ejemplo: enviar al backend)
            alert("Calificaciones finalizadas y guardadas correctamente.");
        } catch (error) {
            console.error("Error al finalizar las calificaciones:", error);
            alert("Ocurrió un error al finalizar las calificaciones.");
        }
    };


    return (
        <div className="w-full overflow-hidden relative h-full">
            <div className="bg-white rounded-xl p-8 pr-14 mx-auto">
                <h1 className="text-2xl font-extrabold mb-6 text-center text-blue-700">Calificación de Titulación</h1>

                {showFinalizar && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleFinalizar}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 mb-10 text-xl flex gap-4 items-center hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            <MdDoneOutline />
                            Finalizar Calificación
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {selectedStudent && (
                        <div className="lg:col-span-3 mt-6 lg:mt-0">
                            <div className="flex justify-center mb-4">
                                {tipoEvaluacion.map((tipo) => {
                                    const isSelected = selectedRubricaType === tipo.tipo_evaluacion_nombre;
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
                                Rúbrica de Calificación - {selectedRubricaType}
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
                                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                                                    Nota Máxima
                                                </th>
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
                                                        const isSelected = calificacionesSeleccionadas[selectedStudent]?.[selectedRubricaType]?.[criterioIndex] === nivelIndex;

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
                                                    <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300" >
                                                        {criterio.puntaje_maximo}
                                                    </td>
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
                            <a
                                href={trabajo.link_archivo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 bg-red-500 hover:bg-red-600 text-white"
                            >
                                <FaFilePdf className="w-12 h-12" />
                                <span className="text-left font-medium">Ver Documento</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calificar;
