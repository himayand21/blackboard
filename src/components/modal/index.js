import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Modal = (props) => {
    const {show, hideModal, children} = props;
    if (!show) return null;

    const outsideClick = (event) => {
        if (event.target === event.currentTarget) {
            hideModal();
        }
    };

    return ReactDOM.createPortal(
        <main className="modal-wrapper" onClick={outsideClick}>
            <div className="modal-section animate-1">
                <header className="modal-header">
                    <button onClick={hideModal} className="close-button">
                        <i className="fas fa-times" />
                    </button>
                </header>
                {children}
            </div>
        </main>,
        document.getElementById('modal-root')
    );
};

Modal.propTypes = {
    show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    hideModal: PropTypes.func,
    children: PropTypes.node,
};
