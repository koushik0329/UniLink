"use client";
import { useEffect } from "react";

import ViewUsersSheet from "@/components/view-users-sheet";
import useUserConnections from "@/hooks/user-profile/useUserConnections";

import ToggleConnectionButton from "../toggle-connection-button";

export const UserConnections = ({ user_email, auth_info }) => {
	const {
		userConnections,
		setUserConnections,
		isUserConnectionsLoading,
		handleGetUserConnections,
		isUserConnectionsError,
	} = useUserConnections();

	const userConnectionsEffect = () => {
		handleGetUserConnections({ user_email });
	};

	useEffect(userConnectionsEffect, []);
	return (
		<div className="flex flex-col space-y-2">
			<ViewUsersSheet
				category={"connections"}
				users_list={isUserConnectionsLoading ? [] : userConnections}
			/>
			<ToggleConnectionButton
				user_email={user_email}
				auth_info={auth_info}
				isUserConnectionsLoading={isUserConnectionsLoading}
				userConnections={userConnections}
				setUserConnections={setUserConnections}
			/>
		</div>
	);
};
