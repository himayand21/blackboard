import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './store';
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';

ReactDOM.render(
	<StoreProvider>
		<Router>
			<App />
		</Router>
	</StoreProvider>,
	document.getElementById('root')
);