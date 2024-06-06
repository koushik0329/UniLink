const sendUserConnectionsRequest = async ({ user_email, access_token }) => {
	const url = new URL("http://127.0.0.1:8000/users/user-connections");
	url.searchParams.append("user_email", user_email);

	const config = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	};

	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		const user_connections = data.user_connections;
		return user_connections;
	} catch (error) {
		throw error;
	}
};

export default sendUserConnectionsRequest;
