import React, { useState, useEffect } from "react";

import { Loader } from "../../components/loader";

export const NameForm = props => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const addUser = () => {
		setLoading(true);
		props.addUser(name);
	}

	useEffect(() => () => setLoading(false), []);

	return (
		<section
			className="login-content"
		>
			<article
				className="login-article article arriving"
			>
				<div className="login-modal">
					<div className="login-header">Tell us who you are !</div>
					<div className="login-subheader">Email ids are too mouthful</div>
					<div className="login-form">
						<div className="form-row">
							<div className="form-label">NAME</div>
							<input
								autoFocus
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="form-error-row" />
					</div>
					<footer className="login-footer">
						<span />
						<button
							className="standard-button"
							onClick={addUser}
							disabled={!name}
						>
							{loading ? <Loader /> : "Confirm"}
						</button>
					</footer>
				</div>
			</article>
		</section>
	);
};
