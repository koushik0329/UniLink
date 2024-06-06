const sendToggleInterestedRequest = async ({
	user_email,
	post_id,
	access_token,
	isInterested,
}) => {
	const endpoint = isInterested ? "/crud/uninterested" : "/crud/interested";
	const method = isInterested ? "DELETE" : "POST";

	const url = new URL(`http://localhost:8000${endpoint}`);
	url.searchParams.append("user_email", user_email);
	url.searchParams.append("post_id", post_id);

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
		console.log("error from toggleInterestedRequest:", error);
		throw error;
	}
};

export default sendToggleInterestedRequest;
