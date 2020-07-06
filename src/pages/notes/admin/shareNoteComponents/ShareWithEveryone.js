import React from 'react';
import PropTypes from 'prop-types';

import {Toggle} from '../../../../components/toggle';

export const ShareWithEveryone = (props) => {
    const {
        note,
        loading,
        makeItPublic,
        addToast
    } = props;

    const link = `http://0.0.0.0:8080/dashboard/note/${note.id}`;
    const {sharedWithEveryone} = note;

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        addToast({
            type: 'success',
            message: 'Link copied to clipboard.'
        });
    };

    return (
        <div className="share-public">
            <div className="share-public-link">
                <div className="link-header">
                    <span>LINK</span>
                    {(document.queryCommandSupported('copy') && sharedWithEveryone) ?
                        <i className="far fa-clone" onClick={copyToClipboard} /> : null}
                </div>
                <div className="share-toggle">
                    <Toggle
                        checked={sharedWithEveryone}
                        handleChange={makeItPublic}
                        disabled={loading}
                    />
                </div>
            </div>
            {sharedWithEveryone ? <div className="public-link">{link}</div> : (
                <div className="public-share-message">Switching it on will make this note available to every blackboard user.</div>
            )}
        </div>
    );
};

ShareWithEveryone.propTypes = {
    note: PropTypes.object,
    loading: PropTypes.bool,
    makeItPublic: PropTypes.func,
    addToast: PropTypes.func
};