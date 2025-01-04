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

const colorOption = {
    blue: "bg-blue-600 hover:bg-blue-800",
    gray: "bg-gray-500 hover:bg-gray-600",
    green: "bg-green-600 hover:bg-green-800",
    red: "bg-red-600 hover:bg-red-800",
    yellow: "bg-yellow-600 hover:bg-yellow-800",
    indigo: "bg-indigo-600 hover:bg-indigo-800",
    slate: "bg-slate-600 hover:bg-slate-800",
    teal: "bg-teal-600 hover:bg-teal-800",
};

const ModalFooter = ({ hasNestedData, onBack, btnActions }) => (
    <div className="sticky bottom-0 bg-white p-4 flex justify-end space-x-2 border-t">
        {hasNestedData && (
            <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={onBack}
            >
                Volver
            </button>
        )}
      
        {btnActions.map((action, index) => (
            <button
                key={index}
                className={`px-4 py-2 ${colorOption[action.color] || 'bg-gray-500 hover:bg-gray-600'} text-white rounded`}
                onClick={action.onClick}
            >
                {action.label}
            </button>
        ))}
    </div>
);

export { ModalHeader, ModalFooter };