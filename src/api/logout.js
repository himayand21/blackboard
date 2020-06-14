import {NETLIFY_PREFIX} from './constants';

export const logoutAPI = async (allDeviceFlag, csrfToken) => {
    const response = await fetch(`${NETLIFY_PREFIX}/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({
            allDevices: allDeviceFlag
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