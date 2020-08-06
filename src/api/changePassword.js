import {NETLIFY_PREFIX} from './constants';

export const changePasswordAPI = async (
    password,
    csrfToken
) => {
    const response = await fetch(`${NETLIFY_PREFIX}/auth/change-password`, {
        method: 'POST',
        body: JSON.stringify({
            password
        }),
        headers: {
            'content-type': 'application/json',
            'X-CSRF-Token': csrfToken
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