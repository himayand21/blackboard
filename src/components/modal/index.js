import React from 'react';
import PropTypes from 'prop-types';

export const Modal = (props) => {
    const {show, hideModal, children} = props;
    if (!show) return null;

    const outsideClick = (event) => {
        if (event.target === event.currentTarget) {
            hideModal();
        }
    };

    return (
        <main className="modal-wrapper" onClick={outsideClick}>
            <div className="modal-section animate-1">
                <header className="modal-header">
                    <button onClick={hideModal} className="close-button">
                        <i className="fa fa-times" />
                    </button>
                </header>
                {children}
            </div>
        </main>
    );
};

Modal.propTypes = {
    show: PropTypes.bool,
    hideModal: PropTypes.func,
    children: PropTypes.node
};