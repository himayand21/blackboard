import React from 'react';
import './navBar.scss';

export const NavBar = (props) => {
	return (
		<nav className="navbar">
			<div className="brand-name">Blackboard</div>
            <div className="greeting">{props.children}</div>
        </nav>
	)
};
