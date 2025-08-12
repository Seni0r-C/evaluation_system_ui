/* eslint-disable react/prop-types */
import { ModalHeader, ModalFooter } from './ModalTopHeader';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const GenericModal = forwardRef(({ isOpen = true, onClose, title, children, className = '' }, ref) => {
    const modalRef = useRef();
    const closeButtonRef = useRef();

    useImperativeHandle(ref, () => ({
        focusCloseButton: () => {
            closeButtonRef.current?.focus();
        }
    }));

    useEffect(() => {
        if (isOpen) {
            const modalNode = modalRef.current;
            const focusableElements = modalNode.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTabKeyPress = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            const handleEscapeKeyPress = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            modalNode.addEventListener('keydown', handleTabKeyPress);
            document.addEventListener('keydown', handleEscapeKeyPress);

            return () => {
                modalNode?.removeEventListener('keydown', handleTabKeyPress);
                document.removeEventListener('keydown', handleEscapeKeyPress);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={`relative bg-white w-full rounded shadow-lg max-w-lg ${className}`}>
                <ModalHeader ref={closeButtonRef} onClose={onClose} title={title} />
                {children}
                <ModalFooter
                    hasNestedData={false}
                    onBack={onClose}
                    btnActions={[{ label: 'Cerrar', color: 'blue', onClick: onClose }]}
                />
            </div>
        </div>
    );
});

GenericModal.displayName = 'GenericModal';

export default GenericModal;