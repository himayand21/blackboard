import React from 'react';
import {List} from '../list';

export const BoardComponent = (props) => {
    const {lists, board} = props;
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
            </header>
            <div className="lists-wrapper">
                {boardLists.map(list => <List list={list} />)}
            </div>
        </section>
	)
};