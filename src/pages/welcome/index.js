import React, { useContext } from "react";
import { NavBar } from "../../components/navBar";
import { Background } from "../../components/background";
import { SHOW_MODAL } from "../../constants/actionTypes";
import {
    LOGIN_MODAL,
    SIGNUP_MODAL
} from '../../constants/modalTypes';

import { StateContext } from '../../store';

export const Welcome = (props) => {
    const { state, dispatch } = useContext(StateContext);

    const showSignupModal = () => dispatch({
        type: SHOW_MODAL,
        childKey: SIGNUP_MODAL
    });

    const showLoginModal = () => dispatch({
        type: SHOW_MODAL,
        childKey: LOGIN_MODAL
    });

    return (
        <div className="welcome-screen">
            <Background />
            <main className="welcome-main absolute">
                <NavBar>
                    <button
                        className="standard-button"
                        onClick={showLoginModal}
                    >
                        Sign In
                    </button>
                </NavBar>
                <section className="welcome-content">
                    <article className="welcome-article article">
                        <div className="welcome-header-section">
                            <div className="welcome-header">
                                Blackboard helps you Organise and Prioritise.
                            </div>
                            <div className="welcome-subheader">
                                So that you get more work done in less time.
                            </div>
                            <div className="welcome-button-row">
                                <button
                                    className="standard-button"
                                    onClick={showSignupModal}
                                >
                                    Join Now
                                </button>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};
