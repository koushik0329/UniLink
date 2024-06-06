"use client";
import { useState } from "react";
import { useAuthToken } from "@/context/AuthTokenProvider";
import sendToggleInterestedRequest from "@/api-calls/toggle-interested-request";

const useToggleInterested = () => {
	const { auth } = useAuthToken();

	const [
		isToggleInterestedRequestPending,
		setIsToggleInterestedRequestPending,
	] = useState(false);
	const [toggleInterestedStatus, setToggleInterestedStatus] = useState(false);

	const handleToggleInterested = async ({ post_id, isInterested }) => {
		const access_token = auth.access_token;

		setIsToggleInterestedRequestPending((prev) => true);
		try {
			const response = await sendToggleInterestedRequest({
				post_id,
				access_token,
				isInterested,
			});

			setToggleInterestedStatus((prev) => true);
		} catch (error) {
			console.log("Error at useToggleInterested hook:", error);
			setToggleInterestedStatus((prev) => false);
		}
		setIsToggleInterestedRequestPending((prev) => false);
	};

	return {
		handleToggleInterested,
		isToggleInterestedRequestPending,
		toggleInterestedStatus,
	};
};

export default useToggleInterested;
