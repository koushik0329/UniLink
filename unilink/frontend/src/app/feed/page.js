import { cookies } from "next/headers";

import sendAuthConnectionsRequest from "@/api-calls/auth-connections-request";
import AuthFeed from "@/components/auth-feed/feed";

export default async function Feed() {
	// const access_token = cookies().get("access_token")?.value;
	// const auth_connections = await sendAuthConnectionsRequest({ access_token });

	const auth_connections = [
		{ email: "ash@gmail.com", name: "ash@gmail.com" },
		{ email: "mikey@gmail.com", name: "mikey" },
		{ email: "peter@gmail.com", name: "peter" },
		{ email: "user2@gmail.com", name: "user2" },
		{ email: "user3@gmail.com", name: "user3" },
		{ email: "james@gmail.com", name: "james" },
	];

	return (
		<div>
			<AuthFeed auth_connections={auth_connections} />
		</div>
	);
}
