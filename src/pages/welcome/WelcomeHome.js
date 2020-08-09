import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Modal} from '../../components/modal';
import {Tour} from '../tour';

export const WelcomeHome = (props) => {
    const [show, setShow] = useState(false);
    const {homeScreenActive, showSignup} = props;

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    if (homeScreenActive) {
        return (
            <section className="welcome-content">
                <article className="welcome-article article">
                    <div className="welcome-header-section">
                        <div className="welcome-header animate-1">
                            Blackboard helps you Organise and Prioritise.
                        </div>
                        <div className="welcome-subheader animate-2">
                            So that you get more work done in less time.
                        </div>
                        <div className="welcome-subheader welcome-tour-header animate-3">
                            Not convinced yet? Take a
                            <span onClick={showModal}>
                                quick tour.
                            </span>
                        </div>
                        <div className="welcome-button-row animate-4">
                            <button
                                className="standard-button"
                                onClick={showSignup}
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </article>
                {show ? (
                    <Modal
                        show={show}
                        hideModal={hideModal}
                    >
                        <Tour />
                    </Modal>
                ) : null}
            </section>
        );
    }
    return null;
};

WelcomeHome.propTypes = {
    withAuthProps: PropTypes.object,
    showSignup: PropTypes.func,
    homeScreenActive: PropTypes.bool
};