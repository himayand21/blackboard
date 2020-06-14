import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Routes from './Routes';
import Loader from './pages/loader';
import {Background} from './components/background';

import {
    loginAPI,
    logoutAPI,
    signupAPI,
    currentUserAPI,
    verifyOtpAPI,
    sendOtpAPI,
    forgotPasswordAPI,
    getCSRFTokenAPI
} from './api';
import {withToast} from './components/toast/withToast';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/App.scss';

const App = (props) => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enterOTPVisible, setEnterOTPVisible] = useState(false);
    const [currentError, setCurrentError] = useState(false);
    const [appLoading, setAppLoading] = useState(true);
    const [appError, setAppError] = useState(false);
    const [csrfToken, setCsrfToken] = useState(null);

    const {addToast} = props;

    useEffect(() => {
        (async function() {
            try {
                setAppLoading(true);
                const {token} = await getCSRFTokenAPI();
                setCsrfToken(token);
                setAppLoading(false);
            } catch (error) {
                setAppLoading(false);
                setAppError(true);
            }
        })();
    }, []);

    const clearState = () => {
        setUser(null);
        setLoading(false);
    };

    const signup = async (body) => {
        try {
            setLoading(true);
            const res = await signupAPI(body);
            setUser(res.user);
            setLoading(false);
        } catch (error) {
            clearState();
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const sendOTP = async (body) => {
        try {
            setLoading(true);
            const res = await sendOtpAPI(body);
            setUser(res.user);
            setLoading(false);
            setEnterOTPVisible(true);
        } catch (error) {
            setLoading(false);
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const verifyOTP = async (body) => {
        try {
            setLoading(true);
            const res = await verifyOtpAPI(body);
            setUser(res.user);
            setLoading(false);
            setEnterOTPVisible(true);
        } catch (error) {
            setLoading(false);
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const login = async (body) => {
        try {
            setLoading(true);
            const res = await loginAPI(body, csrfToken);
            setUser(res.user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const logout = async (allDeviceFlag) => {
        try {
            await logoutAPI(allDeviceFlag, csrfToken);
            clearState();
        } catch (error) {
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    const getCurrentUser = async () => {
        try {
            setLoading(true);
            const res = await currentUserAPI(csrfToken);
            setUser(res.user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setCurrentError(true);
            if (user) {
                addToast({
                    type: 'error',
                    message: error.message
                });
            }
        }
    };

    const forgotPassword = async (body) => {
        try {
            setLoading(true);
            const res = await forgotPasswordAPI(body);
            setUser(res.user);
            setLoading(false);
            setEnterOTPVisible(true);
        } catch (error) {
            setLoading(false);
            addToast({
                type: 'error',
                message: error.message
            });
        }
    };

    if (appError) {
        return (
            <div className="screen-loader">
                <Background />
                <div className="loading-section">
                    <div className="loading-user-details">
                        <div>Sorry !</div>
                        <div className="button-wrapper">
                            <div>
                                We are down for maintenance.
                                <br />
                                We will be back soon.
                            </div>
                            <button
                                className="standard-button"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (appLoading) {
        return (
            <Loader />
        );
    }

    return (
        <Routes
            user={user}
            csrfToken={csrfToken}
            loading={loading}
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

App.propTypes = {
    addToast: PropTypes.func
};

export default withToast(App);