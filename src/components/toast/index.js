import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';

import {Container} from './Container';

const ToastContext = React.createContext(null);

const ToastProvider = ({children}) => {
    const [toast, setToast] = useState(null);
    const [show, setShow] = useState(false);

    const removeToast = () => {
        setShow(false);
        setTimeout(() => {
            setToast(null);
        }, 300);
    };

    const addToast = (content) => {
        setToast(content);
        setShow(true);
    };

    return (
        <ToastContext.Provider value={{addToast, removeToast}}>
            {toast ?
                <Container
                    toast={toast}
                    show={show}
                    removeToast={removeToast}
                /> : null}
            {children}
        </ToastContext.Provider>
    );
};

ToastProvider.propTypes = {
    children: PropTypes.node
};

const useToast = () => {
    const toastHelpers = useContext(ToastContext);
    return toastHelpers;
};

export {ToastContext, useToast};
export default ToastProvider;
