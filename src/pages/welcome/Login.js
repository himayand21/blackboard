import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

import {Loader} from '../../components/loader';
import {VERIFY} from '../../constants';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const {withAuthProps, showSignup, loginActive} = props;
    const {
        login,
        loading,
    } = withAuthProps;

    const handleLogin = () => login({email, password});

    const switchToVerify = () => history.push(VERIFY);

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleLogin();
        }
    };

    if (loginActive) {
        return (
            <section className="login-content">
                <article className="login-article article">
                    <div className="login-modal animate-1">
                        <div className="login-header">Welcome Back !</div>
                        <div className="login-subheader">Please login to your account.</div>
                        <div className="login-form">
                            <div className="form-row">
                                <div className="form-label">EMAIL</div>
                                <input
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleEnter}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-label">PASSWORD</div>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    onKeyDown={handleEnter}
                                />
                                <div className="form-forgot-password">
                                    <span
                                        className="standard-block-link"
                                        onClick={switchToVerify}
                                    >
                                        Forgot password? Login with OTP.
                                    </span>
                                </div>
                            </div>
                            <div className="form-error-row" />
                        </div>
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
                            <button
                                className="standard-button"
                                onClick={handleLogin}
                            >
                                {loading ? <Loader /> : 'Sign In'}
                            </button>
                        </footer>
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