const sendAuthConnectionsRequest = async ({ access_token }) => {
	const url = new URL("http://127.0.0.1:8000/users/auth-connections");

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
		const auth_connections = data.auth_connections;
		return auth_connections;
	} catch (error) {
		throw error;
	}
};

export default sendAuthConnectionsRequest;
