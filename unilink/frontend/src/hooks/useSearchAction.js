import { useState } from "react";

import axios from "axios";
import { useAuthToken } from "@/context/AuthTokenProvider";

const sendSearchRequest = async ({ quser, access_token }) => {
	const url = "http://localhost:8000/search/search-user";

	const config = {
		params: {
			quser: quser,
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Bearer ${access_token}`,
		},
		withCredentials: true,
	};

	try {
		const response = await axios.get(url, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const useSearchAction = () => {
	const { auth } = useAuthToken();
	const [searchResult, setSearchResult] = useState([]);
	const [isSearchPending, setIsSearchPending] = useState(false);

	const handleSearch = async ({ quser }) => {
		setIsSearchPending((prev) => true);

		const search_params = {
			quser: quser,
			access_token: auth.access_token,
		};

		try {
			const data = await sendSearchRequest(search_params);

			setSearchResult((prev) => data.search_result);
		} catch (error) {
			setSearchResult((prev) => []);
		}

		setIsSearchPending((prev) => false);
	};

	return { searchResult, handleSearch, isSearchPending };
};

export default useSearchAction;
