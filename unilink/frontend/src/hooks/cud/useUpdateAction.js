import { useState } from "react";

import { useAuthToken } from "@/context/AuthTokenProvider";

import { useToast } from "@/shadcn/ui/use-toast";
import sendUpdateRequest from "@/api-calls/update-request";

const useUpdateAction = () => {
	const { toast } = useToast();
	const toast_msg = {};

	const { auth } = useAuthToken();

	const [updatedPost, setUpdatedPost] = useState();
	const [isUpdateRequestPending, setIsUpdateRequestPending] = useState(false);
	const [updateStatus, setUpdateStatus] = useState(false);

	const handleUpdateSubmit = async ({ updatePost }) => {
		const access_token = auth.access_token;

		setIsUpdateRequestPending((prev) => true);
		try {
			const updateFormData = new FormData();
			updateFormData.append("postid", updatePost.id);
			updateFormData.append("title", updatePost.title);
			updateFormData.append("description", updatePost.description);

			const response = await sendUpdateRequest({
				updateFormData,
				access_token,
			});

			toast_msg.title = "update success";
			toast(toast_msg);

			setUpdateStatus((prev) => true);
			setUpdatedPost((prev) => updatePost);
		} catch (error) {
			toast_msg.title = "update error. try again later";
			toast(toast_msg);
			setUpdateStatus((prev) => false);
			setUpdatedPost((prev) => {});
		}
		setIsUpdateRequestPending((prev) => false);
	};

	return {
		handleUpdateSubmit,
		isUpdateRequestPending,
		updateStatus,
		updatedPost,
	};
};

export default useUpdateAction;
