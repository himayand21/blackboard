import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {BLOCK_TYPES, INLINE_TYPES} from '../constants';
import {Button} from './Button';

export const Options = (props) => {
    const [openTypes, setOpenTypes] = useState([]);
    const {
        // editorState,
        toggleBlockType,
        toggleInlineType,
        blockType,
        inlineType
    } = props;

    const OPTIONS = [
        {icon: 'fa fa-th-large', types: BLOCK_TYPES, label: 'BLOCK', action: toggleBlockType},
        {icon: 'fa fa-font', types: INLINE_TYPES, label: 'INLINE', action: toggleInlineType}
    ];

    const toggleOpenTypes = (type) => {
        if (openTypes.includes(type)) {
            const newOpenTypes = openTypes.filter((each) => each !== type);
            setOpenTypes(newOpenTypes);
        } else {
            setOpenTypes([...openTypes, type]);
        }
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
                            onMouseDown={() => toggleOpenTypes(label)}
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
                                                active={label === 'BLOCK' ? type.style === blockType : inlineType.has(type.style)}
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
};