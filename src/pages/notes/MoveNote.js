import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';

import {
    REDIRECT_TOKEN,
    BOARDS,
    NOTES
} from '../../constants';

import query from '../../queries/boards';
import mutation from '../../mutations/moveNote';

import {SwitchBoard} from './components/SwitchBoard';

export const MoveNote = (props) => {
    const {note, hideModal} = props;

    const history = useHistory();
    const [mutate, {loading: moving}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const handleConfirm = async (selectedBoard) => {
        await mutate({
            variables: {
                id: note.id,
                board: selectedBoard
            },
            refetchQueries: [{
                query,
                variables: {user: note.owner}
            }]
        });
        const newRoute = `${BOARDS}/${selectedBoard}${NOTES}/${note.id}`;
        hideModal();
        history.push(newRoute);
        sessionStorage.setItem(REDIRECT_TOKEN, newRoute);
    };

    return (
        <SwitchBoard
            owner={note.owner}
            board={note.board}
            switching={moving}
            hideModal={hideModal}
            handleConfirm={handleConfirm}
        />
    );
};

MoveNote.propTypes = {
    data: PropTypes.object,
    note: PropTypes.object,
    hideModal: PropTypes.func
};
