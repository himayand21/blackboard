import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Loader} from '../../components/loader';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [otp, setOtp] = useState('');

    const {withAuthProps, showSignup, loginActive} = props;
    const {
        login,
        loginError: error,
        loading,
        forgotPassword,
        verifyOtp,
        otpScreenVisible
    } = withAuthProps;

    const handleLogin = () => login({email, password});
    const handleForgotPassword = () => forgotPassword(email);
    const handleVerifyOTP = () => verifyOtp({email, otp});

    const showForgotPassword = () => setForgotPasswordVisible(true);
    const hideForgotPassword = () => {
        if (!loading) setForgotPasswordVisible(false);
    };

    if (loginActive) {
        if (otpScreenVisible) {
            return (
                <section className="login-content">
                    <article className="login-article article">
                        <div className="login-modal animate-1">
                            <div className="login-header">Verify OTP</div>
                            <div className="login-subheader">{`Please enter the 6-digit OTP sent to ${email}.`}</div>
                            <div className="login-form">
                                <div className="form-row">
                                    <div className="form-label">OTP</div>
                                    <input
                                        autoFocus
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <div className="form-error-row">{!loading && error ? error.message : null}</div>
                            </div>
                            <footer className="login-footer">
                                <div className="login-footer-link-wrapper" />
                                <button className="standard-button" onClick={handleVerifyOTP}>
                                    {loading ? <Loader /> : 'Sign In'}
                                </button>
                            </footer>
                        </div>
                    </article>
                </section>
            );
        }
        return (
            <section className="login-content">
                <article className="login-article article">
                    <div className="login-modal animate-1">
                        <div className="login-header">Welcome Back !</div>
                        <div className="login-subheader">{forgotPasswordVisible ? 'Please enter your registered email ID.' : 'Please login to your account.'}</div>
                        <div className="login-form">
                            <div className="form-row">
                                <div className="form-label">EMAIL</div>
                                <input
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {!forgotPasswordVisible ? (
                                <div className="form-row">
                                    <div className="form-label">PASSWORD</div>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                    />
                                    <div className="form-forgot-password">
                                        <span
                                            className="standard-block-link"
                                            onClick={showForgotPassword}
                                        >
                                            Forgot password? Login with OTP.
                                        </span>
                                    </div>
                                </div>
                            ) : null}
                            <div className="form-error-row">{!loading && error ? error.message : null}</div>
                        </div>
                        {forgotPasswordVisible ? (
                            <footer className="login-footer">
                                <div className="login-footer-link-wrapper">
                                    <span>Oh, I remembered it !</span>
                                    <span
                                        className="login-footer-link"
                                        onClick={hideForgotPassword}
                                    >
                                        Go Back
                                    </span>
                                </div>
                                <button className="standard-button" onClick={handleForgotPassword}>
                                    {loading ? <Loader /> : 'Send OTP'}
                                </button>
                            </footer>
                        ) : (
                            <footer className="login-footer">
                                <div className="login-footer-link-wrapper">
                                    <span>Need an account?</span>
                                    <span
                                        className="login-footer-link"
                                        onClick={showSignup}
                                    >
                                        Sign Up
                                    </span>
                                </div>
                                <button className="standard-button" onClick={handleLogin}>
                                    {loading ? <Loader /> : 'Sign In'}
                                </button>
                            </footer>
                        )}
                    </div>
                </article>
            </section>
        );
    }
    return null;
};

Login.propTypes = {
    withAuthProps: PropTypes.object,
    showSignup: PropTypes.func,
    loginActive: PropTypes.bool
};