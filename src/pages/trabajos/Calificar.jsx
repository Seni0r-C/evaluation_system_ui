/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa"; // Importamos los íconos de react-icons
import { useLocation, useNavigate } from 'react-router-dom';
import { getEstudiantesByTrabajoId, getUserPhoto } from "../../services/usuarioService";
import { MdDoneOutline } from "react-icons/md";
import axiosInstance from "../../services/axiosConfig";
import { obtenerTiposEvaluacionByModalidadList } from "../../services/rubricaCriterioService";
import { useMessage } from "../../hooks/useMessage";
import { getIndicesRevistasService } from "../../services/indiceRevistasService";

function customRound(num) {
    return (num % 1 >= 0.5) ? Math.ceil(num) : Math.floor(num);
}

const Calificar = () => {
    const { showMsg } = useMessage();
    const location = useLocation();
    const trabajo = location.state.trabajo ?? null;

    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // Alumno seleccionado para ver/calificar
    const [selectedStudents, setSelectedStudents] = useState([]); // Alumnos a los que se aplica la calificación
    const [photos, setPhotos] = useState({});

    const [rubricas, setRubricas] = useState(null);
    const [currentRubrica, setCurrentRubrica] = useState(null);
    const [selectedRubricaType, setSelectedRubricaType] = useState("");

    const [tipoEvaluacion, setTipoEvaluacion] = useState([]);

    const [calificacionesSeleccionadas, setCalificacionesSeleccionadas] = useState({});

    const [showFinalizar, setShowFinalizar] = useState(false);

    const navigate = useNavigate();

    // Maneja la selección de un estudiante para ver sus calificaciones
    const handleSelectedStudent = (studentId) => {
        setSelectedStudent(studentId);
    };

    // Sincroniza el estado de los estudiantes a calificar basado en la rúbrica y el estudiante seleccionado
    useEffect(() => {
        if (!selectedRubricaType) return;
        if (tipoEvaluacion.length === 0) return;

        if (tipoEvaluacion.find((tipo) => tipo.tipo_evaluacion_nombre === selectedRubricaType).calificacion_global === 1) {
            // Para calificación grupal, se seleccionan todos los estudiantes
            setSelectedStudents(estudiantes.map((student) => student.id));
        } else {
            // Para calificación individual, solo el estudiante seleccionado
            setSelectedStudents(selectedStudent ? [selectedStudent] : []);
        }
    }, [selectedStudent, selectedRubricaType, estudiantes]);


    useEffect(() => {
        setShowFinalizar(isCalificacionCompleta());
    }, [calificacionesSeleccionadas, estudiantes, tipoEvaluacion, rubricas]);

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
        if (estudiantes.length === 0) return;

        const fetchPhotos = async () => {
            const photoPromises = estudiantes.map(async (student) => {
                const photo = await getUserPhoto(student.id_personal);
                return { id: student.id_personal, photo };
            });

            const photosArray = await Promise.all(photoPromises);
            const photosObject = photosArray.reduce((acc, { id, photo }) => {
                acc[id] = photo;
                return acc;
            }, {});

            setPhotos(photosObject);
        };

        fetchPhotos();
        handleSelectedRubricaType();

        // Selecciona el primer estudiante por defecto si no hay ninguno seleccionado
        if (!selectedStudent) {
            setSelectedStudent(estudiantes[0].id);
        }
    }, [estudiantes]);

    const fetchRubricas = async () => {
        try {
            const tiposResponse = await obtenerTiposEvaluacionByModalidadList(trabajo?.modalidad_id);
            const tiposEvaluacion = tiposResponse.filter(tipo => tipo.pos_evaluation === 0).map((tipo) => {
                return {
                    tipo_evaluacion_id: tipo.id,
                    tipo_evaluacion_nombre: tipo.nombre,
                    calificacion_global: tipo.calificacion_global
                }
            });
            setTipoEvaluacion(tiposEvaluacion);
            handleSelectedRubricaType(tiposEvaluacion[0].tipo_evaluacion_nombre);

            const rubricasPromises = tiposEvaluacion.map(async (tipo) => {
                try {
                    const response = await axiosInstance.get("/calificacion/rubrica", {
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
                    const { id } = item.rubrica.rubrica;
                    acc[item.tipo] = {
                        rubrica: item.rubrica,
                        rubrica_id: id
                    };
                }
                return acc;
            }, {});

            setRubricas(rubricasFormatted);
        } catch (error) {
            console.error("Error al obtener las rúbricas:", error);
        }
    };

    const fetchRubricGrades = async () => {
        const indexaciones = await getIndicesRevistasService();
        if (indexaciones.typeMsg === 'error') {
            showMsg({ typeMsg: 'error', message: indexaciones.message });
            return;
        }

        const getGrades = async () => {
            const info = localStorage.getItem('userInfo');
            const user = JSON.parse(info);
            try {
                const response = await axiosInstance.get("/calificacion/rubrica-evaluacion-notas", {
                    params: {
                        trabajo_id: trabajo?.id,
                        docente_id: user?.id,
                    },
                });
                return response.data;
            } catch (error) {
                console.error(`Error fetching rubric grades:`, error.message);
                return {};
            }
        };

        const rubricGrades = await getGrades();
        // Inicializa el estado de calificaciones con los datos del backend
        setCalificacionesSeleccionadas(rubricGrades || {});
    };

    useEffect(() => {
        fetchRubricGrades();
        fetchRubricas();
    }, [trabajo]);

    const isCalificacionCompleta = () => {
        if (!rubricas || estudiantes.length === 0 || tipoEvaluacion.length === 0) {
            return false;
        }

        return estudiantes.every((student) => {
            return tipoEvaluacion.every((tipo) => {
                const rubrica = rubricas[tipo.tipo_evaluacion_nombre];
                if (!rubrica) return true; // Si no hay rúbrica para este tipo, se considera completo

                return rubrica.rubrica.criterios.every((_, criterioIndex) => {
                    const grade = calificacionesSeleccionadas[student.id]?.[tipo.tipo_evaluacion_nombre]?.[criterioIndex];
                    return grade !== undefined && grade !== null;
                });
            });
        });
    };

    const isStudentSelected = (studentId) => {
        // El resaltado visual se basa en el grupo de estudiantes a calificar
        return selectedStudents.includes(studentId);
    }

    const handleSelectedRubricaType = (tipo_evaluacion_nombre) => {
        if (tipo_evaluacion_nombre) {
            setSelectedRubricaType(tipo_evaluacion_nombre);
            return;
        }

        // Selecciona el primer tipo de evaluación por defecto
        if (tipoEvaluacion.length > 0) {
            const tiposOrdenados = [...tipoEvaluacion].sort((a, b) => b.tipo_evaluacion_nombre.localeCompare(a.tipo_evaluacion_nombre));
            setSelectedRubricaType(tiposOrdenados[0].tipo_evaluacion_nombre);
        } else {
            setSelectedRubricaType("");
        }
    };

    const handleFinalizar = async () => {
        const info = localStorage.getItem('userInfo');
        const user = JSON.parse(info);
        try {
            const payload = [];
            for (const studentId in calificacionesSeleccionadas) {
                for (const tipoEvaluacion in calificacionesSeleccionadas[studentId]) {
                    const rubrica = rubricas[tipoEvaluacion];
                    if (!rubrica) continue;

                    const rubricaId = rubrica.rubrica_id;
                    const criterios = rubrica.rubrica.criterios;

                    for (const [criterioIndex, puntajeObtenido] of Object.entries(calificacionesSeleccionadas[studentId][tipoEvaluacion])) {
                        const criterio = criterios[criterioIndex];
                        payload.push({
                            trabajo_id: trabajo.id,
                            rubrica_id: rubricaId,
                            rubrica_criterio_id: criterio.id,
                            docente_id: user.id,
                            estudiante_id: studentId,
                            puntaje_obtenido: puntajeObtenido,
                        });
                    }
                }
            }

            await axiosInstance.post(`/calificacion/rubrica-evaluacion`, { calificaciones: payload });
            showMsg({ typeMsg: 'success', message: 'Calificaciones finalizadas y guardadas correctamente.' });
            navigate("/calificacion-de-trabajo-titulacion");
        } catch (error) {
            console.error("Error al finalizar las calificaciones:", error);
            showMsg({ typeMsg: 'error', message: 'Error al finalizar las calificaciones.' });
        }
    };

    const handleCalificacion = (e, criterioIndex, criterio) => {
        let valor = 0;
        if (e) {
            valor = e.target?.value || e.value;
        }
        const value = Math.min(criterio.puntaje_maximo, Math.max(0, valor));

        // Aplica la calificación a los estudiantes correspondientes (uno o todos)
        selectedStudents.forEach((studentId) => {
            setCalificacionesSeleccionadas((prev) => ({
                ...prev,
                [studentId]: {
                    ...prev[studentId],
                    [selectedRubricaType]: {
                        ...prev[studentId]?.[selectedRubricaType],
                        [criterioIndex]: value,
                    },
                },
            }));
        });
    };

    const getSelectedStudent = () => {
        return selectedStudent;
    };

    const calificacionValue = (minimo, maximo, criterioIndex) => {
        // Muestra siempre la calificación del estudiante seleccionado (el que se está viendo)
        const value = calificacionesSeleccionadas[selectedStudent]?.[selectedRubricaType]?.[criterioIndex];
        return Math.max(minimo, value ?? 0);
    };

    const calculateMinScore = () => {
        return 0;
    };

    const calculateMaxScore = (criterio) => {
        return criterio.puntaje_maximo;
    };

    const getRubricaSummary = () => {
        const summary = {};
        if (!rubricas) return summary;

        estudiantes.forEach((student) => {
            let totalSum = 0;
            let totalCount = 0;

            tipoEvaluacion.forEach((tipo) => {
                const tipo_evaluacion_nombre = tipo.tipo_evaluacion_nombre;
                const rubrica = rubricas[tipo_evaluacion_nombre];
                if (!rubrica) return;

                const criterios = rubrica.rubrica.criterios;
                let sum = 0;
                let count = 0;

                criterios.forEach((_, criterioIndex) => {
                    const grade = calificacionesSeleccionadas[student.id]?.[tipo_evaluacion_nombre]?.[criterioIndex];
                    if (grade !== undefined && grade !== null) {
                        sum += Number(grade);
                        count++;
                    }
                });

                summary[student.id] = summary[student.id] || { nombre: student.nombre, evaluaciones: {} };
                summary[student.id].evaluaciones[tipo.tipo_evaluacion_nombre] = {
                    sum,
                    mean: count > 0 ? sum / count : 0,
                };
                totalSum += sum;
                totalCount += count;
            });

            if (totalCount > 0) {
                summary[student.id].totalMean = totalSum / totalCount;
            }
        });
        return summary;
    };

    const renderOverallGradeRow = (overallEvalType, overallGradeData, index) => {
        return (
            <tr className="bg-gray-100 font-bold" key={index}>
                <td className="py-2 text-sm font-bold text-gray-700 text-left border border-gray-300">
                    <span className="ml-5">{overallEvalType}</span>
                </td>
                <td className="text-sm font-semibold text-gray-700 text-center border border-gray-300">
                    100
                </td>
                <td className="px-2 text-lg text-blue-600  text-center border border-gray-300 bg-gray-50">
                    {overallGradeData.sum}
                </td>
            </tr>
        )
    }

    const calcOverallGrades = (studentData) => {
        const evals = Object.values(studentData.evaluaciones);
        if (evals.length === 0) return "N/A";

        const totalSum = evals.reduce((sum, evalData) => sum + evalData.sum, 0);

        // if (isArticuloAcademico()) {
        //     return totalSum;
        // }

        const totalPossible = evals.length * 100;
        if (totalPossible === 0) return "N/A";

        const percentGrade = customRound((totalSum / totalPossible) * 100);
        return isNaN(percentGrade) ? "N/A" : percentGrade;
    }

    const renderOverallGradeTable = (studentData, index) => {
        if (!studentData) return null;
        return (
            <table className="min-w-[75%] border border-gray-300 rounded-lg shadow-sm mb-4" key={index}>
                <thead className="bg-blue-50 text-blue-700">
                    <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left w-[300px] min-w-[300px] max-w-[300px] whitespace-nowrap">
                            {studentData.nombre}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-[100px]">
                            Base
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-[100px]">
                            Nota
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {Object.entries(studentData.evaluaciones).map(([evalType, evalData], index) => {
                        return renderOverallGradeRow(evalType, evalData, index);
                    })}
                    <tr className="bg-gray-100 font-bold">
                        <td className="py-2 text-sm font-bold text-blue-700 text-left border border-gray-300">
                            <span className="ml-5">TOTAL</span>
                        </td>
                        <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300">
                            100
                        </td>
                        <td className="text-lg text-blue-600 text-center border border-gray-300 bg-gray-50">
                            {calcOverallGrades(studentData)}
                        </td>
                    </tr>

                </tbody>
            </table>
        );
    }


    return (
        <div className="w-full overflow-hidden relative h-full">
            <div className="bg-white rounded-xl p-8 pr-14 mx-auto">
                <div>
                    <h1 className="text-xl font-bold mb-6 text-center text-gray-700">
                        <span className="block text-xl font-extrabold mb-3 text-center text-blue-700">
                            {trabajo.modalidad}
                        </span>

                        {trabajo.titulo}
                    </h1>

                </div>

                <span className="block border-b-2 mb-4 border-gray-500" />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    <div className="lg:col-span-3 mt-6 lg:mt-0">
                        {/* Panel superior de tipo de calificación */}
                        <div className="flex justify-center mb-4">
                            {tipoEvaluacion
                                .sort((a, b) => b.tipo_evaluacion_nombre.localeCompare(a.tipo_evaluacion_nombre))
                                .map((tipo, index) => {
                                    const isSelected = selectedRubricaType === tipo.tipo_evaluacion_nombre;

                                    return (
                                        <button
                                            key={tipo.tipo_evaluacion_id}
                                            onClick={() => handleSelectedRubricaType(tipo.tipo_evaluacion_nombre)}
                                            className={`px-6 py-2 font-semibold flex items-center ${isSelected
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                                } ${index === 0 ? "rounded-l-lg" : ""} ${index === tipoEvaluacion.length - 1 ? "rounded-r-lg" : ""
                                                }`}
                                        >
                                            {tipo.tipo_evaluacion_nombre}
                                        </button>
                                    );
                                })}
                        </div>
                        {/* Panel de criterios de rúbrica de calificación */}
                        {(
                            <div className="overflow-x-auto">
                                {/* Validaciones para evitar errores */}
                                {currentRubrica ? (
                                    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                        <thead className="bg-blue-50 text-blue-700">
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-3 text-left">Criterio</th>

                                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                                                    Nota Máxima
                                                </th>
                                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                                                    Calificación
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
                                                        {criterio.nombre.replace("::>", ': ')}
                                                    </td>

                                                    <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300" >
                                                        {criterio.puntaje_maximo}
                                                    </td>
                                                    <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300" >

                                                        {
                                                            <input
                                                                type="number"
                                                                className="w-full border border-gray-300 rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                max={calculateMaxScore(criterio)}
                                                                min={calculateMinScore(criterio)}
                                                                onKeyPress={(e) => {
                                                                    if (!/[0-9.]/.test(e.key)) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                placeholder={`${calculateMinScore(criterio)} - ${calculateMaxScore(criterio)}`}
                                                                value={calificacionValue(calculateMinScore(criterio), calculateMaxScore(criterio), criterioIndex) ?? calculateMinScore(criterio)}
                                                                onChange={(e) => handleCalificacion(e, criterioIndex, criterio)}
                                                            />
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                            {/* Fila de Totales */}
                                            <tr className="bg-gray-100 font-bold">
                                                <td className="py-2 text-sm font-bold text-blue-700 text-left border border-gray-300">
                                                    <span className="ml-5">TOTAL</span>
                                                </td>

                                                {/* <td className="border border-gray-300"></td> */}
                                                {/* Suma de puntajes máximos */}
                                                <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300">
                                                    {currentRubrica.rubrica.criterios.reduce(
                                                        (total, criterio) => Number(total) + Number(criterio.puntaje_maximo), 0
                                                    )}
                                                </td>

                                                <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300">
                                                    {currentRubrica.rubrica.criterios.reduce(
                                                        (total, criterio, index) =>
                                                            total +
                                                            (calificacionValue(
                                                                calculateMinScore(criterio),
                                                                calculateMaxScore(criterio),
                                                                index,
                                                                getSelectedStudent()
                                                            ) ?? calculateMinScore(criterio)),
                                                        0
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="justify-center lg:col-start-2 col-span-1 mt-20 mb-20">
                                        <div className="text-center text-2xl font-semibold text-blue-600">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600">
                                            </div>
                                            <span className="ml-2 text-blue-700">Cargando datos...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-span-1 lg:col-span-1 lg:col-start-4">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Estudiantes</h2>
                        <div className="space-y-4">
                            {estudiantes.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => handleSelectedStudent(student.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 ${isStudentSelected(student.id)
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
                                href={trabajo.link_final}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 bg-red-500 hover:bg-red-600 text-white"
                            >
                                <FaFilePdf className="w-12 h-12" />
                                <span className="text-left font-medium">Trabajo de titulación</span>
                            </a>
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
                        </div>
                    </div>
                </div>
                {/* Promedios y totales de evaluaciones */}
                <div className="overflow-x-auto mt-4">

                    {/* Promedios y totales de evaluaciones */}
                    <div className="overflow-x-auto">

                        {/* Validaciones para evitar errores */}
                        {
                            (currentRubrica ? (
                                Object.values(getRubricaSummary())
                                    .map((rubrica, index) => renderOverallGradeTable(rubrica, index))
                            ) : (
                                <div className="justify-center lg:col-start-2 col-span-1 mb-20">
                                    <div className="text-center text-2xl font-semibold text-blue-600">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600">
                                        </div>
                                        <span className="ml-2 text-blue-700">Cargando datos...</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calificar;