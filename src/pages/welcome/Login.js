import React, { useState } from "react";

export const Login = props => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { withAuthProps, showSignup, loginActive } = props;
	const { login, error, loading } = withAuthProps;

	const handleLogin = () => {
		login({ email, password });
	};

	return (
		<section
			className="login-content"
		>
			<article
				className={`login-article article ${loginActive ? "arriving" : "departing"}`}
			>
				<div className="login-modal animate-1">
					<div className="login-header">Welcome Back !</div>
					<div className="login-subheader">Please login to your account.</div>
					<div className="login-form">
						<div className="form-row">
							<div className="form-label">EMAIL</div>
							<input
								autoFocus
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-row">
							<div className="form-label">PASSWORD</div>
							<input
								value={password}
								onChange={e => setPassword(e.target.value)}
								type="password"
							/>
						</div>
						<div className="form-error-row">{!loading && error ? error.message : null}</div>
					</div>
					<footer className="login-footer">
						<div className="login-footer-link-wrapper">
							<span>Need an account?</span>
							<span
								className="login-footer-link"
								onClick={showSignup}
							>
								Sign Up
            				</span>
						</div>
						<button className="standard-button" onClick={handleLogin}>
							Sign In
          			</button>
					</footer>
				</div>
			</article>
		</section>
	);
};
