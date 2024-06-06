import { useState } from "react";
import { useAuthToken } from "@/context/AuthTokenProvider";
import sendAuthConnectionsRequest from "@/api-calls/auth-connections-request";

const useAuthConnections = () => {
	const { auth } = useAuthToken();

	const [authConnections, setAuthConnections] = useState([]);
	const [isAuthConnectionsLoading, setIsAuthConnectionsLoading] =
		useState(true);
	const [isError, setIsError] = useState(false);

	const handleGetAuthConnections = async () => {
		setIsAuthConnectionsLoading((prev) => true);
		try {
			const access_token = auth.access_token;
			const data = await sendAuthConnectionsRequest({ access_token });
			setAuthConnections(data);
		} catch (error) {
			setIsError((prev) => true);
			console.log("useAuthConnections error");

			const empty_connections = [];
			setAuthConnections(empty_connections);
		}
		setIsAuthConnectionsLoading((prev) => false);
	};

	return {
		authConnections,
		isAuthConnectionsLoading,
		handleGetAuthConnections,
		isError,
	};
};
export default useAuthConnections;
