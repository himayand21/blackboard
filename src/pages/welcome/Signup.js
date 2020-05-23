import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Loader} from '../../components/loader';

export const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {withAuthProps, showLogin, signupActive} = props;
    const {signup, signupError: error, loading} = withAuthProps;

    const handleSignup = () => {
        signup({email, password});
    };

    if (signupActive) {
        return (
            <section
                className="login-content"
            >
                <article
                    className="login-article article"
                >
                    <div className="login-modal animate-1">
                        <div className="login-header">Hey there !</div>
                        <div className="login-subheader">Start your journey with us right here.</div>
                        <div className="login-form">
                            <div className="form-row">
                                <div className="form-label">EMAIL</div>
                                <input
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-label">PASSWORD</div>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                />
                            </div>
                            <div className="form-error-row">{!loading && error ? error.message : null}</div>
                        </div>
                        <footer className="login-footer">
                            <div className="login-footer-link-wrapper">
                                <span>Already have an account?</span>
                                <span
                                    className="login-footer-link"
                                    onClick={showLogin}
                                >
                                    Log In
                                </span>
                            </div>
                            <button className="standard-button" onClick={handleSignup}>
                                {loading ? <Loader /> : 'Sign Up'}
                            </button>
                        </footer>
                    </div>
                </article>
            </section>
        );
    }
    return null;
};

Signup.propTypes = {
    withAuthProps: PropTypes.object,
    showLogin: PropTypes.func,
    signupActive: PropTypes.bool
};