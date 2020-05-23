import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';

import getUserDetails from '../../queries/userDetails';
import getNoteDetails from '../../queries/noteDetails';
import mutation from '../../mutations/updateUser';

export const UpdateNameForm = (props) => {
    const [name, setName] = useState('');
    const {pathname} = useLocation();
    const noteId = pathname.split('notes/')[1];

    const [mutate, {loading}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const {hideModal, id} = props;

    const updateUser = async () => {
        const refetchQueries = [{
            query: getUserDetails,
            variables: {id}
        }];
        if (noteId) {
            refetchQueries.push({
                query: getNoteDetails,
                variables: {id: noteId}
            });
        }
        await mutate({
            variables: {
                id,
                name
            },
            refetchQueries
        });
        hideModal();
    };

    const updateName = (e) => {
        const newName = e.target.value;
        if (newName.length <= 20) setName(newName);
    };

    return (
        <div className="create-board">
            <header className="create-board-header">Edit Profile</header>
            <div className="create-board-intro">
				You can edit your basic profile details here.
            </div>
            <div className="create-board-form">
                <div className="form-label">
					NAME
                </div>
                <input
                    value={name}
                    placeholder="Maximum 20 characters"
                    onChange={updateName}
                />
                <div className="form-error-row" />
            </div>
            <footer className="create-board-footer">
                <button
                    className="standard-button"
                    onClick={updateUser}
                    disabled={!name}
                >
                    {loading ? <Loader /> : 'Confirm'}
                </button>
                <button
                    className="standard-button"
                    onClick={hideModal}
                >
					Cancel
                </button>
            </footer>
        </div>
    );
};

UpdateNameForm.propTypes = {
    hideModal: PropTypes.func,
    id: PropTypes.string
};
