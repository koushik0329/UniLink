import { useState } from "react";
import { useAuthToken } from "@/context/AuthTokenProvider";
import sendUserConnectionsRequest from "@/api-calls/user-connections-request";

const useUserConnections = () => {
	const { auth } = useAuthToken();

	const [userConnections, setUserConnections] = useState([]);
	const [isUserConnectionsLoading, setIsUserConnectionsLoading] =
		useState(true);
	const [isUserConnectionsError, setIsUserConnectionsError] = useState(false);

	const handleGetUserConnections = async ({ user_email }) => {
		setIsUserConnectionsLoading((prev) => true);
		try {
			const access_token = auth.access_token;
			const data = await sendUserConnectionsRequest({
				user_email,
				access_token,
			});
			setUserConnections(data);
		} catch (error) {
			setIsUserConnectionsError((prev) => true);
			console.log("useAuthConnections error");

			const empty_connections = [];
			setUserConnections(empty_connections);
		}
		setIsUserConnectionsLoading((prev) => false);
	};

	return {
		userConnections,
		isUserConnectionsLoading,
		handleGetUserConnections,
		isUserConnectionsError,
		setUserConnections,
	};
};
export default useUserConnections;
