"use client";
import useToggleConnection from "@/hooks/useToggleConnectionAction";
import { Button } from "@/shadcn/ui/button";
import { useEffect, useMemo } from "react";

const ToggleConnectionButton = ({
	user_email,
	auth_info,
	setUserConnections,
	userConnections,
	isUserConnectionsLoading,
}) => {
	const {
		handleToggleConnection,
		isToggleConnectionRequestPending,
		toggleConnectionStatus,
	} = useToggleConnection();

	const isConnected = useMemo(() => {
		return userConnections.some(
			(connection) => connection.email === auth_info.email
		);
	}, [auth_info.email, userConnections]);

	const handleToggleConnectionEffect = () => {
		if (isToggleConnectionRequestPending) return;
		if (!toggleConnectionStatus) return;

		let updatedConnections = [];

		if (isConnected) {
			updatedConnections = userConnections.filter(
				(connection) => connection.email !== auth_info.email
			);
		} else {
			const newConnection = {
				email: auth_info.email,
				name: auth_info.name,
			};
			updatedConnections = [...userConnections, newConnection];
		}

		setUserConnections((prev) => updatedConnections);
	};

	useEffect(handleToggleConnectionEffect, [
		toggleConnectionStatus,
		isToggleConnectionRequestPending,
	]);

	const handleClick = () => {
		handleToggleConnection({ user_email, isConnected });
	};

	return (
		<Button
			variant="outline"
			size="sm"
			className="h-7"
			onClick={handleClick}
			disabled={isToggleConnectionRequestPending}
		>
			{isUserConnectionsLoading
				? "Loading ..."
				: isConnected
				? "remove"
				: "add"}
		</Button>
	);
};

export default ToggleConnectionButton;
