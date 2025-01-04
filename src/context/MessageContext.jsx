import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const MessageContext = createContext();

// Proveedor del contexto
export const MessageProvider = ({ children }) => {
    const [messageDialog, setMessageDialog] = useState('');
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [iconTypeDialog, setIconTypeDialog] = useState(null);
    const [onCloseDialog, setOnCloseDialog] = useState(() => {});

    // Métodos para mostrar los mensajes
    const show = (msgData) => {
        setMessageDialog(msgData.message);
        setIconTypeDialog(msgData.typeMsg);
        setIsOpenDialog(true);
    };

    const showWarning = (msg) => {
        setMessageDialog(msg);
        setIconTypeDialog('warning');
        setIsOpenDialog(true);
    };

    const showSuccess = (msg) => {
        setMessageDialog(msg);
        setIconTypeDialog('success');
        setIsOpenDialog(true);
    };

    const showError = (msg) => {
        setMessageDialog(msg);
        setIconTypeDialog('error');
        setIsOpenDialog(true);
    };

    const showIfError = (msgData) => {
        if (msgData.typeMsg === 'error') {
            showError(msgData.message);
            return true;
        }
        return false;
    };

    const showIfErrorOrWarning = (msgData) => {
        if (msgData.typeMsg === 'error') {
            showError(msgData.message);
            return true;
        }
        if (msgData.typeMsg === 'warning') {
            showWarning(msgData.message);
            return true;
        }
        return false;
    };

    return (
        <MessageContext.Provider
            value={{
                messageDialog,
                isOpenDialog,
                iconTypeDialog,
                onCloseDialog,
                setMessageDialog,
                setIconTypeDialog,
                setIsOpenDialog,
                setOnCloseDialog,
                show,
                showWarning,
                showSuccess,
                showError,
                showIfError,
                showIfErrorOrWarning,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;