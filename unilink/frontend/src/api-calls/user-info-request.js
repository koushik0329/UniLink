const sendUserInfoRequest = async ({ email, access_token }) => {
	const url = new URL("http://127.0.0.1:8000/users/user-info");
	url.searchParams.append("user_email", email);
  
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
	  return data;
	} catch (error) {
	  throw error;
	}
  };
  
  export default sendUserInfoRequest;
  