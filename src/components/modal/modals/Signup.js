import React, { useState } from "react";
import { LOGIN_MODAL } from '../../../constants/modalTypes';
import { SHOW_MODAL } from "../../../constants/actionTypes";

export const Signup = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { withAuthProps, dispatch } = props;
	const { signup, error, loading } = withAuthProps;

	const handleSignup = () => {
		signup({ email, password });
	}

	const toggleToLogin = () => {
		dispatch({
			type: SHOW_MODAL,
			childKey: LOGIN_MODAL
		});
	}

	return [
		<section className="modal-content" key="modal-content">
			<div className="modal-content-header">Blackboard</div>
			<div className="modal-content-subheader">Start your journey with us.</div>
			<div className="modal-form">
				<div className="form-row">
					<div className="form-label">
						Email
					</div>
					<input autoFocus value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div className="form-row">
					<div className="form-label">
						Password
					</div>
					<input value={password} onChange={e => setPassword(e.target.value)} type="password" />
				</div>
				{!loading && error ? <div className="form-error-row">{error.message}</div> : null}
			</div>
		</section>,
		<footer className="modal-footer" key="modal-footer">
			<div className="modal-footer-link-wrapper">
				<span>Already have an account?</span>
				<span className="modal-footer-link" onClick={toggleToLogin}>Sign In</span>
			</div>
			<button className="standard-button" onClick={handleSignup}>Sign Up</button>
		</footer>
	];
};
