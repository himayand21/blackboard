import React, {useEffect, useRef} from "react";

export const PopupModal = (props) => {

    const useOutsideClick = (ref) => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                props.setShow(false);
            }
        };
        useEffect(() => {
            document.addEventListener('mousedown', handleOutsideClick);
            return (() => document.removeEventListener('mousedown', handleOutsideClick));
        }, []);
    };

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    return (
        <div className="popup-modal" ref={wrapperRef}>
            {props.children}
        </div>
    )
}