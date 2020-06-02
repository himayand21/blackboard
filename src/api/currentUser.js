import {NETLIFY_PREFIX} from './constants';

export const currentUserAPI = async (token) => {
    const response = await fetch(`${NETLIFY_PREFIX}/user/current`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
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