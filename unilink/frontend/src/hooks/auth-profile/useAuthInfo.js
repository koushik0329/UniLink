import { useState } from "react";
import { useAuthToken } from "@/context/AuthTokenProvider";
import sendAuthInfoRequest from "@/api-calls/auth-info-request";

const useAuthInfo = () => {
	const { auth } = useAuthToken();
	const [authInfo, setAuthInfo] = useState();
	const [isAuthInfoLoading, setIsAuthInfoLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const handleGetAuthInfo = async () => {
		setIsAuthInfoLoading((prev) => true);
		try {
			const data = await sendAuthInfoRequest(auth.access_token);
			setAuthInfo(data);
		} catch (error) {
			setIsError((prev) => true);
			console.log("useAuthInfo error");

			const empty_info = { name: "", email: "" };
			setAuthInfo(empty_info);
		}
		setIsAuthInfoLoading((prev) => false);
	};

	return { authInfo, isAuthInfoLoading, handleGetAuthInfo, isError };
};
export default useAuthInfo;
