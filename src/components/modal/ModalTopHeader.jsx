import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const ModalHeader = forwardRef(({ onClose, title }, ref) => (
    <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
        <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
        <button
            ref={ref}
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Cerrar"
        >
            <MdClose className="h-6 w-6" />
        </button>
    </div>
));

ModalHeader.displayName = 'ModalHeader';

ModalHeader.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

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

/**
 * Este componente es el pie de un modal. Abajo del todo.
 * Tiene un botón pa volver si se seleccionó algo y unos botones
 * de acción que se pasan por props.
 * @param {{ hasNestedData: boolean, onBack: function, btnActions: array.<{label: string, onClick: function, color: string}> }} props
 * @prop {boolean} hasNestedData - Dice si hay algo seleccionado.
 * @prop {function} onBack - Esta función se llama cuando le das al botón de "Volver".
 * @prop {array.<{label: string, onClick: function, color: string}>} btnActions - Una lista de cosas que
 *    definen botones que van abajo. Cada botón tiene label (el texto del botón),
 *    onClick (qué hace el botón) y color (el color del botón). Los colores pueden ser:
 *    blue, gray, green, red, yellow, indigo, slate o teal.
 * @returns {ReactElement} - Devuelve algo que es el pie del modal.
 */

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

ModalFooter.propTypes = {
    hasNestedData: PropTypes.bool,
    onBack: PropTypes.func,
    btnActions: PropTypes.array,
};

export { ModalHeader, ModalFooter };