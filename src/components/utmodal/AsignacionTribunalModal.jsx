/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ModalHeader, ModalFooter } from "../modal/ModalTopHeader";
// import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import SelectorTribunalView from "./SelectorTribunalView";
import SelectorFecha from "../common/SelectorFecha";
import { asignarTribunalService, reasignarTribunalService, obtenerTribunalService } from "../../services/tribunalService";
import { obtenerUnTrabajo } from "../../services/trabajosTitulacion";
import PropTypes from "prop-types";
import { useMessage } from "../../hooks/useMessage";
import { hourAndDateFromDateTimeMySQL, unhourAndDateFromDateTimeMySQL } from "../../utils/constants";

const AsignarTribunalModal = ({ isOpen, onClose, trabajoData, title }) => {
    const { showError, showWarning, showMsg } = useMessage();
    // Modal
    const [nestedData, setNestedData] = useState("");
    // Selector Docentes
    const [selectedDocentes, setSelectedDocentes] = useState([]);
    const [initialSelectedItems, setInitialSelectedItems] = useState([]);
    // Date Selector
    const [selectedDate, setSelectedDate] = useState("");

    const [initialDateDefensa, setInitialDateDefensa] = useState("");
    const [trabajoSelected, setTrabajoSelected] = useState(null);

    const handeDateFormat = (fecha, type) => {
        if (fecha.trim() == "") return '';
        if (type === "t" && fecha.includes(",")) {
            //"09/04/2025, 10:07" -> "2025-04-09T10:07"
            fecha = hourAndDateFromDateTimeMySQL(fecha);
        }
        if (type === "f" && fecha.includes("T")) {
            // "2025-04-09T10:07"->"09/04/2025, 10:07"
            fecha = unhourAndDateFromDateTimeMySQL(fecha);
        }
        return fecha;
    }
    const formatDate = (fecha, type) => (fecha && handeDateFormat(fecha, type)) || "";

    // Función para obtener el trabajo completo
    const fetchTrabajoFull = async (trabajoId) => {
        try {
            const setResults = (fetchedTrabajo) => {
                setTrabajoSelected(fetchedTrabajo);

                // "2025-04-08T10:07""09/04/2025, 09:57"                
                setInitialDateDefensa(formatDate(fetchedTrabajo?.fecha_defensa, "f"));
                setSelectedDate(formatDate(fetchedTrabajo?.fecha_defensa, "f"));
            };
            obtenerUnTrabajo(setResults, trabajoId);
            // alert(JSON.stringify(trabajoSelected, null, 2));

        } catch (error) {
            showError("Error al obtener los datos del trabajo.");
        }
    };

    // Función para obtener los miembros del tribunal
    const fetchTribunalMembers = async (trabajoId) => {
        const msgData = await obtenerTribunalService((miembros) => {
            setSelectedDocentes(miembros);
            setInitialSelectedItems(miembros);
        }, trabajoId);

        if (msgData?.typeMsg === "error") {
            showError(msgData.message);
        }
    };

    // Efecto para cargar datos cuando el modal está abierto y hay un trabajo seleccionado
    useEffect(() => {
        if (trabajoData?.id) {
            // if (isOpen && trabajoData?.id) {
            fetchTrabajoFull(trabajoData.id);
            fetchTribunalMembers(trabajoData.id);
        }
    }, [isOpen, trabajoData?.id, trabajoData?.fecha_defensa]);


    if (!isOpen) return null;

    const onCloseAsignarTribunal = async () => {
        if (!selectedDate) {
            showWarning(
                "La fecha de defensa es requerida para asignar el tribunal."
            );
            return;
        }
        const changeLess = JSON.stringify(selectedDocentes) === JSON.stringify(initialSelectedItems);
        if (changeLess && selectedDocentes.length === 0) {
            showWarning(
                "No hay docentes seleccionados para asignar el tribunal."
            );
            return;
        }
        else if (!selectedDocentes || selectedDocentes[0] === null) {
            showWarning(
                "Debe seleccionar a 'quien preside' para asignar el tribunal."
            );
            return;
        }
        else if (selectedDocentes && selectedDocentes[1] === null) {
            showWarning(
                "Debe seleccionar a un suplente de miembro de tribunal."
            );
            return;
        }
        else if (!selectedDocentes || selectedDocentes.length < 5) {
            showWarning(
                "Debe seleccionar 3 docentes para asignar el tribunal."
            );
            return;
        }
        if (changeLess && selectedDate === initialDateDefensa) {
            showWarning(
                "No se ha realizado ningún cambio para asignar el tribunal."
            );
            onClose();
            return;
        }
        const msgData = await asignarTribunalService(null, trabajoData?.id, selectedDocentes, selectedDate);

        if (showMsg(msgData)) {
            if (!(!selectedDate || selectedDate?.trim() === "") && selectedDate !== formatDate(trabajoData.fecha_defensa, "f")) {
                trabajoData.fecha_defensa = formatDate(selectedDate, "t");
            }
            trabajoData.estado = "CON TRIBUNAL";
            onClose();
        }
    };

    const onCloseReasignarTribunal = async () => {
        if (!selectedDate) {
            showWarning(
                "La fecha de defensa es requerida para reasignar el tribunal. "
            );
            return;
        }
        const changeLess = JSON.stringify(selectedDocentes) === JSON.stringify(initialSelectedItems);
        if (changeLess && selectedDocentes.length === 0) {
            showWarning(
                "No hay docentes seleccionados para reasignar el tribunal."
            );
            return;
        }

        else if (!selectedDocentes || selectedDocentes[0] === null) {
            showWarning(
                "Debe seleccionar a 'quien preside' para asignar el tribunal."
            );
            return;
        }
        else if (!selectedDocentes || selectedDocentes[1] === null) {
            showWarning(
                "Debe seleccionar a un suplente de miembro de tribunal."
            );
            return;
        }
        else if (!selectedDocentes || selectedDocentes.length < 5) {
            showWarning(
                "Debe seleccionar 3 docentes para reasignar el tribunal."
            );
            return;
        }
        if (changeLess && selectedDate === initialDateDefensa) {
            showMsg({
                typeMsg: "info",
                message: "No se ha realizado ningún cambio para reasignar el tribunal."
            });
            onClose();
            return;
        }
        const msgData = await reasignarTribunalService(null, trabajoData?.id, selectedDocentes, selectedDate);

        if (showMsg(msgData)) {
            if (!(!selectedDate || selectedDate?.trim() === "") && selectedDate !== formatDate(trabajoData.fecha_defensa, "f")) {
                trabajoData.fecha_defensa = formatDate(selectedDate, "t");
            }
            trabajoData.estado = "CON TRIBUNAL";
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-lg rounded shadow-lg min-w-[700px]">
                <ModalHeader onClose={onClose} title={title} />

                <SelectorTribunalView
                    selectedTribunal={selectedDocentes}
                    setSelectedTribunal={setSelectedDocentes}
                >
                    <div className="py-1 px-5">
                        <div className="relative">
                            {/* Etiqueta del campo */}
                            <label className="text-sm font-medium text-gray-700">
                                Fecha defensa
                                <span className="text-red-500"> *</span>
                            </label>

                            {/* Campo principal con botón más grande */}
                            <div className="relative flex items-center  rounded-md overflow-hidden">
                                <SelectorFecha onDateChange={setSelectedDate} required={true} trabajoData={trabajoData} />
                            </div>
                        </div>
                    </div>
                </ SelectorTribunalView>

                <ModalFooter
                    hasNestedData={!!nestedData}
                    onBack={() => setNestedData(null)}
                    btnActions={
                        initialSelectedItems.length > 2 ?
                            [
                                { label: "Reasignar", color: "blue", onClick: onCloseReasignarTribunal },
                                { label: "Cancelar", color: "gray", onClick: onClose },
                            ]
                            :
                            [
                                { label: "Asignar", color: "green", onClick: onCloseAsignarTribunal },
                                { label: "Cancelar", color: "gray", onClick: onClose },
                            ]
                    }
                />
            </div>
        </div>
    );
};

AsignarTribunalModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    trabajoData: PropTypes.object,
    title: PropTypes.string,
};

export default AsignarTribunalModal;
