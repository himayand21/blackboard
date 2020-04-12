import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {PopupModal} from './PopupModal';

export const Popup = (props) => {
    const [show, setShow] = useState(false);

    return (
        <div className="popup-wrapper">
            <i className="fa fa-ellipsis-v" onClick={() => setShow(true)} />
            {show ?
                <PopupModal setShow={setShow}>
                    {props.children}
                </PopupModal> : null}
        </div>
    );
};

Popup.propTypes = {
    children: PropTypes.node
};
