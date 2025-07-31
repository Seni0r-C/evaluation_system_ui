/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa"; // Importamos los íconos de react-icons
import { useLocation, useNavigate } from 'react-router-dom';
import { getEstudiantesByTrabajoId, getUserPhoto } from "../../services/usuarioService";
import { MdDoneOutline } from "react-icons/md";
import axiosInstance from "../../services/axiosConfig";
import { obtenerTiposEvaluacionByModalidadList } from "../../services/rubricaCriterioService";
import ComboBoxIndexacionRevistas from "../../components/utmcomps/ComboBoxIndexacionRevistas";
import { useMessage } from "../../hooks/useMessage";
import { getIndicesRevistasService } from "../../services/indiceRevistasService";

function customRound(num) {
    return (num % 1 >= 0.5) ? Math.ceil(num) : Math.floor(num);
}

const Calificar = () => {

    const { showMsg } = useMessage();
    const location = useLocation();
    const trabajo = location.state.trabajo ?? null;
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedRubricaType, setSelectedRubricaType] = useState("INFORME FINAL");
    const [estudiantes, setEstudiantes] = useState([]);
    const [photos, setPhotos] = useState({}); // Estado para las fotos, { [id]: fotoBase64 }
    const [rubricas, setRubricas] = useState(null);
    const [rubricGradesData, setRubricGradesData] = useState(null);
    const [tipoEvaluacion, setTipoEvaluacion] = useState([]);
    const [currentRubrica, setCurrentRubrica] = useState(null);
    const [calificacionesSeleccionadas, setCalificacionesSeleccionadas] = useState({});
    const [showFinalizar, setShowFinalizar] = useState(false);
    const [indexacionSelected, setIndexacionSelected] = useState(null);


    const navigate = useNavigate();

    const isArticuloAcademico = () => {
        const ARTICULO_ACADEMICO_KEYS = ["ARTICULO CIENTIFICO", "ARTICULO ACADEMICO", "ARTÍCULO ACADÉMICO", "ARTÍCULO CIENTÍFICO"];
        const modalidad = (trabajo.modalidad || "").toUpperCase();
        return ARTICULO_ACADEMICO_KEYS.some(moda => moda === modalidad);
    };

    const isComplexivo = () => {
        const EXAMEN_COMPLEXIVO_KEYS = ["EXAMEN COMPLEXIVO", "EXÁMEN COMPLEXIVO"];
        const modalidad = (trabajo.modalidad || "").toUpperCase();
        return EXAMEN_COMPLEXIVO_KEYS.some(moda => moda === modalidad);
    };


    const getInformeFinalKey = () => {
        return isComplexivo() ? "INFORME FINAL (EXAMEN PRACTICO)" : "INFORME FINAL";
    }


    const isInformeFinal = (kind) => {
        return kind === getInformeFinalKey();
    }

    const isExamenTeoricoComplexivo = (kind) => {
        return isComplexivo() && kind === "EXAMEN TEORICO";
    }

    const handleSelectedStudent = (studentId) => {
        if (isInformeFinal(selectedRubricaType)) {
            setSelectedStudents(estudiantes.map((student) => student.id));
            return;
        }
        // setSelectedStudents([]);
        setSelectedStudent(studentId);

    };


    const hadleStudentsOnChangeRubricType = () => {
        if (isInformeFinal(selectedRubricaType)) {
            setSelectedStudents(estudiantes.map((student) => student.id));
            return;
        }
        if (!selectedStudent) {
            setSelectedStudent(estudiantes[0].id);
        }
    }

    useEffect(() => {
        setShowFinalizar(isCalificacionCompleta());
    }, [calificacionesSeleccionadas, indexacionSelected]);

    useEffect(() => {
        if (trabajo) {
            getEstudiantesByTrabajoId(trabajo.id, setEstudiantes);
        }
    }, [trabajo]);

    useEffect(() => {
        if (selectedRubricaType && rubricas) {
            const rubricaSeleccionada = rubricas[selectedRubricaType] ?? null;
            setCurrentRubrica(rubricaSeleccionada);
            hadleStudentsOnChangeRubricType(rubricaSeleccionada);
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
        handleSelectedRubricaType(isArticuloAcademico() ? "DEFENSA" : getInformeFinalKey());
    }, [estudiantes]);

    const fetchRubricas = async () => {
        try {
            const tiposResponse = await obtenerTiposEvaluacionByModalidadList(trabajo?.modalidad_id);
            const tiposEvaluacion = tiposResponse.map((tipo) => {
                return {
                    tipo_evaluacion_id: tipo.id,
                    tipo_evaluacion_nombre: tipo.nombre
                }
            }).filter(tipo => !isExamenTeoricoComplexivo(tipo.tipo_evaluacion_nombre));
            setTipoEvaluacion(tiposEvaluacion);
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
        const rubricGrades = await getGrades()

        if (isArticuloAcademico() && rubricGrades) {
            const informeFinalGrades = Object.values(rubricGrades)[0][getInformeFinalKey()];
            const sumInformeFinal = Object.values(informeFinalGrades).reduce((prev, current) => prev + current, 0);
            const indexItem = indexaciones.find((indexItem) => indexItem.value === sumInformeFinal);
            if (indexItem) {
                setIndexacionSelected(indexItem);
            }
            // rubricGrades[]
        }
        console.log({ rubricGrades });
        setRubricGradesData(rubricGrades);
    };

    useEffect(() => {
        fetchRubricGrades();
        fetchRubricas();
    }, [trabajo]);

    const defaultGrade = (selectedStudentId) => {
        if (!selectedStudentId || !rubricGradesData) {
            return {};
        }
        return rubricGradesData[selectedStudentId];
    };

    const setGradesEffect = () => {
        // Aquí puedes cargar los datos guardados desde el backend para el estudiante y rúbrica seleccionados.
        // Si no hay datos, simplemente asegura que se inicialicen correctamente.
        if (selectedStudents.length === 0 && selectedRubricaType === getInformeFinalKey()) return;
        if (selectedRubricaType === getInformeFinalKey()) {
            selectedStudents
                .filter((v) => v || v === "null")
                .forEach((selectedStudent) => {
                    setCalificacionesSeleccionadas((prev) => ({
                        ...prev,
                        [selectedStudent]: prev[selectedStudent] || defaultGrade(selectedStudent),
                        // [selectedStudent]: defaultGrade(selectedStudent),
                    }));
                })
            return;
        }
        if (selectedStudent) {
            setCalificacionesSeleccionadas((prev) => ({
                ...prev,
                // [selectedStudent]: defaultGrade(selectedStudent),
                [selectedStudent]: prev[selectedStudent] || defaultGrade(selectedStudent),
            }));
        }
    }

    const setSaveGradesEffect = () => {
        // Aquí puedes cargar los datos guardados desde el backend para el estudiante y rúbrica seleccionados.
        // Si no hay datos, simplemente asegura que se inicialicen correctamente.
        if (selectedStudents.length === 0 && selectedRubricaType === getInformeFinalKey()) return;
        if (selectedRubricaType === getInformeFinalKey()) {
            selectedStudents
                .filter((v) => v || v === "null")
                .forEach((selectedStudent) => {
                    setCalificacionesSeleccionadas((prev) => ({
                        ...prev,
                        [selectedStudent]: defaultGrade(selectedStudent),
                    }));
                })
            return;
        }
        if (selectedStudent) {
            setCalificacionesSeleccionadas((prev) => ({
                ...prev,
                // [selectedStudent]: defaultGrade(selectedStudent),
                [selectedStudent]: defaultGrade(selectedStudent),
            }));
        }
    }

    useEffect(() => {
        if (!rubricas) return;
        setSaveGradesEffect();
    }, [trabajo, rubricas]);

    useEffect(() => {
        if (!rubricas) return;
        setGradesEffect();
    }, [trabajo, selectedStudent, selectedStudents, selectedRubricaType]);


    const isCalificacionCompleta = () => {
        if (selectedStudents.length === 0 && selectedRubricaType === getInformeFinalKey())
            return false;
        if (selectedStudent === null)
            return false;
        return estudiantes.every((student) => {
            return tipoEvaluacion.every((tipo) => {
                tipo = { ...tipo };
                tipo.tipo_evaluacion_nombree = tipo.tipo_evaluacion_nombre;
                tipo.tipo_evaluacion_nombre = tipo.tipo_evaluacion_nombre.replace("(EXAMEN PRACTICO)", "").replace("(EXÁMEN PRÁCTICO)", "").replace("(EXAMEN PRÁCTICO)", "").trim();

                const rubrica = rubricas[tipo.tipo_evaluacion_nombree];
                if (isArticuloAcademico() && !rubrica && tipo.tipo_evaluacion_nombree !== getInformeFinalKey()) return false;
                if (!isArticuloAcademico() && !rubrica) return false; // Verifica que la rúbrica exista

                const everySetGrades = rubrica.rubrica.criterios.every((criterio, criterioIndex) => {
                    const isSetGrade = calificacionesSeleccionadas[student.id]?.[tipo.tipo_evaluacion_nombre]?.[criterioIndex] !== undefined;
                    if (isArticuloAcademico() && !isSetGrade && tipo.tipo_evaluacion_nombre === getInformeFinalKey()) {
                        if (!indexacionSelected) {
                            return false;
                        }
                        handleCalificacionPorcentaje(indexacionSelected.value, getInformeFinalKey());
                        return true;
                    }
                    return isSetGrade;
                });

                return everySetGrades;
            });
        });
    };

    const isStudentSelected = (studentId) => {
        if (selectedRubricaType === getInformeFinalKey()) {
            return selectedStudents.includes(studentId)
        }
        return selectedStudent === studentId;
    }
    const handleSelectedRubricaType = (tipo_evaluacion_nombre) => {
        if (estudiantes.length === 0) return;
        if (isComplexivo()) {
            setSelectedStudent(estudiantes[0].id);
            setSelectedStudents(estudiantes.map((student) => student.id));
            setSelectedRubricaType(tipo_evaluacion_nombre);
            return;
        }
        if (tipo_evaluacion_nombre === getInformeFinalKey()) {
            setSelectedStudents(estudiantes.map((student) => student.id));
            setSelectedRubricaType(tipo_evaluacion_nombre);
            return;
        }
        if (!selectedStudent) {
            setSelectedStudent(estudiantes[0].id);
        }
        setSelectedRubricaType(tipo_evaluacion_nombre);
    };

    const handleFinalizar = async () => {
        if (isArticuloAcademico() && !indexacionSelected) {
            showMsg({ typeMsg: 'warning', message: 'Por favor seleccione una indexación' });
            return;
        }
        const info = localStorage.getItem('userInfo');
        const user = JSON.parse(info);
        try {
            // Preparar datos en un solo array para enviar al servidor
            const payload = [];
            for (const studentId in calificacionesSeleccionadas) {
                for (const tipoEvaluacion in calificacionesSeleccionadas[studentId]) {
                    // for (const tipoEvaluacionn in calificacionesSeleccionadas[studentId]) {
                    const tipoEvaluacionn = !isComplexivo() ? tipoEvaluacion : `${tipoEvaluacion} (EXAMEN PRACTICO)`;

                    const rubrica = rubricas[tipoEvaluacionn];

                    if (!rubrica) continue;

                    const rubricaId = rubrica.rubrica_id;
                    const criterios = rubrica.rubrica.criterios;

                    for (const [criterioIndex, puntajeObtenido] of Object.entries(calificacionesSeleccionadas[studentId][tipoEvaluacion])) {
                        const criterio = criterios[criterioIndex];

                        // Agregar cada calificación al array
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

            // Enviar el array completo al servidor
            await axiosInstance.post(`/calificacion/rubrica-evaluacion`, { calificaciones: payload });

            showMsg({ typeMsg: 'success', message: 'Calificaciones finalizadas y guardadas correctamente.' });
            navigate("/calificacion-de-trabajo-titulacion");
        } catch (error) {
            console.error("Error al finalizar las calificaciones:", error);
            showMsg({ typeMsg: 'error', message: 'Error al finalizar las calificaciones.' });
        }
    };

    const handleCalificacionPorcentaje = (percentage, rubricaType) => {
        if (!rubricaType || percentage < 0 || percentage > 100) {
            console.error("Invalid rubric type or percentage");
            return;
        }
        setCalificacionesSeleccionadas((prev) => {
            const updatedCalificaciones = { ...prev };

            estudiantes.forEach((student) => {
                const newCalificaciones = { ...updatedCalificaciones[student.id]?.[rubricaType] };

                // Apply the percentage to each criterion
                rubricas[rubricaType].rubrica.criterios.forEach((criterio, criterioIndex) => {
                    const calculatedGrade = Math.round((criterio.puntaje_maximo * percentage) / 100);
                    newCalificaciones[criterioIndex] = calculatedGrade;
                });

                updatedCalificaciones[student.id] = {
                    ...updatedCalificaciones[student.id],
                    [rubricaType]: newCalificaciones,
                };
            });

            return updatedCalificaciones;
        });
    };


    const handleCalificacion = (e, criterioIndex, criterio) => {
        let valor = 0
        if (e) {
            valor = e.target?.value || e.value;
        }
        const selectedRubricaTypeLocal = selectedRubricaType?.replace("(EXAMEN PRACTICO)", "")?.replace("(EXÁMEN PRÁCTICO)", "")?.replace("(EXAMEN PRÁCTICO)", "").trim();
        const value = Math.min(criterio.puntaje_maximo, Math.max(0, valor));
        if (selectedRubricaTypeLocal === getInformeFinalKey()) {
            selectedStudents.forEach((selectedStudent) => {
                setCalificacionesSeleccionadas((prev) => ({
                    ...prev,
                    [selectedStudent]: {
                        ...prev[selectedStudent],
                        [selectedRubricaTypeLocal]: {
                            ...prev[selectedStudent]?.[selectedRubricaTypeLocal],
                            [criterioIndex]: value,
                        },
                    },
                }));
            });
        } else {
            setCalificacionesSeleccionadas((prev) => ({
                ...prev,
                [selectedStudent]: {
                    ...prev[selectedStudent],
                    [selectedRubricaTypeLocal]: {
                        ...prev[selectedStudent]?.[selectedRubricaTypeLocal],
                        [criterioIndex]: value,
                    },
                },
            }));
        }
    };

    const getSelectedStudent = () => {
        return selectedRubricaType === getInformeFinalKey() ? selectedStudents[0] : selectedStudent
    };

    const calificacionValue = (minimo, maximo, criterioIndex) => {
        // tipo_evaluacion_nombre = tipo_evaluacion_nombre?.replace("(EXAMEN PRACTICO)", "")?.replace("(EXÁMEN PRÁCTICO)", "")?.replace("(EXAMEN PRÁCTICO)", "").trim();
        const sStudent = getSelectedStudent();
        const keyRType = selectedRubricaType?.replace("(EXAMEN PRACTICO)", "")?.replace("(EXÁMEN PRÁCTICO)", "")?.replace("(EXAMEN PRÁCTICO)", "").trim();
        // alert(JSON.stringify({ hola: "Hello", califica: calificacionesSeleccionadas[sStudent], selectedRubricaType}, null, 2));
        const value = calificacionesSeleccionadas[sStudent]?.[keyRType]?.[criterioIndex];
        return Math.max(minimo, value ?? 0);
        // return Math.max(minimo, minimo==0?Number(maximo)/(getIndexPercent()*Number(maximo)):value);
    };

    const calculateMinScore = () => {
        return 0;
    };

    const calculateMaxScore = (criterio) => {
        return criterio.puntaje_maximo;
    };

    const getRubricaSummary = () => {
        const summary = {};

        estudiantes.forEach((student) => {
            let totalSum = 0;
            let totalCount = 0;

            tipoEvaluacion.forEach((tipo) => {
                const tipo_evaluacion_nombre = tipo.tipo_evaluacion_nombre?.replace("(EXAMEN PRACTICO)", "")?.replace("(EXÁMEN PRÁCTICO)", "")?.replace("(EXAMEN PRÁCTICO)", "").trim();
                const rubrica = rubricas[tipo.tipo_evaluacion_nombre];
                if (!rubrica) return;

                const criterios = rubrica.rubrica.criterios;
                let sum = 0;
                let count = 0;

                criterios.forEach((_, criterioIndex) => {
                    const grade = calificacionesSeleccionadas[student.id]?.[tipo_evaluacion_nombre]?.[criterioIndex];
                    // const grade = calificacionesSeleccionadas[student.id]?.[tipo.tipo_evaluacion_nombre]?.[criterioIndex];
                    if (grade !== undefined) {
                        sum += grade;
                        count++;
                    }
                });

                summary[student.id] = summary[student.id] || { nombre: student.nombre, evaluaciones: {} };
                summary[student.id].evaluaciones[tipo.tipo_evaluacion_nombre] = {
                    sum,
                    mean: sum / count,
                };
                totalSum += sum;
                totalCount += count;
                // }
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
                    {
                        isComplexivo() && overallEvalType === "EXAMEN PRÁCTICO" ? 60 :
                            isComplexivo() && overallEvalType === "EXAMEN TEÓRICO" ? 40 :
                                isArticuloAcademico() && overallEvalType === "INFORME FINAL" ? `${indexacionSelected?.value}` :
                                    isArticuloAcademico() && overallEvalType === "DEFENSA" ? `${100 - indexacionSelected?.value}` :
                                        100
                    }
                </td>
                <td className="px-2 text-lg text-blue-600  text-center border border-gray-300 bg-gray-50">
                    {isArticuloAcademico() && isInformeFinal(overallEvalType) && (
                        indexacionSelected?.value ?? "N/A"
                    )}
                    {isArticuloAcademico() && !isInformeFinal(overallEvalType) && (
                        !indexacionSelected ? "N/A" : (overallGradeData.sum / 100) * (100 - indexacionSelected?.value)
                    )}
                    {!isArticuloAcademico() ? overallGradeData.sum : null}
                </td>
            </tr>
        )
    }

    const calcOverallGrades = (studentData) => {
        const evals = Object.entries(studentData.evaluaciones);
        if (evals.length === 0) return "N/A"; // Handle case when no evaluations exist
        const totalSum = evals.reduce((pre, evalValue) => {
            const [evalType, evalData] = evalValue;
            if (isArticuloAcademico() && isInformeFinal(evalType)) {
                evalData.sum = indexacionSelected?.value ?? 0;
            }
            if (isArticuloAcademico() && !isInformeFinal(evalType)) {
                evalData.sum = (evalData.sum / 100) * (100 - indexacionSelected?.value);
                // evalData.sum = (evalData.sum / 100) * (100 - indexacionSelected?.value) + indexacionSelected?.value;
            }
            return pre + evalData.sum;
        }, 0);
        if (isArticuloAcademico()) {
            return totalSum;
        }
        const val = totalSum / (evals.length * 100);
        const percentGrade = customRound(val * 100);
        const percentGradeStr = percentGrade;
        return percentGradeStr === "NaN" ? "N/A" : percentGradeStr; // Calculate mean and format to 2 decimals
        // return ((totalSum / evals.length).toFixed(2))*100; // Calculate mean and format to 2 decimals
    }

    const renderOverallGradeTable = (studentData, index) => {
        if (!studentData) return null;
        const nameStudentSelected = estudiantes.find(estudiante => estudiante?.id == selectedStudent)?.nombre;
        if (studentData?.nombre !== nameStudentSelected) return null;
        return (
            // <table className="min-w-full max-w-4xl border border-gray-300 rounded-lg shadow-sm">
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
                    {/* Fila de Totales */}
                    {Object.entries(studentData.evaluaciones).map(([evalType, evalData], index) => {
                        return renderOverallGradeRow(evalType, evalData, index);
                    })}
                    <tr className="bg-gray-100 font-bold">
                        <td className="py-2 text-sm font-bold text-blue-700 text-left border border-gray-300">
                            <span className="ml-5">{isComplexivo() || isArticuloAcademico() ? "TOTAL" : "PROMEDIO"} </span>
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
                                .filter((tipo) =>
                                    (isArticuloAcademico() &&
                                        tipo.tipo_evaluacion_nombre !== getInformeFinalKey()) ||
                                    (!isArticuloAcademico())
                                )
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
                    {isArticuloAcademico() && (
                        <table className="table-auto mb-4 bg-gray-100 text-blue-600">
                            <tbody>
                                <tr>
                                    <th className=" border border-gray-300 px-4 py-3 text-center font-bold">
                                        Indexación
                                    </th>
                                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                                        <ComboBoxIndexacionRevistas onSelect={(indexacion) => {
                                            setIndexacionSelected(indexacion);
                                        }}
                                            selectedId={indexacionSelected}
                                            disabled={true}
                                        />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {/* Promedios y totales de evaluaciones */}
                    {
                        selectedRubricaType !== getInformeFinalKey() && (
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
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Calificar;