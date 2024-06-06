"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/shadcn/ui/button";
import { CiUser } from "react-icons/ci";

const ViewUserButton = ({ email, ...props }) => {
	const router = useRouter();

	const [isloading, setIsLoading] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		setIsLoading((prev) => true);

		const path = `/user/${email}`;
		setIsLoading((prev) => false);
		router.push(path);
	};

	return (
		<Button
			variant="secondary"
			className="h-7"
			{...props}
			onClick={handleClick}
			disabled={isloading}
		>
			<CiUser />
		</Button>
	);
};

export default ViewUserButton;
