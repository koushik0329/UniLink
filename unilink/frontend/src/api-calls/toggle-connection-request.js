const sendToggleConnectionRequest = async ({
	user_email,
	access_token,
	isConnected,
}) => {
	const endpoint = isConnected
		? "/users/remove-connection"
		: "/users/add-connection";
	const method = isConnected ? "DELETE" : "POST";

	const url = new URL("http://localhost:8000" + endpoint);
	url.searchParams.append("user_email", user_email);

	const config = {
		method: method,
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	};

	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response;
	} catch (error) {
		console.log("error from toggleConnection");
		throw error;
	}
};

export default sendToggleConnectionRequest;
