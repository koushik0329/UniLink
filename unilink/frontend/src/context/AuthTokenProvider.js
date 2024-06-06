"use client";

import { useState } from "react";
import { useContext, createContext } from "react";

const AuthTokenContext = createContext({});

export const AuthTokenProvider = ({ access_token, children }) => {
	const [auth, setAuth] = useState({ access_token });

	const resetAuthToken = () => {
		const access_token = "";
		setAuth({ access_token });
	};

	return (
		<AuthTokenContext.Provider value={{ auth, setAuth, resetAuthToken }}>
			{children}
		</AuthTokenContext.Provider>
	);
};

export const useAuthToken = () => {
	return useContext(AuthTokenContext);
};
