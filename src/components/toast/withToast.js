/* eslint-disable react/display-name */
import React, {useState} from 'react';

import {Container} from './Container';

export const withToast = (WrappedComponent) => {
    return ((props) => {
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
            <>
                {toast ?
                    <Container
                        toast={toast}
                        show={show}
                        removeToast={removeToast}
                    /> : null}
                <WrappedComponent {...props} addToast={addToast} removeToast={removeToast}/>
            </>
        );
    });
};
