export const currentUserAPI = async (token) => {
	const response = await fetch(`/user/current`, {
		method: 'GET',
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