/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { getEstudiantesByTrabajoId, getTribunalMembersByTrabajoId, getUserPhoto } from "../../services/usuarioService";
import axiosInstance from "../../services/axiosConfig";
import { obtenerTiposEvaluacionByModalidadList } from "../../services/rubricaCriterioService";

function customRound(num) {
    return (num % 1 >= 0.5) ? Math.ceil(num) : Math.floor(num);
}

const VerCalificar = () => {
    const location = useLocation();
    const trabajo = location.state.trabajo ?? null;

    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [photos, setPhotos] = useState({});

    const [resumenRequired, setResumenRequired] = useState(false);

    const [rubricas, setRubricas] = useState(null);
    const [currentRubrica, setCurrentRubrica] = useState(null);
    const [selectedRubricaType, setSelectedRubricaType] = useState("");

    const [tipoEvaluacion, setTipoEvaluacion] = useState([]);
    const [calificacionesSeleccionadas, setCalificacionesSeleccionadas] = useState({});

    const [tribunalMembers, setTribunalMembers] = useState([]);
    const [selectedTribunalMember, setSelectedTribunalMember] = useState(null);

    const [overallSummary, setOverallSummary] = useState({});
    const [finalGrades, setFinalGrades] = useState({});

    const [esPromedio] = useState(trabajo.puntaje_final_promedio === 1 ? true : false);

    const handleFinalGradeChange = (studentId, evaluacionId, criterioIndex, grade, max_grade) => {
        let numericGrade = Number(grade);
        const numericMaxGrade = Number(max_grade);
        if (isNaN(numericGrade)) return;
        if (numericGrade < 0) return;
        if (numericGrade > numericMaxGrade) numericGrade = numericMaxGrade;

        setFinalGrades(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [evaluacionId]: {
                    ...prev[studentId]?.[evaluacionId],
                    [criterioIndex]: numericGrade
                }
            }
        }));
    };

    const handleSelectedStudent = (studentId) => {
        setSelectedStudent(studentId);
    };

    const handleSaveFinalGrades = async () => {
        // Logic to save the final grades will go here.
        // For now, I'll just log the data.
        console.log("Saving final grades:", finalGrades);
        // You would typically make an API call here, e.g.:
        // await axiosInstance.post('/calificacion/final', {
        //     trabajo_id: trabajo.id,
        //     calificaciones: finalGrades
        // });
        alert("Calificaciones finales guardadas (simulación).");
    };

    const esTipoDeEvaluacionGlobal = (tipo_evaluacion_nombre) => {
        return tipoEvaluacion.find((tipo) => tipo.tipo_evaluacion_nombre === tipo_evaluacion_nombre)?.calificacion_global === 1;
    }

    // Main data fetching effect
    useEffect(() => {
        if (trabajo?.id) {
            getEstudiantesByTrabajoId(trabajo.id, (fetchedEstudiantes) => {
                setEstudiantes(fetchedEstudiantes);
                if (fetchedEstudiantes.length > 0) {
                    setSelectedStudent(fetchedEstudiantes[0].id);
                }
            });

            getTribunalMembersByTrabajoId(trabajo.id, (members) => {
                setTribunalMembers(members);
                if (members.length > 0) {
                    setSelectedTribunalMember(members[0]);
                }
            });

            fetchRubricas();
        }
    }, [trabajo]);


    useEffect(() => {
        if (selectedRubricaType && rubricas) {
            const rubricaSeleccionada = rubricas[selectedRubricaType] ?? null;
            setCurrentRubrica(rubricaSeleccionada);
        }
    }, [selectedRubricaType, rubricas]);

    useEffect(() => {
        if (estudiantes.length > 0) {
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
        }
    }, [estudiantes]);

    // Effect to handle which students are selected based on rubric type
    useEffect(() => {
        if (!selectedRubricaType || tipoEvaluacion.length === 0) return;

        if (esTipoDeEvaluacionGlobal(selectedRubricaType)) {
            setSelectedStudents(estudiantes.map((student) => student.id));
        } else {
            // If it's individual and no student is selected, select the first one.
            if (!selectedStudent && estudiantes.length > 0) {
                setSelectedStudent(estudiantes[0].id);
            }
            setSelectedStudents(selectedStudent ? [selectedStudent] : []);
        }
    }, [selectedRubricaType, selectedStudent, estudiantes, tipoEvaluacion]);


    const handleSelectedTribunalMember = async (member) => {
        setSelectedTribunalMember(member);
        setResumenRequired(false);
    };

    const fetchRubricas = async () => {
        try {
            const tiposResponse = await obtenerTiposEvaluacionByModalidadList(trabajo?.modalidad_id);
            const tiposEvaluacion = tiposResponse.map((tipo) => ({
                tipo_evaluacion_id: tipo.id,
                tipo_evaluacion_nombre: tipo.nombre,
                calificacion_global: tipo.calificacion_global,
                pos_evaluation: tipo.pos_evaluation

            }));
            setTipoEvaluacion(tiposEvaluacion);

            const tipoRubrica = tiposEvaluacion.find((tipo) => tipo.calificacion_global === 1);
            handleSelectedRubricaType(tipoRubrica?.tipo_evaluacion_nombre ?? tiposEvaluacion[0]?.tipo_evaluacion_nombre);

            const rubricasPromises = tiposEvaluacion.map(async (tipo) => {
                try {
                    const response = await axiosInstance.get("/calificacion/rubrica", {
                        params: {
                            id_tipo_evaluacion: tipo.tipo_evaluacion_id,
                            id_modalidad: trabajo?.modalidad_id,
                        },
                    });
                    return { tipo: tipo.tipo_evaluacion_nombre, rubrica: response.data };
                } catch (error) {
                    console.error(`Error fetching rubrica for ${tipo.tipo_evaluacion_nombre}:`, error);
                    return { tipo: tipo.tipo_evaluacion_nombre, rubrica: null };
                }
            });

            const rubricasData = await Promise.all(rubricasPromises);
            const rubricasFormatted = rubricasData.reduce((acc, item) => {
                if (item.rubrica) {
                    const { id } = item.rubrica.rubrica;
                    acc[item.tipo] = { rubrica: item.rubrica, rubrica_id: id };
                }
                return acc;
            }, {});
            setRubricas(rubricasFormatted);
        } catch (error) {
            console.error("Error al obtener las rúbricas:", error);
        }
    };

    const getGrades = async (tribunalMember) => {
        try {
            const response = await axiosInstance.get("/calificacion/rubrica-evaluacion-notas", {
                params: {
                    trabajo_id: trabajo?.id,
                    docente_id: tribunalMember?.id,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching rubric grades:`, error.message);
            return {};
        }
    };

    const fetchRubricGrades = async (tribunalMember) => {
        if (!tribunalMember?.id) {
            setCalificacionesSeleccionadas({});
            return;
        }
        const rubricGrades = await getGrades(tribunalMember);
        setCalificacionesSeleccionadas(rubricGrades || {});
    };

    useEffect(() => {
        fetchRubricGrades(selectedTribunalMember);
    }, [selectedTribunalMember]);

    const isStudentSelected = (studentId) => {
        if (!selectedRubricaType) return false;
        if (esTipoDeEvaluacionGlobal(selectedRubricaType)) {
            return selectedStudents.includes(studentId)
        }
        return selectedStudent === studentId;
    }

    const handleSelectedRubricaType = (tipo_evaluacion_nombre) => {
        setSelectedRubricaType(tipo_evaluacion_nombre);
    };

    const calificacionValue = (minimo, maximo, criterioIndex) => {
        const value = calificacionesSeleccionadas[selectedStudent]?.[selectedRubricaType]?.[criterioIndex];
        return Math.max(minimo, value ?? 0);
    };

    const calculateMinScore = () => 0;
    const calculateMaxScore = (criterio) => criterio.puntaje_maximo;

    const getRubricaSummary = () => {
        const summary = {};
        if (!rubricas) return summary;

        estudiantes.forEach((student) => {
            summary[student.id] = { nombre: student.nombre, evaluaciones: {} };
            let totalSum = 0;
            let totalCount = 0;

            tipoEvaluacion.filter((tipo) => tipo.pos_evaluation === 0).forEach((tipo) => {
                const evalName = tipo.tipo_evaluacion_nombre;
                const rubrica = rubricas[evalName];
                if (!rubrica) return;

                const criterios = rubrica.rubrica.criterios;
                let sum = 0;
                let count = 0;

                criterios.forEach((_, criterioIndex) => {
                    const grade = calificacionesSeleccionadas[student.id]?.[evalName]?.[criterioIndex];
                    if (grade !== undefined && grade !== null) {
                        sum += Number(grade);
                        count++;
                    }
                });

                summary[student.id].evaluaciones[evalName] = { sum, mean: count > 0 ? sum / count : 0 };
                totalSum += sum;
                totalCount += count;
            });

            if (totalCount > 0) {
                summary[student.id].totalMean = totalSum / totalCount;
            }
        });

        return summary;
    };

    const getOverallSummary = async () => {
        if (tribunalMembers.length === 0) return;

        const gradesPromises = tribunalMembers.map(member => getGrades(member));
        const gradesResults = await Promise.all(gradesPromises);

        const summary = tribunalMembers.reduce((acc, member, index) => {
            acc[member.id] = gradesResults[index];
            return acc;
        }, {});

        setOverallSummary(summary);
    };

    useEffect(() => {
        getOverallSummary();
    }, [tribunalMembers]);

    const calcularPromedios = (datos) => {
        let resultadoPorEstudiante = {};

        //TODO verificar si esas calificaciones del tipo de evaluación pertenecen a un padre

        // Process grades from tribunal members
        Object.values(datos).forEach(docentes => {
            Object.entries(docentes).forEach(([idEstudiante, info]) => {
                if (!resultadoPorEstudiante[idEstudiante]) {
                    resultadoPorEstudiante[idEstudiante] = {
                        nombre: idEstudiante,
                        evaluaciones: {},
                    };
                }

                Object.entries(info).forEach(([evaluacion, notas]) => {
                    if (!resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion]) {
                        resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion] = { sum: 0, count: 0 };
                    }
                    let sumNotas = Object.values(notas).reduce((acc, val) => acc + val, 0);
                    resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion].sum += sumNotas;
                    resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion].count++;
                });
            });
        });

        // Initialize and update final grades for all students
        estudiantes.forEach(student => {
            const studentId = student.id;
            if (!resultadoPorEstudiante[studentId]) {
                resultadoPorEstudiante[studentId] = {
                    nombre: studentId,
                    evaluaciones: {},
                };
            }
        });

        // Calculate mean for each evaluation and the overall total mean for each student
        Object.values(resultadoPorEstudiante).forEach(estudiante => {
            let totalMeanSum = 0;
            let evalCount = 0;
            Object.values(estudiante.evaluaciones).forEach(valores => {
                const mean = valores.count > 0 ? valores.sum / valores.count : 0;
                valores.mean = mean;
                totalMeanSum += mean;
                evalCount++;
            });
            estudiante.totalMean = evalCount > 0 ? totalMeanSum / evalCount : 0;
        });

        return { promedioPorEstudiante: resultadoPorEstudiante };
    };

    const calcularTotal = (datos) => {
        let resultadoPorEstudiante = {};
        // Process grades from tribunal members
        Object.values(datos).forEach(docentes => {
            Object.entries(docentes).forEach(([idEstudiante, info]) => {
                if (!resultadoPorEstudiante[idEstudiante]) {
                    resultadoPorEstudiante[idEstudiante] = {
                        nombre: idEstudiante,
                        evaluaciones: {},
                    };
                }

                Object.entries(info).forEach(([evaluacion, notas]) => {
                    if (!resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion]) {
                        resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion] = { sum: 0, count: 0 };
                    }
                    let sumNotas = Object.values(notas).reduce((acc, val) => acc + val, 0);
                    resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion].sum += sumNotas;
                    resultadoPorEstudiante[idEstudiante].evaluaciones[evaluacion].count++;
                });
            });
        });

        // Initialize and update final grades for all students
        estudiantes.forEach(student => {
            const studentId = student.id;
            if (!resultadoPorEstudiante[studentId]) {
                resultadoPorEstudiante[studentId] = {
                    nombre: studentId,
                    evaluaciones: {},
                };
            }
        });

        // Calculate mean for each evaluation and the overall total sum for each student
        Object.values(resultadoPorEstudiante).forEach(estudiante => {
            let totalSum = 0;
            Object.values(estudiante.evaluaciones).forEach(valores => {
                const mean = valores.count > 0 ? valores.sum / valores.count : 0;
                valores.mean = mean;
                totalSum += mean;
            });
            estudiante.total = totalSum;
        });

        return { totalPorEstudiante: resultadoPorEstudiante };
    };

    const renderFinalGradeForm = (studentId) => {
        const finalEvaluations = tipoEvaluacion.filter(tipo => tipo.pos_evaluation === 1);
        if (finalEvaluations.length === 0) return null;

        return (
            <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Calificación Final</h3>
                {finalEvaluations.map(evaluacion => {
                    const rubrica = rubricas[evaluacion.tipo_evaluacion_nombre];
                    if (!rubrica) return null;

                    return (
                        <div key={evaluacion.tipo_evaluacion_id} className="mb-8">
                            <h4 className="text-lg font-semibold mb-4 text-blue-700">{evaluacion.tipo_evaluacion_nombre}</h4>
                            <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                <thead className="bg-blue-50 text-blue-700">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Criterio</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Nota Máxima</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Calificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rubrica.rubrica.criterios.map((criterio, criterioIndex) => (
                                        <tr key={criterioIndex} className="odd:bg-white even:bg-gray-50 text-sm">
                                            <td className="border border-gray-300 px-4 py-2 font-medium">{criterio.nombre.replace('::>', ': ')}</td>
                                            <td className="font-semibold text-blue-700 text-center border border-gray-300">{criterio.puntaje_maximo}</td>
                                            <td className="font-semibold text-blue-700 text-center border border-gray-300">
                                                <input
                                                    type="number"
                                                    className="w-full border-none rounded-md px-2 py-1 text-center bg-transparent focus:outline-none"
                                                    value={finalGrades[studentId]?.[evaluacion.tipo_evaluacion_id]?.[criterioIndex] ?? '0'}
                                                    onChange={(e) => handleFinalGradeChange(studentId, evaluacion.tipo_evaluacion_id, criterioIndex, e.target.value, criterio.puntaje_maximo)}
                                                    max={criterio.puntaje_maximo}
                                                    min={0}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSaveFinalGrades}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar Calificaciones Finales
                    </button>
                </div>
            </div>
        );
    };


    const renderOverallGradeRow = (overallEvalType, overallGradeData, index) => (
        <tr className="bg-gray-100 font-bold text-sm" key={index}>
            <td className="py-2 font-bold text-gray-700 text-left border border-gray-300">
                <span className="ml-5">{overallEvalType}</span>
            </td>
            <td className="font-semibold text-gray-700 text-center border border-gray-300">100</td>
            <td className="px-2 text-blue-600 text-center border border-gray-300 bg-gray-50">{overallGradeData}</td>
        </tr>
    );

    const calcOverallGrades = (studentData) => {
        const evals = Object.values(studentData.evaluaciones);
        if (evals.length === 0) return "N/A";
        const totalSum = evals.reduce((sum, evalData) => sum + evalData.sum, 0);
        const totalPossible = evals.length * 100;
        if (totalPossible === 0) return "N/A";
        const percentGrade = customRound((totalSum / totalPossible) * 100);
        return isNaN(percentGrade) ? "N/A" : percentGrade;
    }

    const renderOverallGradeTable = (studentData, index) => {
        if (!studentData) return null;
        const nameStudentSelected = estudiantes.find(estudiante => estudiante?.id == selectedStudent)?.nombre;
        if (studentData?.nombre !== nameStudentSelected) return null;

        return (
            <table className="min-w-[75%] border border-gray-300 rounded-lg shadow-sm mb-4 text-sm" key={index}>
                <thead className="bg-blue-50 text-blue-700">
                    <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left whitespace-nowrap w-[300px] min-w-[300px] max-w-[300px]">
                            {studentData.nombre}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-[100px]">Base</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-[100px]">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(studentData.evaluaciones).map(([evalType, evalData], index) =>
                        renderOverallGradeRow(evalType, evalData.sum, index)
                    )}
                    <tr className="bg-gray-100 font-bold">
                        <td className="py-2 font-bold text-blue-700 text-left border border-gray-300">
                            <span className="ml-5">TOTAL</span>
                        </td>
                        <td className="font-semibold text-blue-700 text-center border border-gray-300">100</td>
                        <td className="text-blue-600 text-center border border-gray-300 bg-gray-50">
                            {calcOverallGrades(studentData)}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    const renderOverallTriGradeTable = (studentData) => {
        studentData.nombre = estudiantes.find(estudiante => estudiante?.id == studentData.nombre)?.nombre;

        return (
            <table className="min-w-[75%] border border-gray-300 rounded-lg shadow-sm mb-4">
                <thead className="bg-blue-50 text-blue-700">
                    <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left w-[300px] min-w-[300px] max-w-[300px] whitespace-nowrap">
                            {studentData?.nombre}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-[100px]">Base</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-[100px]">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData?.evaluaciones && Object.entries(studentData.evaluaciones).map(([evalType, evalData]) =>
                        renderOverallGradeRow(evalType, evalData.mean.toFixed(2))
                    )}
                    <tr className="bg-gray-100 font-bold">
                        <td className="py-2 text-sm font-bold text-blue-700 text-left border border-gray-300">
                            <span className="ml-5">{esPromedio ? "PROMEDIO" : "TOTAL"}</span>
                        </td>
                        <td className="text-sm font-semibold text-blue-700 text-center border border-gray-300">100</td>
                        <td className="text-lg text-blue-600 text-center border border-gray-300 bg-gray-50">
                            {customRound(studentData.totalMean)}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-4">
                    <div className="lg:col-span-3 mt-6 lg:mt-0">
                        <div className="flex justify-center mb-4">
                            {tribunalMembers.length === 0 && (
                                <div className="text-center text-2xl font-semibold text-blue-600">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600" />
                                    <span className="ml-2 text-blue-700">Cargando miembros del tribunal...</span>
                                </div>
                            )}
                            {tribunalMembers.map((member) => {
                                const isSelected = selectedTribunalMember?.id === member.id;
                                return (
                                    <button
                                        key={member.id}
                                        onClick={() => handleSelectedTribunalMember(member)}
                                        className={`px-6 py-2 font-semibold flex flex-col items-center first:rounded-l-lg last:rounded-r-lg 
                                            ${isSelected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                                    >
                                        <span className="text-sm">{member.nombre}</span>
                                        <span className={`mt-2 px-4 py-0 text-sm font-semibold rounded-md ${isSelected ? "bg-gray-200 text-gray-800" : "bg-blue-600 text-white"}`}>
                                            <span className="text-xs">{member.estado}</span>
                                        </span>
                                    </button>
                                );
                            })}
                            {tribunalMembers.length > 0 && (
                                <button
                                    key={"resumen"}
                                    onClick={() => setResumenRequired(!resumenRequired)}
                                    className={`${resumenRequired ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-200"} border-l border-gray-400 px-6 py-2 font-semibold flex items-center rounded-r-lg`}
                                >
                                    <span className="text-sm">TOTALES</span>
                                </button>
                            )}
                        </div>
                        {resumenRequired ? (
                            <div className="flex flex-col items-center mt-16 mb-4 space-y-4">
                                {esPromedio ? calcularPromedios(overallSummary)?.promedioPorEstudiante : calcularTotal(overallSummary)?.totalPorEstudiante ? (
                                    Object.values(esPromedio ? calcularPromedios(overallSummary).promedioPorEstudiante : calcularTotal(overallSummary).totalPorEstudiante).map((rubrica) => (
                                        <div key={rubrica.nombre} className="w-full flex justify-center">
                                            {renderOverallTriGradeTable(rubrica)}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-2xl font-semibold text-blue-600">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600" />
                                        <span className="ml-2 text-blue-700">Cargando datos...</span>
                                    </div>
                                )}
                                {selectedStudent && renderFinalGradeForm(selectedStudent)}
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-center mb-4">
                                    {tipoEvaluacion.filter((tipo) => tipo.pos_evaluation === 0)
                                        .sort((a, b) => b.tipo_evaluacion_nombre.localeCompare(a.tipo_evaluacion_nombre))
                                        .map((tipo, index) => {
                                            const isSelected = selectedRubricaType === tipo.tipo_evaluacion_nombre;
                                            return (
                                                <button
                                                    key={tipo.id}
                                                    onClick={() => handleSelectedRubricaType(tipo.tipo_evaluacion_nombre)}
                                                    className={`px-6 py-2 font-semibold flex items-center text-sm ${isSelected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} ${index === 0 ? "rounded-l-lg" : ""} ${index === tipoEvaluacion.length - 1 ? "rounded-r-lg" : ""}`}
                                                >
                                                    {tipo.tipo_evaluacion_nombre}
                                                </button>
                                            );
                                        })}
                                </div>
                                <div className="overflow-x-auto">
                                    {currentRubrica ? (
                                        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                            <thead className="bg-blue-50 text-blue-700">
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-1 text-left">Criterio</th>
                                                    <th className="border border-gray-300 px-4 py-1 text-center font-semibold">Nota Máxima</th>
                                                    <th className="border border-gray-300 px-4 py-1 text-center font-semibold">Calificación</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRubrica.rubrica.criterios.map((criterio, criterioIndex) => (
                                                    <tr key={criterioIndex} className="odd:bg-white even:bg-gray-50 text-sm">
                                                        <td className="border border-gray-300 px-4 py-3 font-medium">{criterio.nombre.replace("::>", ': ')}</td>
                                                        <td className="font-semibold text-blue-700 text-center border border-gray-300">{criterio.puntaje_maximo}</td>
                                                        <td className="font-semibold text-blue-700 text-center border border-gray-300">
                                                            <input
                                                                disabled
                                                                type="number"
                                                                className="w-full border-none rounded-md px-2 py-1 text-center bg-transparent focus:outline-none"
                                                                value={calificacionValue(calculateMinScore(criterio), calculateMaxScore(criterio), criterioIndex)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="bg-gray-100 font-bold">
                                                    <td className="py-2 font-bold text-blue-700 text-left border border-gray-300"><span className="ml-5">TOTAL</span></td>
                                                    <td className="font-semibold text-blue-700 text-center border border-gray-300">
                                                        {currentRubrica.rubrica.criterios.reduce((total, criterio) => Number(total) + Number(criterio.puntaje_maximo), 0)}
                                                    </td>
                                                    <td className="font-semibold text-blue-700 text-center border border-gray-300">
                                                        {currentRubrica.rubrica.criterios.reduce((total, criterio, index) =>
                                                            total + calificacionValue(calculateMinScore(criterio), calculateMaxScore(criterio), index), 0
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="justify-center text-center text-2xl font-semibold text-blue-600 mt-20 mb-20">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600" />
                                            <span className="ml-2 text-blue-700">Cargando datos...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-span-1 lg:col-span-1 lg:col-start-4 text-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-600">Estudiantes</h2>
                        <div className="space-y-4">
                            {estudiantes.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => handleSelectedStudent(student.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow-md transition-all duration-200 ${isStudentSelected(student.id) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-blue-200"}`}
                                >
                                    <img
                                        src={photos[student.id_personal] ? `data:image/jpeg;base64,${photos[student.id_personal]}` : 'https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg'}
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
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {!resumenRequired && (currentRubrica ? (
                        Object.values(getRubricaSummary())
                            .map((rubrica, index) => renderOverallGradeTable(rubrica, index))
                    ) : (
                        <div className="justify-center text-center text-2xl font-semibold text-blue-600 mb-20">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600" />
                            <span className="ml-2 text-blue-700">Cargando datos...</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerCalificar;