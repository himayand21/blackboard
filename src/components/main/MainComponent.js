import React, {Fragment, useState, useEffect} from 'react';
import {Board} from '../board';
import {Modal} from '../modal';
import {BoardTile} from './BoardTile';

export const MainComponent = (props) => {
    const [selectedBoard, setSelectedBoard] = useState(0);
	const {boards, showAddBoard} = props;

    return (
        <Fragment>
            <main className="boards-wrapper">
                <header className="board-tile-header">
                    My Boards
                </header>
                <section className="board-tiles-wrapper">
                    {boards.map((board, index) => (
                        <BoardTile
                            key={`board-${board.id}`}
                            tileIndex={index}
                            board={board}
                            selectedBoard={selectedBoard}
                            setSelectedBoard={setSelectedBoard}
                        />
                    ))}
                    <div
                        className="board-tile board-tile-last"
                        onClick={showAddBoard}
                    >
                        Add New Board
                    </div>
                </section>
                
                {boards.length && boards[selectedBoard] ?
                    <Board board={boards[selectedBoard]} /> :
                null}
            </main>
            <Modal />
        </Fragment>
	)
};