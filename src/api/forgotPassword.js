export const forgotPasswordAPI = async (
    email
) => {
    const response = await fetch(`${process.env.NETLIFY_PREFIX}/user/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({
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