import React, {useEffect, useState} from 'react';
import {Route, useHistory, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Welcome} from './pages/welcome';
import Home from './pages/home';
import Loader from './pages/loader';
import Error from './pages/error';
import ToastProvider from './components/toast';

import {
    WELCOME,
    DASHBOARD,
    ERROR,
    AUTH_TOKEN,
    REDIRECT_TOKEN
} from './constants';

import './styles/App.scss';

const Routes = (props) => {
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
            history.push(ERROR);
        }
    }, [currentError]);

    useEffect(() => {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        if (!authToken) {
            setAppLoading(false);
            history.push(WELCOME);
        } else {
            getCurrentUser(authToken);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setAppLoading(false);
            localStorage.setItem(AUTH_TOKEN, token);
            const redirectPath = sessionStorage.getItem(REDIRECT_TOKEN);
            if (redirectPath) {
                history.push(redirectPath);
            } else {
                history.push(DASHBOARD);
            }
        } else {
            history.push(WELCOME);
        }
    }, [user]);

    if (appLoading) {
        return (
            <Loader />
        );
    }

    return (
        <ToastProvider>
            <Switch>
                <Route path={WELCOME} >
                    <Welcome withAuthProps={props} />
                </Route>
                <Route path={DASHBOARD}>
                    <Home withAuthProps={props} />
                </Route>
                <Route path={ERROR}>
                    <Error />
                </Route>
            </Switch>
        </ToastProvider>
    );
};

Routes.propTypes = {
    getCurrentUser: PropTypes.func,
    user: PropTypes.object,
    token: PropTypes.string,
    currentError: PropTypes.object
};

export default Routes;