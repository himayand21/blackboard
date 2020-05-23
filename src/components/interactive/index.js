import React from 'react';
import PropTypes from 'prop-types';

export const Interactive = (props) => {
    const {
        className,
        count,
        onClick,
        title
    } = props;
    return (
        <div
            className="standard-interactive"
            onClick={onClick}
            title={title}
        >
            <i className={className} />
            {count ? (
                <span className="standard-interactive-badge">
                    {count}
                </span>
            ) : null}
        </div>
    );
};

Interactive.propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    onClick: PropTypes.func,
    title: PropTypes.string
};