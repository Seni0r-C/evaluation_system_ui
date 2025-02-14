import { useEffect, useState } from "react";
import {
    obtenerModalidades,
    obtenerTiposEvaluacionByModalidad,
    obtenerCriteriosRubrica,
    actualizarCriterioRubrica,
    eliminarCriterioRubrica,
    crearCriterioRubrica
} from "../../services/rubricaCriterioService";
import { useMessage } from "../../hooks/useMessage";

const RubricaCriterios = () => {
    const { showMsg, showQuestion } = useMessage();
    const [modalidades, setModalidades] = useState([]);
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]);
    const [criterios, setCriterios] = useState([]);

    const [modalidadSelected, setModalidadSelected] = useState({ nombre: "Seleccione modalidad", id: -1 });
    const [tipoEvaluacionSelected, setTipoEvaluacionSelected] = useState({ nombre: "Seleccione tipo de evaluación", id: -1 });

    const [nombreCriterio, setNombreCriterio] = useState("");
    const [puntajeMaximo, setPuntajeMaximo] = useState("");
    const [criterioSeleccionado, setCriterioSeleccionado] = useState(null);

    useEffect(() => {
        obtenerModalidades(setModalidades);
    }, []);

    useEffect(() => {
        // alert("modalidadSelected: "+JSON.stringify(modalidadSelected, null, 2));
        if (!modalidadSelected.id) return;
        if (modalidadSelected.id === -1) return;
        obtenerTiposEvaluacionByModalidad(setTiposEvaluacion, modalidadSelected.id);
        // alert("tiposEvaluacion: "+JSON.stringify(tiposEvaluacion, null, 2));
    }, [modalidadSelected]);

    const clearForm = () => {
        // setModalidadSelected({ nombre: "Seleccione modalidad", id: -1 });
        // setTipoEvaluacionSelected({ nombre: "Seleccione tipo de evaluación", id: -1 });
        setNombreCriterio("");
        setPuntajeMaximo("");
        setCriterioSeleccionado(null);
    };

    const handleBuscarCriterios = async () => {
        if (modalidadSelected.id !== -1 && tipoEvaluacionSelected.id !== -1) {
            await obtenerCriteriosRubrica(setCriterios, modalidadSelected.id, tipoEvaluacionSelected.id);
        }
        clearForm();
    };

    const handleBuscarCriteriosCBox = async (tipoEvaluacionSelected, modalidadSelected) => {
        // alert(JSON.stringify({tipoEvaluacionSelected, modalidadSelected}, null, 2));
        if (modalidadSelected.id !== -1 && tipoEvaluacionSelected.id !== -1) {
            await obtenerCriteriosRubrica(setCriterios, modalidadSelected.id, tipoEvaluacionSelected.id);
        }
        clearForm();
    };

    const handleActualizarCriterio = async () => {
        if (!criterioSeleccionado) {
            showMsg({ typeMsg: "info", message: "Seleccione un criterio" });
            return;
        }
        if (!nombreCriterio || !puntajeMaximo) {
            showMsg({ typeMsg: "info", message: "Ingrese nombre y puntaje máximo" });
            return;
        }

        const response = await actualizarCriterioRubrica(criterioSeleccionado.criterio_id, nombreCriterio, puntajeMaximo);
        if (showMsg(response)) {
            clearForm();
            handleBuscarCriterios();
        }
    };

    const handleCrearCriterio = async () => {
        if (!nombreCriterio || !puntajeMaximo) {
            showMsg({ typeMsg: "info", message: "Ingrese nombre y puntaje máximo" });
            return;
        }

        const response = await crearCriterioRubrica(nombreCriterio, puntajeMaximo, modalidadSelected.id, tipoEvaluacionSelected.id);
        if (showMsg(response)) {
            clearForm();
            handleBuscarCriterios();
        }
    };

    const handleSeleccionarCriterio = (criterio) => {
        setCriterioSeleccionado(criterio);
        setNombreCriterio(criterio.criterio_nombre);
        setPuntajeMaximo(criterio.puntaje_maximo);
    };

    const handleCancelarEdicion = () => {
        setCriterioSeleccionado(null);
        setNombreCriterio("");
        setPuntajeMaximo("");
    };

    const handleDeleteCriterio = async (criterio_id) => {
        const confirm = async () => {
            showMsg({ typeMsg: "wait", message: "Eliminando criterio..." });
            const response = await eliminarCriterioRubrica(criterio_id);
            if (showMsg(response)) {
                clearForm();
                handleBuscarCriterios();
            }
        };
        showQuestion("¿Seguro que desea eliminar este criterio?", confirm);

    };

    return (
        <div>
            {/* <h2 className="text-xl font-bold mb-4">Gestión de Criterios de Rúbrica</h2> */}

            {/* Selección de Modalidad y Tipo de Evaluación */}
            <div className="mb-4">
                <label className="block font-semibold">Modalidad:</label>
                <select
                    className="border p-2 w-full"
                    onChange={async (e) => {
                        const selected = modalidades.find(m => m.id == e.target.value);
                        setModalidadSelected(selected || { nombre: "Seleccione modalidad", id: -1 });
                        if (tipoEvaluacionSelected.id !== -1) {
                            handleBuscarCriteriosCBox(tipoEvaluacionSelected, selected);
                        }
                    }}
                >
                    <option value="-1">Seleccione modalidad</option>
                    {modalidades.map((mod) => (
                        <option key={mod.id} value={mod.id}>{mod.nombre}</option>
                    ))}
                </select>

                <label className="block font-semibold mt-2">Tipo de Evaluación:</label>
                <select
                    className="border p-2 w-full"
                    onChange={(e) => {
                        const selected = tiposEvaluacion.find(te => te.id == e.target.value);
                        setTipoEvaluacionSelected(selected || { nombre: "Seleccione tipo de evaluación", id: -1 });
                        // Ejecutar la búsqueda de criterios si la modalidad también ha sido seleccionada
                        if (modalidadSelected.id !== -1) {
                            handleBuscarCriteriosCBox(selected, modalidadSelected);
                        }
                    }}
                >
                    <option value="-1">Seleccione tipo de evaluación</option>
                    {tiposEvaluacion.map((te) => (
                        <option key={te.id} value={te.id}>{te.nombre}</option>
                    ))}
                </select>


                {/* <button
                    onClick={handleBuscarCriterios}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 w-full"
                >
                    Buscar Criterios
                </button> */}
            </div>

            {/* Formulario para Crear o Editar un Criterio */}
            <div className="border p-4 mb-4">
                <h3 className="font-bold mb-2">{criterioSeleccionado ? "Editar Criterio" : "Agregar Criterio"}</h3>

                <input
                    type="text"
                    value={nombreCriterio}
                    onChange={(e) => setNombreCriterio(e.target.value)}
                    className="border p-2 mr-2 w-full"
                    placeholder="Nombre del criterio"
                />
                <input
                    type="number"
                    value={puntajeMaximo}
                    onChange={(e) => setPuntajeMaximo(e.target.value)}
                    className="border p-2 mr-2 w-full mt-2"
                    placeholder="Puntaje máximo"
                />

                <div className="mt-2">
                    <button
                        onClick={criterioSeleccionado ? handleActualizarCriterio : handleCrearCriterio}
                        className="bg-green-500 text-white px-4 py-2"
                    >
                        {criterioSeleccionado ? "Actualizar" : "Crear"}
                    </button>

                    {criterioSeleccionado && (
                        <button
                            onClick={handleCancelarEdicion}
                            className="bg-red-500 text-white px-4 py-2 ml-2"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>

            {/* Tabla de Criterios */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Nombre</th>
                            <th className="px-4 py-2 border">Puntaje Máximo</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {criterios.length > 0 ? (
                            criterios.map((criterio) => (
                                <tr key={criterio.criterio_id}>
                                    <td className="px-4 py-2 border">{criterio.criterio_id}</td>
                                    <td className="px-4 py-2 border">{criterio.criterio_nombre}</td>
                                    <td className="px-4 py-2 border">{criterio.puntaje_maximo}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleSeleccionarCriterio(criterio)}
                                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCriterio(criterio.criterio_id)}
                                            className="bg-red-500 text-white px-2 py-1"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 border text-center">No hay criterios disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RubricaCriterios;
