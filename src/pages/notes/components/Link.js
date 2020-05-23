import React from 'react';
import PropTypes from 'prop-types';

export const linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
			contentState.getEntity(entityKey).getType() === 'LINK'
        );
    }, callback);
};

export const Link = (props) => {
    const {contentState, entityKey} = props;
    const {url} = contentState.getEntity(entityKey).getData();
    return (
        <a
            className="block-link"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={url}
        >
            {props.children}
        </a>
    );
};

Link.propTypes = {
    children: PropTypes.node,
    contentState: PropTypes.object,
    entityKey: PropTypes.string
};

const LinkPlugin = {
    decorators: [
        {
            strategy: linkStrategy,
            component: Link
        }
    ]
};

export default LinkPlugin;