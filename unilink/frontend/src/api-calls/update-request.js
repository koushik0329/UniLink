const sendUpdateRequest = async ({ updateFormData, access_token }) => {
	const url = "http://localhost:8000/crud/update";

	const config = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		body: updateFormData,
	};

	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response;
	} catch (error) {
		console.log("error from sendUpdateRequest");
		throw error;
	}
};

export default sendUpdateRequest;
