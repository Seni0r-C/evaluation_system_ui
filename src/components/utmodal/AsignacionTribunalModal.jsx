import { useEffect, useState } from "react";
import { ModalHeader, ModalFooter } from "../modal/ModalTopHeader";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import MessageDialog from "../MessageDialog";
import { asignarTribunalService, reasignarTribunalService, obtenerTribunalService } from "../../services/tribunalService";

const AsignacionTribunalModal = ({ isOpen, onClose, trabajoData, title }) => {
    if (!isOpen) return null;

    // Mensajes dialog
    const [message, setMessage] = useState('');
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [iconType, setIconType] = useState(null);

    // Modal
    const [nestedData, setNestedData] = useState(null);
    // Selector
    const [selectedDocentes, setSelectedDocentes] = useState([]);

    
    const show = (msgData) => {
        setMessage(msgData.message);
        setIconType(msgData.typeMsg);
        setIsOpenDialog(true);
    };

    const showIfError = (msgData) => {
        if (msgData.typeMsg === 'error') {
            showError(msgData.message);
        }
    };

    const showWarning = (msg) => {
        setMessage(msg);
        setIconType('warning');
        setIsOpenDialog(true);
    };

    const showSuccess = (msg) => {
        setMessage(msg);
        setIconType('succes');
        setIsOpenDialog(true);
    };

    const showError = (msg) => {
        setMessage(msg);
        setIconType('error');
        setIsOpenDialog(true);
    };

    useEffect(() => {
        if (isOpen) {
            const msgData = obtenerTribunalService(setSelectedDocentes, trabajoData?.id);
            showIfError(msgData);
        }
    }, [isOpen]);

    const onCloseWrapper = () => {
        if (!selectedDocentes || selectedDocentes.length < 3) {
            showWarning(
                "Debe seleccionar 3 docentes para asignar el tribunal."
            );
            return;
        }
        asignarTribunalService(null, trabajoData?.id, selectedDocentes);
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
                    onClose={onCloseWrapper}
                    hasNestedData={!!nestedData}
                    onBack={() => setNestedData(null)}
                    buttonLabel="Asignar"
                />
            </div>
            <MessageDialog message={message} isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} iconType={iconType} />
        </div>
    );
};

export default AsignacionTribunalModal;
