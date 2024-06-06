import { useState } from "react";

import { useAuthToken } from "@/context/AuthTokenProvider";
import sendCreateRequest from "@/api-calls/create-request";

import { useToast } from "@/shadcn/ui/use-toast";

const useCreateAction = () => {
	const { toast } = useToast();
	const toast_msg = {};

	const { auth } = useAuthToken();

	const [isRequestPending, setIsRequestPending] = useState(false);
	const [createStatus, setCreateStatus] = useState(false);

	const handleCreateSubmit = async ({ formData }) => {
		const access_token = auth.access_token;

		setIsRequestPending((prev) => true);
		try {
			const response = await sendCreateRequest({
				formData,
				access_token,
			});

			toast_msg.title = "Post Creation Success";
			toast(toast_msg);
			setCreateStatus((prev) => true);
		} catch (error) {
			toast_msg.title = "create error. try again";
			toast(toast_msg);
			setCreateStatus((prev) => false);
		}
		setIsRequestPending((prev) => false);
	};

	return { handleCreateSubmit, isRequestPending, createStatus };
};

export default useCreateAction;
