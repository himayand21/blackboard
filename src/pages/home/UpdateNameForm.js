import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Toast} from '../../components/toast/Toast';

import getUserDetails from '../../queries/userDetails';
import getNoteDetails from '../../queries/noteDetails';
import updateUser from '../../mutations/updateUser';

export const UpdateNameForm = (props) => {
    const [name, setName] = useState('');
    const {pathname} = useLocation();
    const noteId = pathname.split('notes/')[1];

    const [update, {loading, error: mutationError}] = useMutation(updateUser);

    const {hideModal, id, placeholder} = props;

    const handleUpdateUser = async () => {
        const refetchQueries = [{
            query: getUserDetails
        }];
        if (noteId) {
            refetchQueries.push({
                query: getNoteDetails,
                variables: {id: noteId}
            });
        }
        await update({
            variables: {
                id,
                name
            },
            refetchQueries,
            awaitRefetchQueries: true
        });
        hideModal();
    };

    useEffect(() => {
        if (placeholder) {
            setName(placeholder);
        }
    }, [placeholder]);

    const updateName = (e) => {
        const newName = e.target.value;
        if (newName.length <= 20) setName(newName);
    };

    const handleEnter = (event) => {
        if (name.length && event.keyCode === 13) {
            handleUpdateUser();
        }
    };

    return (
        <div className="modal-content">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Failed to update your profile.',
                    type: 'error'
                }} />
            ) : null}
            <header className="modal-content-header">Edit Profile</header>
            <div className="modal-content-intro">
				You can edit your basic profile details here.
            </div>
            <div className="modal-form">
                <div className="form-label">
					NAME
                </div>
                <input
                    value={name}
                    placeholder="Maximum 20 characters"
                    onChange={updateName}
                    onKeyDown={handleEnter}
                />
                <div className="form-error-row" />
            </div>
            <footer className="modal-footer">
                <button
                    className="standard-button"
                    onClick={handleUpdateUser}
                    disabled={!name || loading}
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
    id: PropTypes.string,
    placeholder: PropTypes.string
};
