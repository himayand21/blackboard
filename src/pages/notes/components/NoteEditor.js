import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {EditorState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import {useToast} from '../../../components/toast';

import {Options} from '../components/Options';
import {getBlockStyle} from '../util/getBlockStyle';
import {keyBindingFunction} from '../util/keyBindingFunction';
import {getEntities} from '../util/getEntities';
import {checkLink} from '../util/checkLink';

import {LINK} from '../constants';
import LinkPlugin from './Link';

export const NoteEditor = (props) => {
    const [showOptions, setShowOptions] = useState(false);
    const [optionButton, setOptionButton] = useState(false);
    const [show, setShow] = useState(false);
    const [link, setLink] = useState('');
    const [fullScreenFlag, setFullScreenFlag] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);

    const {addToast} = useToast();

    const {editorState, onChange, readOnly, editorRef} = props;

    const toggleShowOptions = () => setShowOptions(!showOptions);
    const showOptionButton = () => setOptionButton(true);
    const hideOptionButton = () => setOptionButton(false);

    useEffect(() => {
        if (editorState === null) {
            onChange(EditorState.createEmpty());
        }
    }, []);

    useEffect(() => {
        setOptionsVisible(false);
        const timeoutId = setTimeout(() => setOptionsVisible(true), 500);
        return (() => clearTimeout(timeoutId));
    }, [editorState]);

    const enterFullScreen = () => {
        setFullScreenFlag(true);
        const element = editorRef.current;
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
        else if (element.webkitRequestFullScreen) element.webkitRequestFullScreen();
        else if (element.msRequestFullscreen) element.msRequestFullscreen();
        else throw new Error('Error');
    };

    const exitFullScreen = () => {
        setFullScreenFlag(false);
        const doc = window.document;
        if (doc.exitFullscreen) doc.exitFullscreen();
        else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
        else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
        else if (doc.msExitFullscreen) doc.msExitFullscreen();
        else throw new Error('Error');
    };

    const toggleFullScreen = () => {
        try {
            if (editorRef) {
                if (!fullScreenFlag) {
                    enterFullScreen();
                } else {
                    exitFullScreen();
                }
            }
            return null;
        } catch (error) {
            addToast({
                type: 'error',
                message: 'We are facing some trouble switching to fullscreen.'
            });
        }
    };

    const onToggleLink = (hasLink, linkKey) => {
        const contentState = editorState.getCurrentContent();
        let defaultURL = '';
        if (hasLink) {
            const linkInstance = contentState.getEntity(linkKey);
            defaultURL = linkInstance.getData().url;
            setLink(defaultURL);
        }
        setShow(true);
        return 'handled';
    };

    const hideModal = () => setShow(false);

    const onConfirm = () => {
        hideModal();
        const selection = editorState.getSelection();
        if (!link) {
            onChange(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity(LINK, 'MUTABLE', {
            url: link
        });
        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            'create-entity'
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
        setLink('');
    };

    const handleKeyCommand = (command, editorStateParam) => {
        const newState = RichUtils.handleKeyCommand(editorStateParam, command);
        if (command === 'strikethrough') {
            // eslint-disable-next-line no-param-reassign
            onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
            return 'handled';
        }
        if (command === 'shift-enter') {
            onChange(RichUtils.insertSoftNewline(editorState));
        }
        if (command === 'split-block') {
            setTimeout(() => {
                editorRef.current.scrollTop = editorRef.current.scrollHeight;
            }, 100);
            return 'not-handled';
        }
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const toggleBlockType = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineType = (inlineType) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineType));
    };

    const outsideClick = (event) => {
        if (event.target === event.currentTarget) {
            hideModal();
        }
    };

    if (editorState) {
        const selection = editorState.getSelection();
        const anchorKey = selection.getAnchorKey();
        const currentBlock = editorState
            .getCurrentContent()
            .getBlockForKey(anchorKey);
        const blockType = currentBlock.getType();
        const inlineType = editorState.getCurrentInlineStyle();
        const entities = getEntities(editorState, LINK, currentBlock);
        const [showLinkOption, hasLink, linkKey] = checkLink({entities, selection, block: currentBlock});

        const toggleInsertType = (insertType) => {
            if (insertType === LINK) onToggleLink(hasLink, linkKey);
        };

        const insertConfig = {
            LINK: {
                show: showLinkOption,
                active: hasLink
            }
        };

        return (
            <>
                <div
                    className="note-editor"
                    onFocus={showOptionButton}
                    onBlur={hideOptionButton}
                >
                    <Editor
                        blockStyleFn={getBlockStyle}
                        editorState={editorState}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                        placeholder={optionButton || (blockType !== 'unstyled') ? '' : '...'}
                        keyBindingFn={keyBindingFunction}
                        readOnly={readOnly}
                        plugins={[LinkPlugin]}
                    />
                </div>
                {readOnly ? null : [
                    <div
                        key={'editor-button-wrapper'}
                        className={`${showOptions ? 'with-options' : ''} editor-button-wrapper`}
                    >
                        {optionsVisible ? (
                            <button
                                className={`standard-button ${optionsVisible ? '' : 'no-display'}`}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    toggleShowOptions();
                                }}
                            >
                                <i className="fas fa-chevron-up" />
                            </button>
                        ) : null}
                        {show ?
                            <main className="modal-wrapper" onClick={outsideClick}>
                                <div className="modal-section animate-1">
                                    <header className="modal-header">
                                        <button onClick={hideModal} className="close-button">
                                            <i className="fas fa-times" />
                                        </button>
                                    </header>
                                    <div className="create-board">
                                        <header className="create-board-header">Add Link here</header>
                                        <div className="create-board-form">
                                            <div className="form-label">
                                            LINK
                                            </div>
                                            <input
                                                value={link}
                                                placeholder="Maximum 20 characters"
                                                onChange={(event) => setLink(event.target.value)}
                                            />
                                            <div className="form-error-row" />
                                        </div>
                                        <footer className="create-board-footer">
                                            <button
                                                className="standard-button"
                                                onClick={onConfirm}
                                            >
                                            Confirm
                                            </button>
                                            <button
                                                className="standard-button"
                                                onClick={hideModal}
                                            >
                                            Cancel
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                            </main> : null}
                        {showOptions ? (
                            <div className={`options-wrapper ${optionsVisible ? '' : 'no-display'}`}>
                                <Options
                                    toggleBlockType={toggleBlockType}
                                    editorState={editorState}
                                    toggleInlineType={toggleInlineType}
                                    blockType={blockType}
                                    inlineType={inlineType}
                                    insertConfig={insertConfig}
                                    toggleInsertType={toggleInsertType}
                                />
                            </div>
                        ) : null}
                    </div>,
                    <div
                        className={`fullscreen-button-wrapper ${optionsVisible ? '' : 'no-display'}`}
                        key="fullscreen-button-wrapper"
                    >
                        <button className="standard-button" onMouseDown={toggleFullScreen}>
                            <i className={fullScreenFlag ? 'fas fa-compress' : 'fas fa-expand'} />
                        </button>
                    </div>
                ]}
            </>
        );
    }
    return null;
};

NoteEditor.propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    editorRef: PropTypes.object
};