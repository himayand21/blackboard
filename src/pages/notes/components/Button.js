import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
    const onToggle = (e) => {
        e.preventDefault();
        props.onToggle(props.style);
    };
    return (
        <button
            className={`standard-button ${props.active ? 'editor-active' : ''}`}
            onMouseDown={onToggle}
        >
            <i className={props.icon} />
        </button>
    );
};

Button.propTypes = {
    style: PropTypes.string,
    icon: PropTypes.string,
    active: PropTypes.bool,
    onToggle: PropTypes.func
};