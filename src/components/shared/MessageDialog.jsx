/* eslint-disable react/prop-types */
// MessageDialog.js
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MdHelpOutline, MdError, MdInfo, MdWarning, MdCheckCircle, MdHourglassEmpty } from 'react-icons/md';

const MessageDialog = ({ message, onClose, isOpen, iconType, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    const renderIcon = () => {
        switch (iconType) {
            case 'error':
                return <MdError className="text-red-500 text-5xl" />;
            case 'info':
                return <MdInfo className="text-blue-500 text-5xl" />;
            case 'question':
                return <MdHelpOutline className="text-amber-700 text-5xl" />;
            case 'wait':
                return <MdHourglassEmpty className="text-orange-500 text-5xl" />;
            case 'warning':
                return <MdWarning className="text-yellow-500 text-5xl" />;
            case 'success':
                return <MdCheckCircle className="text-green-500 text-5xl" />;
            default:
                return null;
        }
    };

    const styleTextMessage = () => {
        switch (iconType) {
            case 'error':
                return "text-red-600";
            case 'info':
                return "text-blue-600";
            case 'question':
                return "text-amber-700";
            case 'wait':
                return "text-orange-600";
            case 'warning':
                return "text-yellow-600";
            case 'success':
                return "text-green-600";
            default:
                return null;
        }
    };

    const messageTypeUIText = () => {
        switch (iconType) {
            case 'error':
                return 'Error';
            case 'info':
                return 'Información';
            case 'question':
                return 'Confirmación';
            case 'wait':
                return 'Espera un momento';
            case 'warning':
                return 'Advertencia';
            case 'success':
                return 'Operacion exitosa';
            default:
                return null;
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center mb-5">
                    {renderIcon()}
                    <h2 className={styleTextMessage() + " mt-3 text-xl font-bold "}>{messageTypeUIText(iconType)}</h2>
                </div>
                <p className="text-gray-700 text-lg mb-6">{message}</p>
                {iconType !== "wait" && iconType !== "question" && (<button
                    className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md shadow hover:bg-blue-600 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={onClose}
                >
                    Cerrar
                </button>)}
                {iconType === "question" && (<button key={"acceptQuestion"}
                    className="px-4 py-2 bg-red-600 text-white text-lg rounded-md shadow hover:bg-red-700 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={onConfirm}
                >
                    Aceptar
                </button>)}
                {iconType === "question" && (<button key={"cancelQuestion"}
                    className="ml-2 px-4 py-2 bg-blue-700 text-white text-lg rounded-md shadow hover:bg-blue-800 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={onCancel}
                >
                    Cancelar
                </button>)
                }
            </div>
        </div>,
        document.body
    );
};

MessageDialog.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    iconType: PropTypes.oneOf(['error', 'info', 'question', 'wait', 'warning', 'success', null]),
};

export default MessageDialog;
