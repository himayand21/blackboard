import React from 'react';

import blackboard from '../../assets/blackboard.jpg';
import './background.scss';

export const Background = () => {
	return (
		<img src={blackboard} className="background-image" />
	)
}
