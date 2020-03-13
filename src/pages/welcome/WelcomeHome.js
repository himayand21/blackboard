import React from "react";

export const WelcomeHome = props => {
	const {homeScreenActive, showSignup} = props;
	return (
		<section className="welcome-content">
			<article className={`welcome-article article ${homeScreenActive ? 'arriving': 'departing'}`}>
				<div className="welcome-header-section">
					<div className="welcome-header animate-1">
						Blackboard helps you Organise and Prioritise.
          			</div>
					<div className="welcome-subheader animate-2">
						So that you get more work done in less time.
         			</div>
					<div className="welcome-button-row animate-3">
						<button
							className="standard-button"
							onClick={showSignup}
						>
							Join Now
            			</button>
					</div>
				</div>
			</article>
		</section>
	);
};
