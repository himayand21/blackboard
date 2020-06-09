import React from 'react';
import PropTypes from 'prop-types';

export const NavBar = (props) => {
    const {onTitleClick} = props;
    return (
        <nav className="navbar-container">
            <div className="navbar">
                <header className="header">
                    <span onClick={onTitleClick ? onTitleClick : () => {}} role="link">
                        Blackboard
                    </span>
                </header>
                <div className="navbar-children">{props.children}</div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    children: PropTypes.node,
    onTitleClick: PropTypes.func
};
