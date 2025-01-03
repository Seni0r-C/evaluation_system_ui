import { useState } from "react";
import ModalContent from "./ModalContent";
import { ModalHeader, ModalFooter } from "./ModalTopHeader";

const DynamicModal = ({ isOpen, onClose, data, title }) => {
    const [nestedData, setNestedData] = useState(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-lg rounded shadow-lg">
                <ModalHeader onClose={onClose} title={title} />
                <ModalContent
                    data={data}
                    nestedData={nestedData}
                    onViewNestedData={(value) => setNestedData(value)}
                />
                <ModalFooter
                    onClose={onClose}
                    hasNestedData={!!nestedData}
                    onBack={() => setNestedData(null)}
                />
            </div>
        </div>
    );
};

export default DynamicModal;
