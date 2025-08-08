/* eslint-disable react-hooks/exhaustive-deps */
// MessageContext.js
import { createContext, useState, useCallback, useRef, useEffect } from 'react';
import MessageDialog from '../components/shared/MessageDialog';
import PropTypes from 'prop-types';
import eventEmitter from '../services/eventEmitter';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messageState, setMessageState] = useState({
        message: '',
        isOpen: false,
        iconType: null,
    });


    const onCancelCallback = useRef(() => { });
    const onConfirmCallback = useRef(() => { });

    const closeMessage = useCallback(() => {
        setMessageState({ ...messageState, isOpen: false });
    }, [messageState]);

    const showMessage = useCallback((message, iconType = null) => {
        setMessageState({ message, isOpen: true, iconType });
    }, []);

    const showMsg = useCallback(({ typeMsg, message }) => {
        setMessageState({ message, isOpen: true, iconType: typeMsg });
        return typeMsg === 'success';
    }, []);

    const showQuestion = useCallback((message, onConfirm, onCancel=() => {}) => {
        onCancelCallback.current = () => {
            onCancel(); 
            closeMessage();
        };

        onConfirmCallback.current = () => {
            onConfirm(); 
            closeMessage();
        };

        setMessageState({ message, isOpen: true, iconType: "question" });
    }, []);

    const showIfError = useCallback(({ typeMsg, message }) => {
        if (typeMsg !== 'error') {
            setMessageState({
                message: '',
                isOpen: false,
                iconType: null,
            });
            return false;
        }
        setMessageState({ message, isOpen: true, iconType: typeMsg });
        return typeMsg === 'error';
    }, []);



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

    useEffect(() => {
        const handleShowMessage = ({ message, iconType }) => {
            showMessage(message, iconType);
        };

        eventEmitter.subscribe('show-message', handleShowMessage);

        return () => {
            // No es estrictamente necesario remover el listener en este caso,
            // pero es una buena práctica.
        };
    }, [showMessage]);

    return (
        <MessageContext.Provider
            value={{ showMessage, showSuccess, showError, showWarning, closeMessage, showMsg, showIfError, showQuestion }}
        >
            {children}
            <MessageDialog
                message={messageState.message}
                isOpen={messageState.isOpen}
                onClose={closeMessage}
                iconType={messageState.iconType}
                onCancel={() => onCancelCallback.current()}
                onConfirm={() => onConfirmCallback.current()}
            />
        </MessageContext.Provider>
    );
};

MessageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MessageContext;