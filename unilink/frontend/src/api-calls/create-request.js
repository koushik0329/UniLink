const sendCreateRequest = async ({ formData, access_token }) => {
	const url = "http://localhost:8000/crud/create";

	const config = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		body: formData,
	};

	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response;
	} catch (error) {
		console.log("error from sendCreateRequest");
		throw error;
	}
};

export default sendCreateRequest;
