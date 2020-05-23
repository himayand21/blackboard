import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Popup = (props) => {
    const {show, hidePopup, position, children} = props;

    if (!show) return null;

    const outsideClick = (event) => {
        if (event.target === event.currentTarget) {
            hidePopup();
        }
    };

    return ReactDOM.createPortal(
        <div className="popup-wrapper" onClick={outsideClick}>
            <div className="popup-modal" style={{...position}}>
                {children}
            </div>
        </div>,
        document.getElementById('popup-root')
    );
};

Popup.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    hidePopup: PropTypes.func,
    position: PropTypes.object
};
