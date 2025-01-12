// MessageDialog.js
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const MessageDialog = ({ message, onClose, isOpen, iconType }) => {
    if (!isOpen) return null;

    const renderIcon = () => {
        switch (iconType) {
            case 'error':
                return <span className="text-red-500">❌</span>;
            case 'warning':
                return <span className="text-yellow-500">⚠️</span>;
            case 'success':
                return <span className="text-green-500">✅</span>;
            default:
                return null;
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-md shadow-2xl max-w-lg w-full transition-all transform hover:scale-105">
                <div className="flex items-center mb-5">
                    {renderIcon() && <div className="mr-3">{renderIcon()}</div>}
                    <h2 className="text-xl font-bold text-gray-800">Mensaje</h2>
                </div>
                <p className="text-gray-700 mb-6">{message}</p>
                <button
                    className="block px-10 py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all transform focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>,
        document.body
    );
};

MessageDialog.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    iconType: PropTypes.oneOf(['error', 'warning', 'success', null]),
};

export default MessageDialog;
