import React from 'react';
export const OTPBox = (props) => {
    const {
        OTPInputIds,
        otp,
        setOtp,
        inputsRef
    } = props;
    const lengthOfOTP = OTPInputIds.length;

    const handleOTPinput = (event) => {
        const { value, dataset: { otpid, index } } = event.target;
        if (otp[otpid] === '') {
            setOtp({ ...otp, [otpid]: isOneDigitNumber(value) ? value : otp[otpid] });
            focusToNextBox(index, value);
        }
        else if (value === "") {
            setOtp({ ...otp, [otpid]: value });
        }
        else {
            const newValue = value.slice(otp[otpid].length) || value;
            setOtp({ ...otp, [otpid]: isOneDigitNumber(newValue) ? newValue : otp[otpid] });
            focusToNextBox(index, value);
        }
    };

    const checkBackSpace = (event) => {
        const { dataset: { otpid, index, } } = event.target;
        if ((event.key == 'Backspace' || event.keyCode === 8) && !otp[otpid]) {
            event.preventDefault();
            focusToPreviousBox(index);
        }
    };

    const isOneDigitNumber = (value) => !isNaN(value) && value.length === 1;

    const focusToNextBox = (index, value) => {
        parseInt(index) < lengthOfOTP - 1 && isOneDigitNumber(value) && inputsRef[parseInt(index) + 1].focus();
    };

    const focusToPreviousBox = (index) => {
        parseInt(index) > 0 && inputsRef[parseInt(index) - 1].focus();
    };



    return (
        OTPInputIds.map((each, index) => (
            <input
                autoFocus={index == 0}
                value={otp[each]}
                data-otpid={each}
                data-index={index}
                onChange={handleOTPinput}
                ref={el => inputsRef[index] = el}
                key={each + index}
                onKeyDown={checkBackSpace}
            />
        ))

    )
}