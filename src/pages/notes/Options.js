import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Popup} from '../../components/popup';
import {Modal} from '../../components/modal';

import {
    DELETE,
    SHARE,
    COMMENT,
    MOVE
} from '../../constants';

import {DeleteNote} from './DeleteNote';

export const Options = (props) => {
    const [show, setShow] = useState(null);
    const hideModal = () => setShow(null);

    const {note, backURL} = props;
    const {comments} = note;

    useEffect(() => {
        if (show) {
            document.querySelector('nav.navbar-container').style.position = 'unset';
        } else {
            document.querySelector('nav.navbar-container').style.position = 'relative';
        }
    }, [show]);

    const renderModal = () => {
        switch (show) {
            case DELETE: return (
                <DeleteNote
                    note={note}
                    hideModal={hideModal}
                    backURL={backURL}
                />
            );
            case SHARE: return (
                <div>SHARE</div>
            );
            case COMMENT: return (
                <div>COMMENT</div>
            );
            default: return null;
        }
    };

    return (
        <Fragment>
            <Popup isButton>
                <ul>
                    <li onClick={() => setShow(COMMENT)}>
                        <span>
							Comments
                        </span>
                        <span className="standard-badge">
                            {comments.length}
                        </span>
                    </li>
                    <li onClick={() => setShow(SHARE)}>Share</li>
                    <li onClick={() => setShow(MOVE)}>Move</li>
                    <li onClick={() => setShow(DELETE)}>Delete</li>
                </ul>
            </Popup>
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
    backURL: PropTypes.string
};