import React from 'react';
import PropTypes from 'prop-types';

const colors = [
    'grey',
    'red',
    'blue',
    'orange',
    'yellow',
    'violet',
    'brown',
    'pink',
    'cyan',
    'green'
];

export const Pallete = (props) => {
    const {
        selected,
        handleChange
    } = props;
    return (
        <div className="box-container">
            <div className="box-wrapper">
                {colors.map((each) => (
                    <div className="box" key={each}>
                        <span
                            className={`box-${each} ${selected === each ? 'selected-box' : ''}`}
                            onClick={() => handleChange(each)}
                        />
                        {selected === each ?
                            <span className="check-container">
                                <i className="fas fa-check" />
                            </span> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

Pallete.propTypes = {
    selected: PropTypes.string,
    handleChange: PropTypes.func
};