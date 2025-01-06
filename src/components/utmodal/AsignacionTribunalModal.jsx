/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ModalHeader, ModalFooter } from "../modal/ModalTopHeader";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import SelectorFecha from "../common/SelectorFecha";
import { asignarTribunalService, reasignarTribunalService, obtenerTribunalService } from "../../services/tribunalService";
import { obtenerUnTrabajo } from "../../services/trabajosTitulacion";
import { useMessage } from "../../hooks/hooks";
import { estadosTrabajosIds } from "../../utils/estados_trabajos";
import PropTypes from "prop-types";

const AsignacionTribunalModal = ({ isOpen, onClose, trabajoData, title }) => {
    const { showIfSuccess, showWarning, showIfErrorOrWarning, showIfError } = useMessage();
    // Modal
    const [nestedData, setNestedData] = useState(null);
    // Selector Docentes
    const [selectedDocentes, setSelectedDocentes] = useState([]);
    const [initialSelectedItems, setInitialSelectedItems] = useState([]);
    // Date Selector
    const [selectedDate, setSelectedDate] = useState(null); // [setSelectedDate]

    const [initialDateDefensa, setInitialDateDefensa] = useState(null);
    const [trabajoSelected, setTrabajoSelected] = useState(null);

    const fectchTrabajoFull = (trabajo) => {
        if (trabajo?.id ?? false) {
            obtenerUnTrabajo(setTrabajoSelected, trabajo.id);
        }
    };

    useEffect(() => {
        if (trabajoData?.id) {
            fectchTrabajoFull(trabajoData);
            setInitialDateDefensa(trabajoSelected?.fecha_defensa);
            setSelectedDate(trabajoSelected?.fecha_defensa);
        }
    }, [isOpen, trabajoData?.id]);

    useEffect(() => {
        if (trabajoData?.id) {
            const msgData = obtenerTribunalService((miembros) => {
                setSelectedDocentes(miembros);
                setInitialSelectedItems(miembros);
            }, trabajoData.id);
            showIfError(msgData);
        }
    }, [isOpen, trabajoData?.id]);


    if (!isOpen) return null;

    const onCloseAsignarTribunal = () => {
        if (!selectedDate) {
            showWarning(
                "La fecha de defensa es requerida para asignar el tribunal."
            );
            return;
        }
        const changeLess = JSON.stringify(selectedDocentes) === JSON.stringify(initialSelectedItems);
        if (changeLess && selectedDocentes.length === 0) {
            showWarning(
                "No hay docentes selecionados para asignar el tribunal."
            );
            return;
        }
        if (changeLess && selectedDate === initialDateDefensa) {
            showWarning(
                "No se ha realizado ningun cambio para asignar el tribunal."
            );
            // showWarning(`No se ha realizado ningun cambio. \nselectedDocentes:\n${JSON.stringify(selectedDocentes)} \r\ninitialSelectedItems:\n${JSON.stringify(initialSelectedItems)} ${changeLess}`);
            onClose();
            return;
        }
        else if (!selectedDocentes || selectedDocentes.length < 3) {
            showWarning(
                "Debe seleccionar 3 docentes para asignar el tribunal."
            );
            return;
        }
        const msgData = asignarTribunalService(null, trabajoData?.id, selectedDocentes, selectedDate, estadosTrabajosIds.ASIGNADO);
        if (showIfErrorOrWarning(msgData)) {
            return;
        }
        if (showIfSuccess(msgData)) {
            onClose();
        }
    };

    const onCloseReasignarTribunal = async () => {
        if (!selectedDate) {
            showWarning(
                "La fecha de defensa es requerida para reasignar el tribunal."
            );
            return;
        }
        const changeLess = JSON.stringify(selectedDocentes) === JSON.stringify(initialSelectedItems);
        if (changeLess && selectedDocentes.length === 0) {
            showWarning(
                "No hay docentes selecionados para reasignar el tribunal."
            );
            return;
        }
        if (changeLess && selectedDate === initialDateDefensa) {
            showWarning(
                "No se ha realizado ningun cambio para reasignar el tribunal."
            );
            onClose();
            return;
        }
        else if (!selectedDocentes || selectedDocentes.length < 3) {
            showWarning(
                "Debe seleccionar 3 docentes para reasignar el tribunal."
            );
            return;
        }
        const msgData = await reasignarTribunalService(null, trabajoData?.id, selectedDocentes, selectedDate, estadosTrabajosIds.ASIGNADO);
        if (showIfErrorOrWarning(msgData)) {
            return;
        }
        if (showIfSuccess(msgData)) {
            trabajoData.fecha_defensa = selectedDate;
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-lg rounded shadow-lg">
                <ModalHeader onClose={onClose} title={title} />
                <div className="p-4">
                    <div className="relative">
                        {/* Etiqueta del campo */}
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha defensa
                            <span className="text-red-500"> *</span>
                        </label>

                        {/* Campo principal con botón más grande */}
                        <div className="relative flex items-center  rounded-md overflow-hidden">
                            <SelectorFecha onDateChange={setSelectedDate} required={true} trabajoData={trabajoData} />
                        </div>
                    </div>
                </div>
                <BuscadorDocentes
                    setSelectedDocentes={setSelectedDocentes}
                    initialSelectedItems={selectedDocentes}
                    allowDuplicates={false}
                    maxSelections={3}
                    required={true}
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

AsignacionTribunalModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    trabajoData: PropTypes.object,
    title: PropTypes.string,
};

export default AsignacionTribunalModal;
