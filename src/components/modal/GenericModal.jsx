import { ModalHeader, ModalFooter } from './ModalTopHeader';
import PropTypes from 'prop-types';

const GenericModal = ({ onClose, title, children, className = '' }) => {
    return (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className={`relative bg-white w-full rounded shadow-lg max-w-lg ${className}`}>
                <ModalHeader onClose={onClose} title={title} />
                {children}
                <ModalFooter
                    hasNestedData={false}
                    onBack={onClose}
                    btnActions={[{ label: 'Cerrar', color: 'blue', onClick: onClose }]}
                />
            </div>
        </div>
    );
};

GenericModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};

export default GenericModal;