import React from 'react';
import PropTypes from 'prop-types';

export const Link = (props) => {
    return (
        <a
            href={props.children}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    );
};

Link.propTypes = {
    children: PropTypes.node
};

// const onAddLink = (event) => {
//     event.preventDefault();
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//         'LINK',
//         'MUTABLE'
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity});
//     onChange(RichUtils.toggleLink(
//         newEditorState,
//         newEditorState.getSelection(),
//         entityKey
//     ));
// };

// const onRemoveLink = (event) => {
//     event.preventDefault();
//     const selection = editorState.getSelection();
//     if (!selection.isCollapsed()) {
//         onChange(RichUtils.toggleLink(editorState, selection, null));
//     }
// };

// const decorator = new CompositeDecorator([
//     {
//         strategy: findLinkEntities,
//         component: Link,
//     }
// ]);