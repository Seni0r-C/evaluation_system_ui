import { useMessage } from '../../hooks/hooks';
import { FaInfoCircle } from 'react-icons/fa';

const GlobalMessageDialog = () => {
    const {
        messageDialog,
        isOpenDialog,
        iconTypeDialog,
        onCloseDialog,
        setIsOpenDialog,
    } = useMessage();

    if (!isOpenDialog) return null;  // Si isOpen es false, no se renderiza nada

    const renderIcon = () => {
        switch (iconTypeDialog) {
            case 'info':
                return <span className="text-blue-500"><FaInfoCircle /></span>;
            case 'error':
                return <span className="text-red-500">❌</span>;
            case 'warning':
                return <span className="text-yellow-500">⚠️</span>;
            case 'success':
                return <span className="text-green-500">✅</span>;
            default:
                return null;  // Si no hay icono, no se renderiza nada
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-md shadow-2xl max-w-lg w-full transition-all transform hover:scale-105">
                <div className="flex items-center mb-5">
                    {renderIcon() && <div className="mr-3">{renderIcon()}</div>}
                    <h2 className="text-xl font-bold text-gray-800">Mensaje</h2>
                </div>
                <p className="text-gray-700 mb-6">{messageDialog}</p>
                <button
                    className="block px-10 py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all transform focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto"
                    onClick={() => onCloseDialog ? onCloseDialog() : setIsOpenDialog(false)}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default GlobalMessageDialog;

