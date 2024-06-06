"use client";
import { createContext, useEffect, useState } from "react";

import useAuthPosts from "@/hooks/auth-profile/useAuthPosts";
import useDeleteAction from "@/hooks/cud/useDeleteAction";

import AuthPost from "./auth-post";
import useUpdateAction from "@/hooks/cud/useUpdateAction";

export const AuthPostsContext = createContext();

export default function AuthPosts() {
	const {
		handleUpdateSubmit,
		isUpdateRequestPending,
		updateStatus,
		updatedPost,
	} = useUpdateAction();
	const onUpdateEffect = () => {
		if (isUpdateRequestPending) return;
		if (!updateStatus) return;

		const postIndex = authPosts.findIndex(
			(post) => post.id === updatedPost.id
		);

		const toUpdatePost = updatedPost;

		toUpdatePost.interested = authPosts[postIndex].interested;
		const updatedPosts = [...authPosts];
		updatedPosts[postIndex] = toUpdatePost;
		setAuthPosts(updatedPosts);
	};
	useEffect(onUpdateEffect, [
		isUpdateRequestPending,
		updateStatus,
		updatedPost,
	]);

	const {
		handleDeleteSubmit,
		isDeleteRequestPending,
		deleteStatus,
		deleteId,
	} = useDeleteAction();
	const onDeleteEffect = () => {
		if (isDeleteRequestPending) return;
		if (!deleteStatus) return;
		if (!deleteId) return;

		const updatedPosts = authPosts.filter((post) => post.id !== deleteId);
		setAuthPosts((prev) => updatedPosts);
	};
	useEffect(onDeleteEffect, [isDeleteRequestPending, deleteStatus, deleteId]);

	const {
		authPosts,
		setAuthPosts,
		isAuthPostsLoading,
		handleGetAuthPosts,
		isError,
	} = useAuthPosts();
	const authPostsEffect = () => {
		handleGetAuthPosts();
	};
	useEffect(authPostsEffect, []);

	if (isAuthPostsLoading) return;
	<div className="text-center mt-10">Your posts are loading ...</div>;
	if (!authPosts?.length || isError)
		return <div className="text-center mt-10">No Posts Found</div>;

	return (
		<AuthPostsContext.Provider
			value={{
				setAuthPosts,
				handleDeleteSubmit,
				isDeleteRequestPending,
				handleUpdateSubmit,
				isUpdateRequestPending,
				updateStatus,
				updatedPost,
			}}
		>
			<div className="flex flex-wrap justify-center p-3 mb-5 mt-5 space-x-5 space-y-5">
				{authPosts?.length ? (
					authPosts.map((authPost) => (
						<AuthPost key={authPost.id} post={authPost} />
					))
				) : (
					<p>No posts found</p>
				)}
			</div>
		</AuthPostsContext.Provider>
	);
}
