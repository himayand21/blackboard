import React from "react";

export const BoardTile = (props) => {
    const {
        board,
        setSelectedBoard,
        selectedBoard,
        tileIndex
    } = props;
    return (
        <div
            className={`${selectedBoard === tileIndex ? 'board-tile-current ': ''}board-tile`}
            onClick={() => setSelectedBoard(tileIndex)}
        >
            <div className="board-tile-name">
                {board.name}
            </div>
        </div>
    )
}