import React, { useEffect, useState } from 'react';
import { Route, useHistory } from "react-router-dom";

import { Welcome } from './pages/welcome';
import Home from './pages/home';
import Loader from './pages/loader';
import Error from './pages/error';

import './styles/App.scss';

const App = (props) => {
	const [appLoading, setAppLoading] = useState(true);
	const history = useHistory();
	const {
		getCurrentUser,
		user,
		token,
		currentError
	} = props;

	useEffect(() => {
		if (currentError) {
			setAppLoading(false);
			history.push('/error');
		}
	}, [currentError]);

	useEffect(() => {
		const token = localStorage.getItem('blackboard-token');
		if (!token) {
			setAppLoading(false);
			history.push("/welcome");
		} else {
			getCurrentUser(token);
		}
	}, []);

	useEffect(() => {
		if (user) {
			setAppLoading(false);
			localStorage.setItem('blackboard-token', token);
			history.push("/home");
		} else {
			history.push('/welcome');
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
			<Route path="/home">
				<Home withAuthProps={props} />
			</Route>
			<Route path="/error">
				<Error />
			</Route>
		</div>
	)
}

export default App;