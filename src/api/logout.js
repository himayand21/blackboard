export const logoutAPI = async (
	token,
	allDeviceFlag
) => {
	const response = await fetch(`/user/logout`, {
		method: 'POST',
		body: JSON.stringify({
			allDevices: allDeviceFlag
		}),
		headers: {
			'content-type': 'application/json',
			'authorization': `Bearer ${token}`
		},
		credentials: 'include'
	});
	if (response.ok) {
		const responseJSON = await response.json();
		return responseJSON;
	} else {
		const errorJSON = await response.json();
		throw errorJSON.error || {message: "Some error occured"};
	}
}