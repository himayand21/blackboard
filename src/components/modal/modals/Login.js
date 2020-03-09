import React, {useState} from "react";
import { SIGNUP_MODAL } from '../../../constants/modalTypes';
import { SHOW_MODAL } from "../../../constants/actionTypes";

export const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {withAuthProps, dispatch} = props;
	const {login, error, loading} = withAuthProps;

	const handleLogin = () => {
		login({email, password});
	}

	const toggleToSignup = () => {
		dispatch({
			type: SHOW_MODAL,
			childKey: SIGNUP_MODAL
		});
	}

	return [
		<section className="modal-content" key="modal-content">
			<div className="modal-content-header">Welcome Back !</div>
			<div className="modal-content-subheader">Please login to your account.</div>
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
				<span>Need an account?</span>
				<span className="modal-footer-link" onClick={toggleToSignup}>Sign Up</span>
			</div>
			<button className="standard-button" onClick={handleLogin}>Sign In</button>
		</footer>
	];
};
