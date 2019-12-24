import React from 'react';
import {List} from '../list';
import {Popup} from '../popup';

export const BoardComponent = (props) => {
    const {
        lists,
        board,
        showAddList,
        removeBoard,
        showEditBoard
    } = props;
    const {
        lists: listIds,
        id: boardId,
        name: boardName
    } = board;
    const boardLists = lists.filter(list => listIds.includes(list.id))
	return (
        <section className="board-wrapper">
            <header className="board-header">
                <div className="board-name">{boardName}</div>
                <Popup>
                    <button onClick={() => showEditBoard(board)}>Edit</button>
                    <button onClick={() => removeBoard({boardId})}>Delete</button>
                </Popup>
            </header>
            <div className="lists-wrapper">
                {boardLists.map(list => (
                    <List
                        key={`list-${list.id}`}
                        list={list}
                    />
                ))}
                <div className="list-wrapper">
                    <button onClick={() => showAddList(boardId)}>Add new List</button>
                </div>
            </div>
        </section>
	)
};