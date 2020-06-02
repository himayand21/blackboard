import {NETLIFY_PREFIX} from './constants';

export const sendOtpAPI = async (
    id
) => {
    const response = await fetch(`${NETLIFY_PREFIX}/user/send-otp`, {
        method: 'POST',
        body: JSON.stringify({
            id
        }),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
    const errorJSON = await response.json();
    throw errorJSON.error || {message: 'Some error occured'};
};