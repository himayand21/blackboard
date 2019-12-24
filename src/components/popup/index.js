import React, { useState } from "react";
import './popup.scss';
import { PopupModal } from './PopupModal';

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
    )
}