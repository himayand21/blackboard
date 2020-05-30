import React, {useState} from 'react';
import Routes from './Routes';

import {
    loginAPI,
    logoutAPI,
    signupAPI,
    currentUserAPI,
    verifyOtpAPI,
    forgotPasswordAPI
} from './api';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/App.scss';

const initialErrors = {
    currentError: null,
    loginError: null,
    signupError: null,
    logoutError: null
};
const initialState = {
    user: null,
    token: null,
    loading: false,
    otpScreenVisible: false,
    ...initialErrors
};

const App = () => {
    const [state, setState] = useState(initialState);
    const signup = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user, token} = await signupAPI(body);
            setState({
                ...initialState,
                user,
                token
            });
        } catch (error) {
            setState({
                ...state,
                ...initialErrors,
                signupError: error
            });
        }
    };

    const hideOTPScreen = () => setState({
        ...state,
        otpScreenVisible: false
    });

    const forgotPassword = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            await forgotPasswordAPI(body);
            setState({
                ...state,
                loading: false,
                otpScreenVisible: true
            });
        } catch (error) {
            setState({
                ...state,
                ...initialErrors,
                loginError: error
            });
        }
    };

    const verifyOtp = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user, token} = await verifyOtpAPI(body);
            setState({
                ...initialState,
                user,
                token
            });
        } catch (error) {
            setState({
                ...state,
                ...initialErrors,
                loginError: error
            });
        }
    };

    const login = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user, token} = await loginAPI(body);
            setState({
                ...initialState,
                user,
                token
            });
        } catch (error) {
            setState({
                ...state,
                ...initialErrors,
                loginError: error
            });
        }
    };

    const logout = async (token, allDeviceFlag) => {
        try {
            setState({
                ...state,
                loading: true
            });
            await logoutAPI(token, allDeviceFlag);
            setState(initialState);
        } catch (error) {
            setState({
                ...state,
                ...initialErrors,
                logoutError: error
            });
        }
    };

    const getCurrentUser = async (token) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const user = await currentUserAPI(token);
            setState({
                ...initialState,
                user,
                token
            });
        } catch (error) {
            setState({
                ...state,
                ...initialErrors,
                currentError: error
            });
        }
    };

    return (
        <Routes
            {...state}
            getCurrentUser={getCurrentUser}
            logout={logout}
            login={login}
            signup={signup}
            forgotPassword={forgotPassword}
            verifyOtp={verifyOtp}
            hideOTPScreen={hideOTPScreen}
        />
    );
};

export default App;