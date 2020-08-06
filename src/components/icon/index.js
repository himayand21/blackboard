import React from 'react';
import PropTypes from 'prop-types';
import {colors} from '../../constants';

export const Icon = (props) => {
    const {name} = props;
    const letter = name[0].toLowerCase();
    const color = colors[letter] ? colors[letter] : 'lightgray';
    return (
        <div
            className="profile-icon"
            style={{backgroundColor: color}}
        >
            <span className="profile-letter">
                {letter}
            </span>
        </div>
    );
};

Icon.propTypes = {
    name: PropTypes.string
};