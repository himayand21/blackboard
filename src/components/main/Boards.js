import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { graphql } from 'react-apollo';

import { CreateBoard } from './CreateBoard';

import query from '../../queries/boards';
import mutation from '../../mutations/addBoard';
import { Modal } from "../modal";

const BoardsComponent = (props) => {
	const [show, setShow] = useState(false);
	const [boardName, setBoardName] = useState("");
	const [adding, setAdding] = useState(false);
	const [boardColor, setBoardColor] = useState("grey");
	const [showOptions, setShowOptions] = useState(false);

	const history = useHistory();

	const { data, mutate } = props;
	const { error, loading, boards } = data;

	if (error) {
		history.push("/error");
	}

	if (loading) {
		return (
			<div className="boards-wrapper">
				<div className="loading-section">
					<span className="loading-board-details">
						Almost there ...
					</span>
				</div>
			</div>
		)
	}

	const showCreateBoardModal = () => setShow(true);
	const hideModal = () => setShow(false);

	const toggleShowOptions = () => setShowOptions(!showOptions);

	const addBoard = async () => {
		setAdding(true);
		await mutate({
			variables: {
				user: props.id,
				name: boardName,
				color: boardColor
			},
			refetchQueries: [{
				query,
				variables: { user: props.id }
			}]
		});
		setAdding(false);
		hideModal();
	}

	if (!boards.length) {
		return (
			<>
				<div className="boards-wrapper">
					<div className="boards-header-section">
						<div className="board-header">Looks like, you don't have any boards here.</div>
						<div className="board-subheader">If you are new here, go ahead and <span>take a tour.</span></div>
					</div>
					<div className="boards-button-row">
						<button onClick={showCreateBoardModal}>Create a Board</button>
					</div>
				</div>
				<Modal
					hideModal={hideModal}
					show={show}
				>
					<CreateBoard
						boardName={boardName}
						setBoardName={setBoardName}
						boardColor={boardColor}
						setBoardColor={setBoardColor}
						addBoard={addBoard}
						loading={adding}
					/>
				</Modal>
			</>
		)
	}

	return (
		<>
			<div className="boards-wrapper">
				<div className="boards-container">
					<div className="boards-header-section">
						<div className="board-header">Your Boards</div>
					</div>
					<div className="boards">
						{boards.map((board, index) => {
							const {
								name,
								color,
								lists
							} = board;
							return (
								<div className={`board-box board-box-${color} animate-${index + 1}`}>
									<div className="board-name">{name}</div>
									<div className="board-list-count">
										{lists.length ? `${lists.length} lists.` : "No lists yet."}
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div
					className={`${showOptions ? "with-options" : ""} absolute-button-wrapper`}
				>
					<div
						className="standard-button"
						onClick={toggleShowOptions}
					>
						<i className="fa fa-chevron-left"></i>
					</div>
					{showOptions ?
						<div className="options-wrapper">
							<div onClick={showCreateBoardModal}>
								<i className="fa fa-plus" />
							</div>
							<div onClick={showCreateBoardModal}>
								<i className="fa fa-pencil" />
							</div>
							<div onClick={showCreateBoardModal}>
								<i className="fa fa-ban" />
							</div>
						</div> :
						null
					}
				</div>
			</div>
			<Modal
				hideModal={hideModal}
				show={show}
			>
				<CreateBoard
					boardName={boardName}
					setBoardName={setBoardName}
					boardColor={boardColor}
					setBoardColor={setBoardColor}
					addBoard={addBoard}
					loading={adding}
				/>
			</Modal>
		</>
	)
}

export const Boards = graphql(query, {
	options: (props) => ({
		variables: {
			user: props.id
		}
	})
})(graphql(mutation, {
	options: {
		awaitRefetchQueries: true
	}
})(BoardsComponent));