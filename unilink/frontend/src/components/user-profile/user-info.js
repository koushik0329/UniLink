"use client";
import { CiUser } from "react-icons/ci";

export default function UserInfo({ user_info }) {
	return (
		<div className="mt-10">
			<div className="min-w-[300px] px-5">
				<div className="flex flex-col items-center space-y-2">
					<CiUser size={"80"} />
					<p>{user_info.name}</p>
					<p className="text-xs">{user_info.email}</p>
				</div>
			</div>
		</div>
	);
}
