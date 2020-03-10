import React from 'react';

export const NavBar = (props) => {
	return (
		<nav className="navbar">
			<header className="header">Blackboard</header>
            <div className="navbar-children">{props.children}</div>
        </nav>
	)
};
