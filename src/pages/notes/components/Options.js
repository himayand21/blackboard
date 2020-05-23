import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
    BLOCK_TYPES,
    INLINE_TYPES,
    INSERT_OPTIONS,
    INSERT,
    BLOCK,
    INLINE
} from '../constants';
import {Button} from './Button';

export const Options = (props) => {
    const [openTypes, setOpenTypes] = useState([]);
    const {
        // editorState,
        toggleBlockType,
        toggleInlineType,
        blockType,
        inlineType,
        insertConfig,
        toggleInsertType
    } = props;

    const filteredInsertOptions = INSERT_OPTIONS.filter((each) => insertConfig[each.style].show);
    const insertOptions = filteredInsertOptions.map((each) => ({...each, active: insertConfig[each.style].active}));

    const OPTIONS = [
        {icon: 'fas fa-th-large', types: BLOCK_TYPES, label: BLOCK, action: toggleBlockType},
        {icon: 'fas fa-font', types: INLINE_TYPES, label: INLINE, action: toggleInlineType}
    ];

    if (insertOptions.length) {
        OPTIONS.push({
            icon: 'fas fa-paperclip',
            types: insertOptions,
            label: INSERT,
            action: toggleInsertType
        });
    }

    const toggleOpenTypes = (type) => {
        if (openTypes.includes(type)) {
            const newOpenTypes = openTypes.filter((each) => each !== type);
            setOpenTypes(newOpenTypes);
        } else {
            setOpenTypes([...openTypes, type]);
        }
    };

    const getActive = (
        label, {
            style,
            active
        }) => {
        if (label === BLOCK) return (style === blockType);
        if (label === INLINE) return inlineType.has(style);
        if (label === INSERT) return active;
        return false;
    };

    return (
        <>
            {OPTIONS.map(({
                icon,
                types,
                label,
                action
            }) => {
                const show = openTypes.includes(label);
                return (
                    <div
                        className={`${show ? 'open-type' : 'close-type'} editor-submenu`}
                        key={label}
                    >
                        <button
                            onMouseDown={(event) => {
                                event.preventDefault();
                                toggleOpenTypes(label);
                            }}
                            className="standard-button"
                        >
                            <i className={icon} />
                        </button>
                        {show ?
                            <div className="submenu-options-wrapper">
                                {types.map((type, index) => {
                                    return (
                                        <span
                                            className={`animate-${index + 1}`}
                                            key={type.label}
                                        >
                                            <Button
                                                active={getActive(label, type)}
                                                icon={type.icon}
                                                onToggle={action}
                                                style={type.style}
                                                type={type}
                                            />
                                        </span>
                                    );
                                })}
                            </div> : null}
                    </div>
                );
            })}
        </>
    );
};

Options.propTypes = {
    toggleBlockType: PropTypes.func,
    toggleInlineType: PropTypes.func,
    blockType: PropTypes.string,
    inlineType: PropTypes.object,
    insertConfig: PropTypes.object,
    toggleInsertType: PropTypes.func
};