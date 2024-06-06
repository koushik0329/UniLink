"use client";

import useToggleInterested from "@/hooks/useToggleInterestedAction";
import { Button } from "@/shadcn/ui/button";
import { useEffect } from "react";

export const ToggleInterestedButton = ({
	post,
	setInterestedCount,
	interestedCount,
	isInterested,
	setIsInterested,
}) => {
	const {
		handleToggleInterested,
		isToggleInterestedRequestPending,
		toggleInterestedStatus,
	} = useToggleInterested();

	useEffect(() => {
		if (!toggleInterestedStatus || isToggleInterestedRequestPending) return;

		setIsInterested((prev) => !prev);
		setInterestedCount((prev) => (isInterested ? prev - 1 : prev + 1));
	}, [toggleInterestedStatus, isToggleInterestedRequestPending]);

	const handleToggleInterestedClick = () => {
		handleToggleInterested({
			post_id: post.id,
			isInterested,
		});
	};

	return (
		<Button
			variant="outline"
			size="sm"
			className="h-7"
			onClick={handleToggleInterestedClick}
			disabled={isToggleInterestedRequestPending}
		>
			{isInterested ? "👎" : "👍"}
		</Button>
	);
};
