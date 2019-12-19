import React from 'react';

export const NavBarComponent = (props) => {
	const {name} = props;
	return (
		<nav>
            {`Hi ${name}`}
        </nav>
	)
};
