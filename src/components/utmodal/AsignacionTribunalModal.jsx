/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ModalHeader, ModalFooter } from "../modal/ModalTopHeader";
// import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import SelectorTribunalModal from "./SelectorTribunalModal";
import SelectorFecha from "../common/SelectorFecha";
import { asignarTribunalService, reasignarTribunalService, obtenerTribunalService } from "../../services/tribunalService";
import { obtenerUnTrabajo } from "../../services/trabajosTitulacion";
import PropTypes from "prop-types";
import { useMessage } from "../../hooks/useMessage";

const AsignarTribunalModal = ({ isOpen, onClose, trabajoData, title }) => {
    const { showError, showWarning, showSuccess, showMsg } = useMessage();
    // Modal
    const [nestedData, setNestedData] = useState("");
    // Selector Docentes
    const [selectedDocentes, setSelectedDocentes] = useState([]);
    const [initialSelectedItems, setInitialSelectedItems] = useState([]);
    // Date Selector
    const [selectedDate, setSelectedDate] = useState("");

    const [initialDateDefensa, setInitialDateDefensa] = useState("");
    const [trabajoSelected, setTrabajoSelected] = useState(null);
    // Función para obtener el trabajo completo
    const fetchTrabajoFull = async (trabajoId) => {
        try {
            const setResults = (fetchedTrabajo) => {
                setTrabajoSelected(fetchedTrabajo);
                setInitialDateDefensa(fetchedTrabajo?.fecha_defensa || "");
                setSelectedDate(fetchedTrabajo?.fecha_defensa || "");
            };
            await obtenerUnTrabajo(setResults, trabajoId);
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
        if (isOpen && trabajoData?.id) {
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
        if (changeLess && selectedDate === initialDateDefensa) {
            showWarning(
                "No se ha realizado ningún cambio para asignar el tribunal."
            );
            onClose();
            return;
        }
        else if (!selectedDocentes || selectedDocentes.length < 3) {
            showWarning(
                "Debe seleccionar 3 docentes para asignar el tribunal."
            );
            return;
        }
        const msgData = await asignarTribunalService(null, trabajoData?.id, selectedDocentes, selectedDate);

        if (showMsg(msgData)) {
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
        if (changeLess && selectedDate === initialDateDefensa) {
            showMsg({
                typeMsg: "info",
                message: "No se ha realizado ningún cambio para reasignar el tribunal."
            });
            onClose();
            return;
        }
        else if (!selectedDocentes || selectedDocentes.length < 3) {
            showWarning(
                "Debe seleccionar 3 docentes para reasignar el tribunal."
            );
            return;
        }
        const msgData = await reasignarTribunalService(null, trabajoData?.id, selectedDocentes, selectedDate);

        if (showMsg(msgData)) {
            trabajoData.fecha_defensa = selectedDate;
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-lg rounded shadow-lg">
                <ModalHeader onClose={onClose} title={title} />
                <div className="py-1 px-4">
                    <div className="relative">
                        {/* Etiqueta del campo */}
                        <label className="block text-sm font-medium text-gray-700 ">
                            Fecha defensa
                            <span className="text-red-500"> *</span>
                        </label>

                        {/* Campo principal con botón más grande */}
                        <div className="relative flex items-center  rounded-md overflow-hidden">
                            <SelectorFecha onDateChange={setSelectedDate} required={true} trabajoData={trabajoData} />
                        </div>
                    </div>
                </div>

                {/* <BuscadorDocentes
                    setSelectedDocentes={setSelectedDocentes}
                    initialSelectedItems={selectedDocentes}
                    allowDuplicates={false}
                    maxSelections={3}
                    required={true}
                /> */}

                <SelectorTribunalModal
                    selectedTribunal={selectedDocentes}
                    setSelectedTribunal={setSelectedDocentes}
                />

                <ModalFooter
                    hasNestedData={!!nestedData}
                    onBack={() => setNestedData(null)}
                    btnActions={
                        initialSelectedItems.length > 0 ? [
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
