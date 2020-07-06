import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';

import {
    REDIRECT_TOKEN,
    DASHBOARD,
    NOTES
} from '../../../constants';

import refetchQuery from '../../../queries/refetchQuery';
import mutation from '../../../mutations/moveNote';

import {Toast} from '../../../components/toast/Toast';
import {SwitchBoard} from '../components/SwitchBoard';

export const MoveNote = (props) => {
    const {note, hideModal} = props;

    const history = useHistory();
    const [mutate, {loading: moving, error: mutationError}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const handleConfirm = async (selectedBoard) => {
        await mutate({
            variables: {
                id: note.id,
                board: selectedBoard
            },
            refetchQueries: [{
                query: refetchQuery
            }]
        });
        const newRoute = `${DASHBOARD}/${selectedBoard}${NOTES}/${note.id}`;
        hideModal();
        history.push(newRoute);
        sessionStorage.setItem(REDIRECT_TOKEN, newRoute);
    };

    return (
        <>
            {mutationError ? (
                <Toast content = {{
                    message: 'Uh oh! Failed to move your note.',
                    type: 'error'
                }} />
            ) : null}
            <SwitchBoard
                board={note.board}
                switching={moving}
                hideModal={hideModal}
                handleConfirm={handleConfirm}
            />
        </>
    );
};

MoveNote.propTypes = {
    data: PropTypes.object,
    note: PropTypes.object,
    hideModal: PropTypes.func
};
