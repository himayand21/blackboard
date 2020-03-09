import React, {useContext} from "react";

import { HIDE_MODAL } from "../../constants/actionTypes";
import {
	LOGIN_MODAL,
	SIGNUP_MODAL
} from '../../constants/modalTypes';

import {StateContext} from '../../store';

import {Signup} from './modals/Signup';
import {Login} from './modals/Login';

import './modal.scss';

export const Modal = (props) => {
	const {state, dispatch} = useContext(StateContext);
    const {
        show,
		childKey
    } = state;
    if (!show) return null;

	const hideModal = () => dispatch({
		type: HIDE_MODAL
	});

	const renderChildModal = (childKey) => {
		switch(childKey) {
			case SIGNUP_MODAL: return <Signup {...props} dispatch={dispatch} />
			case LOGIN_MODAL: return <Login {...props} dispatch={dispatch} />
			default: return null
		}
	}

    return (
        <main className="modal-wrapper">
            <div className="modal-section">
                <header className="modal-header">
                    <button onClick={hideModal} className="close-button"><i className="fa fa-times" /></button>
                </header>
				{renderChildModal(childKey)}
                {/* {form ?
                <section className="modal-content">
                    {Object.keys(form).map(elem => (
                        <div
                            key={elem}
                            className="form-row"
                        >
                            <div
                                className="form-label"
                            >
                                {capitaliseFirst(elem)}
                            </div>
                            <input
                                className={formError === elem ? 'error-input' : ''}
                                value={form[elem]}
                                onChange={(e) => handleFormChange(e.target.value, elem)}
                            />
                        </div>
                    ))}
                </section> : null} */}
                {/* <footer className="modal-footer">
                    <button onClick={handleSubmit} className="standard-button">Save</button>
                </footer> */}
            </div>
        </main>
    )
}