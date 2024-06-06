import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import { useAuthToken } from "@/context/AuthTokenProvider";

import { useToast } from "@/shadcn/ui/use-toast";

const sendLogOutRequest = async (access_token) => {
	const url = "http://localhost:8000/auth/logout";

	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Bearer ${access_token}`,
		},
		withCredentials: true,
	};

	try {
		const response = await axios.get(url, config);
		return response;
	} catch (error) {
		throw error;
	}
};

const useLogOutAction = () => {
	const router = useRouter();

	const { toast } = useToast();
	const toast_msg = {};

	const { auth, resetAuthToken } = useAuthToken();

	const [isRequestPending, setIsRequestPending] = useState(false);

	const handleLogOut = async () => {
		setIsRequestPending((prev) => true);

		try {
			const response = await sendLogOutRequest(auth.access_token);

			toast_msg.title = "Logout Success";
			toast(toast_msg);

			resetAuthToken();

			router.refresh();
			router.replace("/");
		} catch (error) {
			console.log(error);

			toast_msg.title = "Server Error. Try again.";
			toast(toast_msg);
		}

		setIsRequestPending((prev) => false);
	};

	return { handleLogOut, isRequestPending };
};

export default useLogOutAction;
