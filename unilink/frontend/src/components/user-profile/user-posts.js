import sendUserPostsRequest from "@/api-calls/user-posts-request";
import UserPost from "./user-post";

export default async function UserPosts({ user_email, access_token }) {
	const userPosts = await sendUserPostsRequest({ user_email, access_token });

	return (
		<div>
			<div className="flex flex-wrap justify-center p-3 mb-5 mt-5 space-x-5 space-y-5">
				{userPosts?.length ? (
					userPosts.map((userPost) => (
						<UserPost key={userPost.id} post={userPost} />
					))
				) : (
					<p>No posts found</p>
				)}
			</div>
		</div>
	);
}
