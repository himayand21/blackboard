import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NavBar} from '../../components/navBar';
import {Background} from '../../components/background';
import {Footer} from '../../components/footer';
import {WelcomeHome} from './WelcomeHome';
import {Login} from './Login';
import {Signup} from './Signup';

export const Welcome = (props) => {

    const [signupActive, setSignupActive] = useState(false);
    const [loginActive, setLoginActive] = useState(false);

    const homeScreenActive = !(signupActive || loginActive);

    const showSignup = () => {
        setLoginActive(false);
        setSignupActive(true);
    };

    const showLogin = () => {
        setLoginActive(true);
        setSignupActive(false);
    };

    const showHome = () => {
        setLoginActive(false);
        setSignupActive(false);
    };

    const {withAuthProps} = props;

    return (
        <div className="welcome-screen">
            <Background />
            <main className="welcome-main absolute">
                <NavBar>
                    {homeScreenActive ?
                        <button
                            className="standard-button"
                            onClick={showLogin}
                        >
                        Sign In
                        </button> :
                        <button
                            className="standard-button"
                            onClick={showHome}
                        >
                        Back
                        </button>}
                </NavBar>
                <WelcomeHome
                    homeScreenActive={homeScreenActive}
                    showSignup={showSignup}
                />
                <Login
                    withAuthProps={withAuthProps}
                    loginActive={loginActive}
                    showSignup={showSignup}
                />
                <Signup
                    withAuthProps={withAuthProps}
                    signupActive={signupActive}
                    showLogin={showLogin}
                />
                <Footer />
            </main>
        </div>
    );
};

Welcome.propTypes = {
    withAuthProps: PropTypes.object
};