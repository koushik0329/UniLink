"use client";

import { useEffect } from "react";
import { CiUser } from "react-icons/ci";

import useAuthInfo from "@/hooks/auth-profile/useAuthInfo";

export const AuthInfo = () => {
	const { isAuthInfoLoading, isError, handleGetAuthInfo, authInfo } =
		useAuthInfo();

	const authProfileEffect = () => {
		handleGetAuthInfo();
	};
	useEffect(authProfileEffect, []);

	return (
		<div className="mt-10 mb-3">
			<div className="min-w-[300px] px-5">
				<div className="flex flex-col items-center space-y-2">
					<CiUser size={"80"} />
					<p>
						{isAuthInfoLoading ? "Loading . . . " : authInfo.name}
					</p>
					<p className="text-xs">
						{isAuthInfoLoading ? "Loading . . . " : authInfo.email}
					</p>
				</div>
			</div>
		</div>
	);
};
