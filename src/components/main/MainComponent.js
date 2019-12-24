import React, {Fragment} from 'react';
import {Board} from '../board';
import {Modal} from '../modal';

export const MainComponent = (props) => {
	const {boards} = props;
	return (
        <Fragment>
            <main className="boards-wrapper">
                {boards.map(board => (
                    <Board board={board} />
                ))}
            </main>
            <Modal />
        </Fragment>
	)
};