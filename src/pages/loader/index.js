import React, { useState, useEffect } from "react";
import { Background } from "../../components/background";
import "./loader.scss";

const Loader = () => {
	const [dotCount, setDotCount] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setDotCount(dotCount => {
				if (dotCount.length === 3) return "";
				else return dotCount + ".";
			});
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="screen-loader">
			<Background />
			<div className="loading-section">
				<div className="loading-text">{`Loading ${dotCount}`}</div>
			</div>
		</div>
	);
};

export default Loader;
