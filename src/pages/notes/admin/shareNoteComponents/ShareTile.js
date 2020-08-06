import React from 'react';
import PropTypes from 'prop-types';

export const ShareTile = (props) => {
    const {
        handleClick,
        iconClassName,
        title,
        disabled
    } = props;
    return (
        <div
            className={`share-tile ${disabled ? 'disabled-tile' : ''}`}
            onClick={disabled ? (() => {}) : handleClick}
        >
            <i className={iconClassName} />
            <div className="share-tile-title">
                {title}
            </div>
        </div>
    );
};

ShareTile.propTypes = {
    handleClick: PropTypes.func,
    iconClassName: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool
};