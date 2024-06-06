import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

import sendAuthInfoRequest from "@/api-calls/auth-info-request";
import sendUserInfoRequest from "@/api-calls/user-info-request";

import UserInfo from "@/components/user-profile/user-info";
import { UserConnections } from "@/components/user-profile/user-connections";
import UserPosts from "@/components/user-profile/user-posts";
import { Suspense } from "react";

export default async function UserProfile({ params }) {
	const access_token = cookies().get("access_token")?.value;

	const auth_info = await sendAuthInfoRequest(access_token);
	const user_email = decodeURIComponent(params.useremail);

	if (auth_info.email === user_email) redirect("/profile");

	const request_params = {
		email: user_email,
		access_token: access_token,
	};

	let user_info = null;
	try {
		user_info = await sendUserInfoRequest(request_params);
	} catch (error) {
		notFound();
	}

	return (
		<>
			<UserInfo user_info={user_info} />
			<div className="flex justify-center mt-2">
				<UserConnections
					user_email={user_email}
					auth_info={auth_info}
				/>
			</div>
			<Suspense
				fallback={<p className="text-center mt-5">Loading . . .</p>}
			>
				<div>
					<UserPosts
						user_email={user_email}
						access_token={access_token}
					/>
				</div>
			</Suspense>
		</>
	);
}
