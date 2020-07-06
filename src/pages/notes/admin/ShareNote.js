import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery, useMutation} from '@apollo/react-hooks';

import mutation from '../../../mutations/shareNote';
import unshareMutation from '../../../mutations/unshareNote';
import refetechQuery from '../../../queries/noteDetails';
import query from '../../../queries/userDetails';
import shareWithEveryoneMutation from '../../../mutations/toggleSharedWithEveryone';

import {withToast} from '../../../components/toast/withToast';
import {Toast} from '../../../components/toast/Toast';

import {ShareTile} from './shareNoteComponents/ShareTile';
import {SharedWith} from './shareNoteComponents/SharedWith';
import {FindAndShare} from './shareNoteComponents/FindAndShare';
import {ShareWithConnections} from './shareNoteComponents/ShareWithConnections';
import {ShareWithEveryone} from './shareNoteComponents/ShareWithEveryone';

const SHARED_WITH = 'Shared With';
const SHARE_WITH_CONNECTIONS = 'Share with Connections';
const FIND_AND_SHARE = 'Find and Share';
const SHARE_WITH_EVERYONE = 'Share with Everyone';

const ShareNoteComponent = (props) => {
    const {note, addToast} = props;
    const [option, setOption] = useState('');

    const {data: userData} = useQuery(query);

    const [mutate, {loading: sharing, error: shareError}] = useMutation(mutation);
    const [unshare, {loading: unsharing, error: unshareError}] = useMutation(unshareMutation);
    const [shareWithEveryone, {loading: sharingWithEveryone, error: makeItPublicError}] = useMutation(shareWithEveryoneMutation);

    const error = shareError || unshareError || makeItPublicError;

    const unshareNote = async (unsharingWith) => {
        await unshare({
            variables: {
                id: note.id,
                unsharingWith
            },
            awaitRefetchQueries: true,
            refetchQueries: [{
                query: refetechQuery,
                variables: {
                    id: note.id
                },
            }, {
                query
            }]
        });
        addToast({
            type: 'success',
            message: 'Collaborator removed successfully.',
        });
    };

    const shareNote = async (sharingWith) => {
        await mutate({
            variables: {
                id: note.id,
                sharingWith
            },
            awaitRefetchQueries: true,
            refetchQueries: [{
                query: refetechQuery,
                variables: {
                    id: note.id
                },
            }, {
                query
            }]
        });
        addToast({
            type: 'success',
            message: 'Note successfully shared.',
        });
    };

    const makeItPublic = async () => {
        await shareWithEveryone({
            variables: {
                id: note.id,
                sharedWithEveryone: !note.sharedWithEveryone
            },
            awaitRefetchQueries: true,
            refetchQueries: [{
                query: refetechQuery,
                variables: {
                    id: note.id
                }
            }]
        });
        addToast({
            type: 'success',
            message: `Note's privacy setting has been changed to ${note.sharedWithEveryone ? 'private' : 'public'}.`
        });
    };

    const renderOptionScreen = () => {
        switch (option) {
            case SHARED_WITH: return (
                <SharedWith
                    note={note}
                    unshareNote={unshareNote}
                    loading={sharing || unsharing}
                />
            );
            case FIND_AND_SHARE: return (
                <FindAndShare
                    note={note}
                    shareNote={shareNote}
                    unshareNote={unshareNote}
                    loading={sharing || unsharing}
                />
            );
            case SHARE_WITH_CONNECTIONS: return (
                <ShareWithConnections
                    connections={userData?.userDetail?.connectionDetails}
                    note={note}
                    loading={sharing || unsharing}
                    shareNote={shareNote}
                    unshareNote={unshareNote}
                />
            );
            case SHARE_WITH_EVERYONE: return (
                <ShareWithEveryone
                    note={note}
                    makeItPublic={makeItPublic}
                    loading={sharingWithEveryone}
                    addToast={addToast}
                />
            );
            default: return null;
        }
    };

    return (
        <div className="create-board">
            <div className="create-board-header">{option ? (
                <div className="back-button-wrapper">
                    <button className="standard-button back-button" onClick={() => setOption('')}>
                        <i className="fas fa-chevron-left" />
                        <span>Back</span>
                    </button>
                    {option}
                </div>
            ) : 'Sharing Options'}</div>
            {error ? (
                <Toast content={{
                    type: 'error',
                    message: `Failed to ${unshareError ? 'remove Collaborator.' : 'share your note.'}`
                }} />
            ) : null}
            {option ? renderOptionScreen() : (
                <div className="share-tile-wrapper">
                    <ShareTile
                        handleClick={() => setOption(SHARED_WITH)}
                        iconClassName={'fab fa-slideshare'}
                        title={'Shared With'}
                        disabled={!note.sharedWithDetails.length}
                    />
                    <ShareTile
                        handleClick={() => setOption(FIND_AND_SHARE)}
                        iconClassName={'fas fa-search'}
                        title={'Find and Share'}
                    />
                    <ShareTile
                        handleClick={() => setOption(SHARE_WITH_CONNECTIONS)}
                        iconClassName={'fas fa-user-friends'}
                        title={'My Connections'}
                        disabled={!userData?.userDetail?.connectionDetails?.length}
                    />
                    <ShareTile
                        handleClick={() => setOption(SHARE_WITH_EVERYONE)}
                        iconClassName={'fas fa-globe-americas'}
                        title={'Make it Public'}
                    />
                </div>
            )}
        </div>
    );
};

ShareNoteComponent.propTypes = {
    note: PropTypes.object,
    addToast: PropTypes.func
};

export const ShareNote = withToast(ShareNoteComponent);