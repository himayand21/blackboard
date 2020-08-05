import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Loader} from '../../components/loader';
import {changePasswordAPI} from '../../api';

export const ChangePassword = (props) => {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [changing, setChanging] = useState(false);
    const [message, setError] = useState(null);

    const {hideModal, csrfToken, addToast} = props;

    const changePassword = async () => {
        setChanging(true);
        setError(null);
        try {
            await changePasswordAPI(passwordOne, csrfToken);
            setChanging(false);
            hideModal();
            addToast({
                type: 'success',
                message: 'Password changed successfully.'
            });
        } catch (error) {
            setError(error.message);
            setChanging(false);
        }
    };

    const samePassword = passwordOne === passwordTwo;

    return (
        <div className="modal-content">
            <header className="modal-content-header">Change Password</header>
            <div className="modal-content-intro">
				You can update your password here.
            </div>
            <div className="modal-form">
                <div className="form-label">
					NEW PASSWORD
                </div>
                <input
                    type="password"
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                />
                <div className="form-label">
					CONFIRM NEW PASSWORD
                </div>
                <input
                    type="password"
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
                />
                <div className="form-error-row">{message}</div>
                <footer className="modal-footer">
                    <button
                        className="standard-button"
                        disabled={!passwordOne || !samePassword}
                        onClick={changePassword}
                    >
                        {changing ? <Loader /> : 'Confirm'}
                    </button>
                    <button
                        className="standard-button"
                        onClick={hideModal}
                    >
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

ChangePassword.propTypes = {
    hideModal: PropTypes.func,
    csrfToken: PropTypes.string,
    addToast: PropTypes.func
};
