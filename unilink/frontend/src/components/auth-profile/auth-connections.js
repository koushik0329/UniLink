"use client";
import { useEffect } from "react";

import ViewUsersSheet from "@/components/view-users-sheet";
import useAuthConnections from "@/hooks/auth-profile/useAuthConnections";

export const AuthConnections = () => {
	const {
		authConnections,
		isAuthConnectionsLoading,
		handleGetAuthConnections,
		isError,
	} = useAuthConnections();

	const authConnectionsEffect = () => {
		handleGetAuthConnections();
	};
	useEffect(authConnectionsEffect, []);

	return (
		<>
			<ViewUsersSheet
				category={"connections"}
				users_list={isAuthConnectionsLoading ? [] : authConnections}
			/>
		</>
	);
};
