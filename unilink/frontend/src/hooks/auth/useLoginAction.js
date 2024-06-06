import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useAuthToken } from "@/context/AuthTokenProvider";

import { useToast } from "@/shadcn/ui/use-toast";

const sendLoginRequest = async ({ credentials }) => {
	const url = "http://localhost:8000/auth/login";

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

const useLoginAction = () => {
	const router = useRouter();

	const { toast } = useToast();
	const toast_msg = {};

	const { auth, setAuth } = useAuthToken();

	const [isRequestPending, setIsRequestPending] = useState(false);

	const handleLoginSubmit = async (credentials) => {
		setIsRequestPending((prev) => true);
		try {
			const response = await sendLoginRequest({ credentials });

			toast_msg.title = "Login Success";
			toast(toast_msg);

			setAuth(response.data);

			router.refresh();
			router.push("/profile");
		} catch (error) {
			toast_msg.title = "Kindly enter valid credentials";

			const error_msg = error?.response?.data.detail;
			if (typeof error_msg === "string") toast_msg.title = error_msg;

			toast(toast_msg);
		}
		setIsRequestPending((prev) => false);
	};

	const loginEffect = () => {
		const access_token = "";
		setAuth({ access_token });
	};
	useEffect(loginEffect, []);

	return { handleLoginSubmit, isRequestPending };
};

export default useLoginAction;
