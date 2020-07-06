import React from 'react';
import PropTypes from 'prop-types';

export const Toggle = (props) => {
    const {
        handleChange,
        checked,
        disabled
    } = props;

    return (
        <label>
            <span className={`switch ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}/>
            <div onClick={handleChange}>
                <div />
            </div>
        </label>
    );
};

Toggle.propTypes = {
    checked: PropTypes.bool,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool
};
