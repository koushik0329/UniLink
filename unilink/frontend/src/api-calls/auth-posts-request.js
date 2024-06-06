const sendAuthPostsRequest = async ({ access_token }) => {
	const url = "http://127.0.0.1:8000/crud/auth-posts";

	const config = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${access_token}`,
		},
	};

	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export default sendAuthPostsRequest;
