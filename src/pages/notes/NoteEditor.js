import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Editor, EditorState, RichUtils} from 'draft-js';

import {Options} from './components/Options';
import {getBlockStyle} from './util/getBlockStyle';
import {keyBindingFunction} from './util/keyBindingFunction';

export const NoteEditor = (props) => {
    const [showOptions, setShowOptions] = useState(false);
    const [optionButton, setOptionButton] = useState(false);
    const {editorState, onChange} = props;

    const toggleShowOptions = () => setShowOptions(!showOptions);
    const showOptionButton = () => setOptionButton(true);
    const hideOptionButton = () => setOptionButton(false);

    useEffect(() => {
        if (editorState === null) {
            onChange(EditorState.createEmpty());
        }
    }, []);

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

    if (editorState) {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        const inlineType = editorState.getCurrentInlineStyle();

        return (
            <>
                <div
                    className="note-editor"
                    id="note-editor"
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
                    />
                </div>
                <div
                    className={`${showOptions ? 'with-options' : ''} editor-button-wrapper`}
                >
                    <button
                        className="standard-button"
                        onClick={toggleShowOptions}
                    >
                        <i className="fa fa-chevron-up" />
                    </button>
                    {showOptions ?
                        <div className="options-wrapper">
                            <Options
                                toggleBlockType={toggleBlockType}
                                editorState={editorState}
                                toggleInlineType={toggleInlineType}
                                blockType={blockType}
                                inlineType={inlineType}
                            />
                        </div> :
                        null
                    }
                </div>
            </>
        );
    }
    return null;
};

NoteEditor.propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func
};