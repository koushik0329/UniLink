import { useState } from "react";
import { useAuthToken } from "@/context/AuthTokenProvider";
import sendToggleConnectionRequest from "@/api-calls/toggle-connection-request";

const useToggleConnection = () => {
	const { auth } = useAuthToken();

	const [
		isToggleConnectionRequestPending,
		setIsToggleConnectionRequestPending,
	] = useState(false);
	const [toggleConnectionStatus, setToggleConnectionStatus] = useState(false);

	const handleToggleConnection = async ({ user_email, isConnected }) => {
		const access_token = auth.access_token;

		setIsToggleConnectionRequestPending(true);
		try {
			const response = await sendToggleConnectionRequest({
				user_email,
				access_token,
				isConnected,
			});

			setToggleConnectionStatus((prev) => true);
		} catch (error) {
			console.log("Error at useToggleConnection hook:", error);
			setToggleConnectionStatus((prev) => false);
		}
		setIsToggleConnectionRequestPending(false);
	};

	return {
		handleToggleConnection,
		isToggleConnectionRequestPending,
		toggleConnectionStatus,
	};
};

export default useToggleConnection;
