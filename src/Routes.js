import React, {useEffect, useState} from 'react';
import {Route, useHistory, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Welcome} from './pages/welcome';
import Home from './pages/home';
import Loader from './pages/loader';
import Error from './pages/error';
import VerifyOTP from './pages/welcome/VerifyOTP';

import {
    WELCOME,
    DASHBOARD,
    ERROR,
    REDIRECT_TOKEN,
    VERIFY
} from './constants';

import './styles/App.scss';

const Routes = (props) => {
    const [appLoading, setAppLoading] = useState(true);
    const history = useHistory();
    const {
        getCurrentUser,
        user,
        currentError
    } = props;

    useEffect(() => {
        if (currentError) {
            setAppLoading(false);
            if (user) {
                history.push(ERROR);
            } else {
                history.push(WELCOME);
            }
        }
    }, [currentError]);

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        if (user) {
            setAppLoading(false);
            if (!user.verified) history.push(VERIFY);
            else {
                const redirectPath = sessionStorage.getItem(REDIRECT_TOKEN);
                if (redirectPath) {
                    history.push(redirectPath);
                } else {
                    history.push(DASHBOARD);
                }
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
        <Switch>
            <Route path={WELCOME} >
                <Welcome withAuthProps={props} />
            </Route>
            <Route path={DASHBOARD}>
                <Home withAuthProps={props} />
            </Route>
            <Route path={VERIFY}>
                <VerifyOTP withAuthProps={props} />
            </Route>
            <Route path={ERROR}>
                <Error withAuthProps={props} />
            </Route>
        </Switch>
    );
};

Routes.propTypes = {
    getCurrentUser: PropTypes.func,
    user: PropTypes.object,
    token: PropTypes.string,
    currentError: PropTypes.bool
};

export default Routes;