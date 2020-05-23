import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Loader} from '../../components/loader';

export const NameForm = (props) => {
    const [name, setName] = useState('');

    const {addUser, adding} = props;

    const updateName = (e) => {
        const newName = e.target.value;
        if (newName.length <= 20) setName(newName);
    };

    return (
        <section
            className="login-content"
        >
            <article
                className="login-article article arriving"
            >
                <div className="login-modal">
                    <div className="login-header">Tell us who you are !</div>
                    <div className="login-subheader">{'Can\'t keep calling you '}<span>{props.email}</span>, can I?</div>
                    <div className="login-form">
                        <div className="form-row">
                            <div className="form-label">NAME</div>
                            <input
                                autoFocus
                                value={name}
                                placeholder="Maximum 20 characters"
                                onChange={updateName}
                            />
                        </div>
                        <div className="form-error-row" />
                    </div>
                    <footer className="login-footer">
                        <span />
                        <button
                            className="standard-button"
                            onClick={() => addUser(name)}
                            disabled={!name}
                        >
                            {adding ? <Loader /> : 'Confirm'}
                        </button>
                    </footer>
                </div>
            </article>
        </section>
    );
};

NameForm.propTypes = {
    addUser: PropTypes.func,
    email: PropTypes.string,
    adding: PropTypes.bool
};