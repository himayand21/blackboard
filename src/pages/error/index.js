import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

import {Background} from '../../components/background';

import {
    DASHBOARD,
    AUTH_TOKEN,
    REDIRECT_TOKEN
} from '../../constants';

const Error = (props) => {
    const {currentError} = props;
    const history = useHistory();

    const goToHome = () => {
        sessionStorage.removeItem(REDIRECT_TOKEN);
        history.push(DASHBOARD);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        window.location.reload();
    };

    return (
        <div className="screen-loader">
            <Background />
            <div className="loading-section">
                <div className="loading-user-details">
                    <div>Oh, Snap !</div>
                    {currentError ? (
                        <div className="button-wrapper">
                            <div>
                                We are facing trouble authenticating you.
                                <br />
                                Try logging out and logging in again.
                            </div>
                            <button
                                className="standard-button"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="button-wrapper">
                            <button
                                className="standard-button"
                                onClick={goToHome}
                            >
                                Home
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Error.propTypes = {
    currentError: PropTypes.bool
};

export default Error;
