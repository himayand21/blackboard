import {NETLIFY_PREFIX} from './constants';

export const resendOtpAPI = async ({
    id,
    email
}) => {
    const response = await fetch(`${NETLIFY_PREFIX}/user/resend-otp`, {
        method: 'POST',
        body: JSON.stringify({
            id,
            email
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