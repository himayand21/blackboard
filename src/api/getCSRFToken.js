import {NETLIFY_PREFIX} from './constants';

export const getCSRFTokenAPI = async () => {
    const response = await fetch(`${NETLIFY_PREFIX}/csrf-token`, {
        method: 'GET',
        credentials: 'include'
    });
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
    const errorJSON = await response.json();
    throw errorJSON.error || {message: 'Some error occured'};
};