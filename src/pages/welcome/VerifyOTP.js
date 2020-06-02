import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {NavBar} from '../../components/navBar';
import {Footer} from '../../components/footer';
import {Loader} from '../../components/loader';
import {WELCOME} from '../../constants';
import {Background} from '../../components/background';
import {useToast} from '../../components/toast';

import {resendOtpAPI} from '../../api/resendOTP';

const VerifyOTP = (props) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const history = useHistory();
    const addToast = useToast();

    const {withAuthProps} = props;

    const {
        sendOTP,
        verifyOTP,
        forgotPassword,
        user,
        enterOTPVisible,
        loading,
        setEnterOTPVisible
    } = withAuthProps;

    useEffect(() => {
        setEnterOTPVisible(false);
    }, []);

    useEffect(() => {
        if (user?.email) setEmail(user.email);
    }, [user]);

    const handleVerifyOTP = () => {
        verifyOTP({
            id: user.id,
            otp
        });
    };

    const requestOTP = async () => {
        if (user) {
            await sendOTP(user.id);
        } else {
            await forgotPassword(email);
        }
    };

    const resendOTP = async () => {
        try {
            if (user) {
                await resendOtpAPI({
                    id: user.id
                });
            } else {
                await resendOtpAPI({
                    email
                });
            }
            addToast('success', 'OTP has been resent !');
        } catch (error) {
            addToast('error', error.message);
        }
    };

    const showHome = () => history.push(WELCOME);

    const updateEmail = (event) => {
        if (!user) setEmail(event.target.value);
    };

    return (
        <div className="welcome-screen">
            <Background />
            <main className="welcome-main absolute">
                <NavBar>
                    <button
                        className="standard-button"
                        onClick={showHome}
                    >
                        <i className="fas fa-arrow-left" />
                    </button>
                </NavBar>
                {enterOTPVisible ? (
                    <section className="login-content">
                        <article className="login-article article">
                            <div className="login-modal animate-1">
                                <div className="login-header">Verify OTP</div>
                                <div className="login-subheader">Please enter the 6-digit OTP sent to <span className="login-email">{email}</span>.</div>
                                <div className="login-form">
                                    <div className="form-row">
                                        <div className="form-label">OTP</div>
                                        <input
                                            autoFocus
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-error-row" />
                                </div>
                                <footer className="login-footer">
                                    <div className="login-footer-link-wrapper">
                                        <span>{'Didn\'t receive it yet?'}</span>
                                        <span
                                            className="login-footer-link"
                                            onClick={resendOTP}
                                        >
                                            Resend
                                        </span>
                                    </div>
                                    <button className="standard-button" onClick={handleVerifyOTP}>
                                        {loading ? <Loader /> : 'Verify'}
                                    </button>
                                </footer>
                            </div>
                        </article>
                    </section>
                ) : (
                    <section className="login-content">
                        <article className="login-article article">
                            <div className="login-modal animate-1">
                                <div className="login-header">Verify your Email Address</div>
                                <div className="login-subheader">{`Please confirm to request an OTP to your registered email address.`}</div>
                                <div className="login-form">
                                    <div className="form-row">
                                        <div className="form-label">EMAIL</div>
                                        <input
                                            value={email}
                                            readOnly={Boolean(user)}
                                            onChange={updateEmail}
                                        />
                                    </div>
                                    <div className="form-error-row" />
                                </div>
                                <footer className="login-footer">
                                    <div className="login-footer-link-wrapper" />
                                    <button className="standard-button" onClick={requestOTP}>
                                        {loading ? <Loader /> : 'Confirm'}
                                    </button>
                                </footer>
                            </div>
                        </article>
                    </section>
                )}
                <Footer />
            </main>
        </div>
    );
};

VerifyOTP.propTypes = {
    withAuthProps: PropTypes.object
};

export default VerifyOTP;