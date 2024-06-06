import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useAuthToken } from "@/context/AuthTokenProvider";

import { useToast } from "@/shadcn/ui/use-toast";

const sendRegisterRequest = async ({ credentials }) => {
	const url = "http://localhost:8000/auth/register";

	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		withCredentials: true,
	};

	try {
		const response = await axios.post(url, credentials, config);
		return response;
	} catch (error) {
		throw error;
	}
};

const useRegisterAction = () => {
	const router = useRouter();

	const { toast } = useToast();
	const toast_msg = {};

	const { auth, setAuth } = useAuthToken();

	const [isRequestPending, setIsRequestPending] = useState(false);

	const handleRegisterSubmit = async (credentials) => {
		setIsRequestPending((prev) => true);
		try {
			const response = await sendRegisterRequest({ credentials });

			toast_msg.title = "Registration Success";
			toast(toast_msg);

			setAuth(response.data);

			router.push("/profile");
		} catch (error) {
			toast_msg.title = "Kindly enter valid credentials";

			const error_msg = error?.response?.data.detail;
			if (typeof error_msg === "string") toast_msg.title = error_msg;

			toast(toast_msg);
		}
		setIsRequestPending((prev) => false);
	};

	return { handleRegisterSubmit, isRequestPending };
};

export default useRegisterAction;
