"use client";
import { useState } from "react";
import { useAuthToken } from "@/context/AuthTokenProvider";
import sendAuthPostsRequest from "@/api-calls/auth-posts-request";

const useAuthPosts = () => {
	const { auth } = useAuthToken();

	const [authPosts, setAuthPosts] = useState([]);
	const [isAuthPostsLoading, setIsAuthPostsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const handleGetAuthPosts = async () => {
		setIsAuthPostsLoading((prev) => true);
		try {
			const access_token = auth.access_token;
			const data = await sendAuthPostsRequest({ access_token });
			console.log("request sent");
			setAuthPosts(data);
		} catch (error) {
			setIsError((prev) => true);
			console.log("useAuthConnections error");

			const empty_posts = [];
			setAuthPosts(empty_posts);
		}
		setIsAuthPostsLoading((prev) => false);
	};

	return {
		authPosts,
		setAuthPosts,
		isAuthPostsLoading,
		handleGetAuthPosts,
		isError,
	};
};
export default useAuthPosts;
