const sendDeleteRequest = async ({ postid, access_token }) => {
	const url = new URL("http://127.0.0.1:8000/crud/delete");
	url.searchParams.append("postid", postid);

	const config = {
		method: "DELETE",
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
		console.log("error from sendDeleteRequest");
		throw error;
	}
};

export default sendDeleteRequest;
