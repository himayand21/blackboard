import React, {useEffect} from 'react';
import { Loader } from "../../components/loader";
import { Pallete } from '../pallete';

export const CreateBoard = (props) => {
	const {
		boardName,
		setBoardName,
		loading,
		boardColor,
		setBoardColor,
		addBoard
	} = props;

	const handleInput = (event) => {
		setBoardName(event.target.value);
	}

	useEffect(() => {
		setBoardName("");
	}, []);

	return (
		<div className="create-board">
			<header className="create-board-header">Create a Board</header>
			<div className="create-board-intro">
				A board is like a collection. For example, if you are planning for a Goa trip - the board title could be
				<span>Trip to Goa.</span>
			</div>
			<div className="create-board-form">
				<div className="form-label">
					TITLE
				</div>
				<input
					type="text"
					value={boardName}
					onChange={handleInput}
				/>
				<div className="form-label">
					COLOR
				</div>
				<Pallete
					selected={boardColor}
					handleChange={setBoardColor}
				/>
				<div className="form-error-row"></div>
			</div>
			<footer className="create-board-footer">
				<button
					className="standard-button"
					disabled={!boardName.length}
					onClick={addBoard}
				>
					{loading ? <Loader /> : "Confirm"}
				</button>
			</footer>
		</div>
	)
}