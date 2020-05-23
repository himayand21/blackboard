import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

import {Interactive} from '../../components/interactive';
import {Modal} from '../../components/modal';

import {
    DELETE,
    SHARE,
    COMMENT,
    MOVE
} from '../../constants';

import {Comments} from '../comments';

import {DeleteNote} from './DeleteNote';
import {MoveNote} from './MoveNote';

export const Options = (props) => {
    const [show, setShow] = useState(null);
    const hideModal = () => setShow(null);

    const {note, backURL, switchToEdit} = props;
    const {comments} = note;

    const renderModal = () => {
        switch (show) {
            case DELETE: return (
                <DeleteNote
                    note={note}
                    hideModal={hideModal}
                    backURL={backURL}
                />
            );
            case MOVE: return (
                <MoveNote
                    note={note}
                    hideModal={hideModal}
                />
            );
            case SHARE: return (
                <div>SHARE</div>
            );
            case COMMENT: return (
                <Comments
                    note={note}
                    hideModal={hideModal}
                />
            );
            default: return null;
        }
    };

    return (
        <Fragment>
            <div className="standard-interactive-groups">
                <div className="standard-interactive-group">
                    <Interactive
                        onClick={switchToEdit}
                        className="fas fa-pen-fancy"
                        title="Edit"
                    />
                    <Interactive
                        onClick={() => setShow(MOVE)}
                        className="fas fa-file-export"
                        title="Switch Board"
                    />
                    <Interactive
                        onClick={() => setShow(DELETE)}
                        className="fas fa-trash"
                        title="Delete"
                    />
                </div>
                <div className="standard-interactive-group">
                    <Interactive
                        onClick={() => setShow(COMMENT)}
                        className="far fa-comments"
                        count={comments.length}
                        title="Comment"
                    />
                    <Interactive
                        onClick={() => setShow(SHARE)}
                        className="fas fa-paper-plane"
                        count={0}
                        title="Share"
                    />
                </div>
            </div>
            <Modal
                hideModal={hideModal}
                show={show}
            >
                {renderModal()}
            </Modal>
        </Fragment>
    );
};

Options.propTypes = {
    note: PropTypes.object,
    backURL: PropTypes.string,
    switchToEdit: PropTypes.func
};