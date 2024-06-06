import { cookies } from "next/headers";
import { AuthInfo } from "@/components/auth-profile/auth-info";
import { AuthConnections } from "@/components/auth-profile/auth-connections";
import AuthPosts from "@/components/auth-profile/auth-posts";

export default async function AuthProfile() {
	const access_token = cookies().get("access_token")?.value;

	return (
		<div>
			<AuthInfo />
			<div className="flex justify-center">
				<AuthConnections />
			</div>
			<div>
				<AuthPosts />
			</div>
		</div>
	);
}
