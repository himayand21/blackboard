export const changePasswordAPI = async (
    password
) => {
    const token = await localStorage.getItem('blackboard-token');
    const response = await fetch(`/user/change-password`, {
        method: 'POST',
        body: JSON.stringify({
            password
        }),
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