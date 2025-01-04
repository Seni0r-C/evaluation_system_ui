import { useEffect, useState } from "react";
import { ModalHeader, ModalFooter } from "../modal/ModalTopHeader";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import { asignarTribunalService, reasignarTribunalService, obtenerTribunalService } from "../../services/tribunalService";
import { useMessage } from "../../hooks/hooks";

const AsignacionTribunalModal = ({ isOpen, onClose, trabajoData, title }) => {
    const { showWarning, showIfErrorOrWarning, showIfError } = useMessage();
    // Modal
    const [nestedData, setNestedData] = useState(null);
    // Selector
    const [selectedDocentes, setSelectedDocentes] = useState([]);
    const [initialSelectedItems, setInitialSelectedItems] = useState([]);

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

    const onCloseWrapper = () => {
        const changeLess = JSON.stringify(selectedDocentes) === JSON.stringify(initialSelectedItems);
        if (changeLess) {
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
        const msgData = asignarTribunalService(null, trabajoData?.id, selectedDocentes);
        if (showIfErrorOrWarning(msgData)) {
            return;
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-lg rounded shadow-lg">
                <ModalHeader onClose={onClose} title={title} />
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
                    btnActions={[
                        { label: "Reasignar", color:"blue", onClick: onCloseWrapper },
                        { label: "Asignar", color:"green", onClick: onCloseWrapper },
                        { label: "Cancelar", color:"gray", onClick: onClose },
                    ]}
                />
            </div>
        </div>
    );
};

export default AsignacionTribunalModal;
