// MessageContext.js
import { createContext, useState, useCallback } from 'react';
import MessageDialog from '../components/shared/MessageDialog';
import PropTypes from 'prop-types';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messageState, setMessageState] = useState({
        message: '',
        isOpen: false,
        iconType: null,
    });

    const showMessage = useCallback((message, iconType = null) => {
        setMessageState({ message, isOpen: true, iconType });
    }, []);

    const showMsg = useCallback(({ typeMsg, message }) => {
        setMessageState({ message, isOpen: true, iconType: typeMsg });
    }, []);

    const closeMessage = useCallback(() => {
        setMessageState({ ...messageState, isOpen: false });
    }, [messageState]);

    // Métodos más específicos para cada tipo de mensaje
    const showSuccess = useCallback(
        (message) => showMessage(message, 'success'),
        [showMessage]
    );

    const showError = useCallback(
        (message) => showMessage(message, 'error'),
        [showMessage]
    );

    const showWarning = useCallback(
        (message) => showMessage(message, 'warning'),
        [showMessage]
    );

    return (
        <MessageContext.Provider
            value={{ showMessage, showSuccess, showError, showWarning, closeMessage, showMsg }}
        >
            {children}
            <MessageDialog
                message={messageState.message}
                isOpen={messageState.isOpen}
                onClose={closeMessage}
                iconType={messageState.iconType}
            />
        </MessageContext.Provider>
    );
};

MessageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MessageContext;