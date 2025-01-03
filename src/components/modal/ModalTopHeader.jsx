import { MdClose } from "react-icons/md";

const ModalHeader = ({ onClose, title }) => (
    <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Cerrar"
        >
            <MdClose className="h-6 w-6" />
        </button>
    </div>
);

const ModalFooter = ({ onClose, hasNestedData, onBack }) => (
    <div className="sticky bottom-0 bg-white p-4 flex justify-end space-x-4 border-t">
        {hasNestedData && (
            <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={onBack}
            >
                Volver
            </button>
        )}
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
        >
            Aceptar
        </button>
    </div>
);

export { ModalHeader, ModalFooter };