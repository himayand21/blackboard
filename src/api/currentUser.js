import {NETLIFY_PREFIX} from './constants';

export const currentUserAPI = async (csrfToken) => {
    const response = await fetch(`${NETLIFY_PREFIX}/auth/current`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRF-Token': csrfToken
        }
    });
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
    const errorJSON = await response.json();
    throw errorJSON.error || {message: 'Some error occured'};
};