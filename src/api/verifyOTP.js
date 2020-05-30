export const verifyOtpAPI = async ({
    email,
    otp
}) => {
    const response = await fetch(`/user/verify-otp`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            otp
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