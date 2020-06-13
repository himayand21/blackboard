import React, {useState} from 'react';
import Routes from './Routes';

import {
    loginAPI,
    logoutAPI,
    signupAPI,
    currentUserAPI,
    verifyOtpAPI,
    sendOtpAPI,
    forgotPasswordAPI
} from './api';
import {useToast} from './components/toast';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/App.scss';

const initialState = {
    user: null,
    loading: false
};

const App = () => {
    const [state, setState] = useState(initialState);
    const [enterOTPVisible, setEnterOTPVisible] = useState(false);
    const [currentError, setCurrentError] = useState(false);

    const {addToast} = useToast();

    const clearState = () => setState(initialState);

    const signup = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user} = await signupAPI(body);
            setState({
                ...state,
                user,
                loading: false
            });
        } catch (error) {
            setState({
                ...state,
                user: null,
                loading: false
            });
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const sendOTP = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user} = await sendOtpAPI(body);
            setState({
                ...state,
                loading: false,
                user
            });
            setEnterOTPVisible(true);
        } catch (error) {
            setState({
                ...state,
                loading: false
            });
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const verifyOTP = async (body) => {
        try {
            setState({
                ...state,
                laoding: true
            });
            const {user} = await verifyOtpAPI(body);
            setState({
                user,
                loading: false
            });
            setEnterOTPVisible(true);
        } catch (error) {
            setState({
                ...state,
                loading: false
            });
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const login = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user} = await loginAPI(body);
            setState({
                ...initialState,
                user
            });
        } catch (error) {
            setState({
                ...state,
                loading: false
            });
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const logout = async (allDeviceFlag) => {
        try {
            setState({
                ...state,
                loading: true
            });
            await logoutAPI(allDeviceFlag);
            setState(initialState);
        } catch (error) {
            setState({
                ...state,
                loading: false
            });
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const getCurrentUser = async () => {
        try {
            setState({
                ...state,
                loading: true
            });
            const user = await currentUserAPI();
            setState({
                ...initialState,
                user
            });
        } catch (error) {
            setState({
                ...state,
                loading: false
            });
            setCurrentError(true);
            if (state.user) {
                addToast({
                    type: 'error',
                    message: error.message
                });
            }
        }
    };

    const forgotPassword = async (body) => {
        try {
            setState({
                ...state,
                loading: true
            });
            const {user} = await forgotPasswordAPI(body);
            setState({
                ...state,
                loading: false,
                user
            });
            setEnterOTPVisible(true);
        } catch (error) {
            setState({
                ...state,
                loading: false
            });
            addToast({
                type: 'error',
                message: error.message
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
            sendOTP={sendOTP}
            verifyOTP={verifyOTP}
            forgotPassword={forgotPassword}
            enterOTPVisible={enterOTPVisible}
            setEnterOTPVisible={setEnterOTPVisible}
            clearState={clearState}
            currentError={currentError}
        />
    );
};

export default App;