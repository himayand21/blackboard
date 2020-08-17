import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';

import {
    REDIRECT_TOKEN,
    DASHBOARD,
    NOTES
} from '../../../constants';

import moveNote from '../../../mutations/moveNote';
import dashboardRefresh from '../../../queries/dashboardRefresh';

import {Toast} from '../../../components/toast/Toast';
import {SwitchBoard} from '../components/SwitchBoard';

export const MoveNote = (props) => {
    const {note, hideModal, boards} = props;

    const history = useHistory();
    const [move, {loading: moving, error: mutationError}] = useMutation(moveNote, {
        refetchQueries: [{
            query: dashboardRefresh
        }]
    });

    const handleConfirm = async (selectedBoard) => {
        await move({
            variables: {
                id: note.id,
                board: selectedBoard
            }
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
                boards={boards}
                handleConfirm={handleConfirm}
            />
        </>
    );
};

MoveNote.propTypes = {
    data: PropTypes.object,
    note: PropTypes.object,
    hideModal: PropTypes.func,
    boards: PropTypes.array
};
