import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Container} from './Container';

export const Toast = (props) => {
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

    const {content} = props;

    useEffect(() => {
        addToast(content);
    }, []);

    if (!toast) return null;

    return (
        <Container
            toast={toast}
            show={show}
            removeToast={removeToast}
        />
    );
};

Toast.propTypes = {
    content: PropTypes.object,
};