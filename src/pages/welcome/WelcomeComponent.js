import React from "react";
import { NavBar } from "../../components/navBar";
import { Background } from "../../components/background";

import "./welcome.scss";

export const WelcomeComponent = (props) => {
	const {
		showSignupModal,
		showLoginModal
	} = props;
	return (
		<div className="welcome-screen">
			<Background />
			<div className="welcome-section">
				<div className="welcome-navbar">
					<NavBar>
						<button
							className="standard-button"
							onClick={showLoginModal}
						>
							Sign In
						</button>
					</NavBar>
				</div>
				<div className="welcome-article">
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
				</div>
			</div>
		</div>
	);
};
