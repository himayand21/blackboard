import React from 'react';
import './App.scss';
import {NavBar} from './components/navBar';
import {Main} from './components/main';

const App = () => {
	return (
		<div>
			<NavBar />
			<Main />
		</div>
	)
};

export default App;