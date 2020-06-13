import {NETLIFY_PREFIX} from './constants';

export const changePasswordAPI = async (
    password
) => {
    const response = await fetch(`${NETLIFY_PREFIX}/user/change-password`, {
        method: 'POST',
        body: JSON.stringify({
            password
        }),
        credentials: 'include'
    });
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
    const errorJSON = await response.json();
    throw errorJSON.error || {message: 'Some error occured'};
};