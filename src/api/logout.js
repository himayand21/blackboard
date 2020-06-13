import {NETLIFY_PREFIX} from './constants';

export const logoutAPI = async (allDeviceFlag) => {
    const response = await fetch(`${NETLIFY_PREFIX}/user/logout`, {
        method: 'POST',
        body: JSON.stringify({
            allDevices: allDeviceFlag
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