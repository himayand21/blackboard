import React, { useEffect, useState } from 'react';
import { withAuth } from 'node-react-auth/client';
import { Route, useHistory } from "react-router-dom";

import {Welcome} from './pages/welcome';
import Home from './pages/home';
import Loader from './pages/loader';

// import {Modal} from './components/modal';

import './styles/App.scss';

const App = (props) => {
	const [appLoading, setAppLoading] = useState(true);
	const history = useHistory();
	const {
		getCurrentUser,
		user
	} = props;

	useEffect(() => {
		(async function() {
			const token = localStorage.getItem('blackboard-token');
			if (!token) {
				setAppLoading(false);
				history.push("/welcome");
			} else {
				getCurrentUser(token);
			}
		})();
	}, []);

	useEffect(() => {
		if (user) {
			setAppLoading(false);
			history.push("/home");
		}
	}, [user]);

	if (appLoading) return (
		<Loader />
	)

	return (
		<div>
			<Route path="/welcome" >
				<Welcome withAuthProps={props} />
			</Route>
			<Route path="/home" component={Home} />
		</div>
	)
}

export default withAuth(App, '/user');