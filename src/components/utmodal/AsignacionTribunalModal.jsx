import { useState } from "react";
import { ModalHeader, ModalFooter } from "../modal/ModalTopHeader";
import BuscadorDocentes from "../utmcomps/BuscadorDocentes";
import MessageDialog from "../MessageDialog";
import { asignarTribunalService } from "../../services/tribunalService";

const AsignacionTribunalModal = ({ isOpen, onClose, trabajoData, title }) => {
    if (!isOpen) return null;

    const [nestedData, setNestedData] = useState(null);
    const [selectedDocentes, setSelectedDocentes] = useState([]);

    // Mensajes dialog
    const [message, setMessage] = useState('');
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [iconType, setIconType] = useState(null);

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

    const onCloseWrapper = () => {
        if (!selectedDocentes || selectedDocentes.length < 3) {
            showWarning(
                "Debe seleccionar 3 docentes para asignar el tribunal."
            );
            return;
        }
        alert(JSON.stringify(trabajoData));
        asignarTribunalService(null, trabajoData?.id, selectedDocentes);      
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-lg rounded shadow-lg">
                <ModalHeader onClose={onClose} title={title} />
                <BuscadorDocentes
                    setSelectedDocentes={setSelectedDocentes}
                    allowDuplicates={false}
                    maxSelections={3}
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
