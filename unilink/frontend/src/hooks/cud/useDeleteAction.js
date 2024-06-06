import { useState } from "react";

import { useAuthToken } from "@/context/AuthTokenProvider";

import { useToast } from "@/shadcn/ui/use-toast";
import sendDeleteRequest from "@/api-calls/delete-request";

const useDeleteAction = () => {
	const { toast } = useToast();
	const toast_msg = {};

	const { auth } = useAuthToken();

	const [deleteId, setDeleteId] = useState();
	const [isDeleteRequestPending, setIsDeleteRequestPending] = useState(false);
	const [deleteStatus, setDeleteStatus] = useState(false);

	const handleDeleteSubmit = async ({ postid }) => {
		setIsDeleteRequestPending((prev) => true);
		const access_token = auth.access_token;

		try {
			const response = await sendDeleteRequest({
				postid,
				access_token,
			});

			toast_msg.title = "Post Deletion Success";
			toast(toast_msg);
			setDeleteStatus((prev) => true);
			setDeleteId((prev) => postid);
		} catch (error) {
			// toast_msg.title = "delete error. try again later.";
			// toast(toast_msg);
			setDeleteStatus((prev) => true);
			setDeleteId((prev) => postid);
			// setDeleteStatus((prev) => false);
		}
		setIsDeleteRequestPending((prev) => false);
	};

	return {
		handleDeleteSubmit,
		isDeleteRequestPending,
		deleteStatus,
		deleteId,
	};
};

export default useDeleteAction;
