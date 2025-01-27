import { useState } from 'react';
import GenericModal from '../modal/GenericModal';
import PropTypes from 'prop-types';
import { subirTrabajoFinal } from '../../services/trabajosTitulacion';

const SubirTrabajoFinal = ({ isOpen, onClose, trabajoData }) => {
    const [link, setLink] = useState('');

    const handleSubirTrabajoFinal = () => {
        subirTrabajoFinal(trabajoData.id, link);

        alert('Trabajo final subido exitosamente');
        onClose();

    };

    if (!isOpen) {
        return null;
    }

    return (
        <GenericModal onClose={onClose} title="Subir Trabajo Final">
            <div className="p-6 bg-white shadow-xl rounded-2xl">
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-gray-700">
                        Trabajo de Titulación:
                        <span className="block text-base font-normal text-gray-600">
                            {trabajoData?.titulo || "Sin título"}
                        </span>
                    </p>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Ingrese el link del trabajo final"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={handleSubirTrabajoFinal}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition ease-in-out duration-150"
                    >
                        Subir Trabajo Final
                    </button>
                </div>
            </div>
        </GenericModal>
    );
};

SubirTrabajoFinal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    trabajoData: PropTypes.object,
};

export default SubirTrabajoFinal;