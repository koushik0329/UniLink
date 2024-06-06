"use client";

import { useContext } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/ui/card";
import { AiFillLike } from "react-icons/ai";
import UpdateButton from "../update-button";
import { Button } from "@/shadcn/ui/button";
import { AuthPostsContext } from "./auth-posts";

export default function AuthPost({ post }) {
	const { handleDeleteSubmit, isDeleteRequestPending } =
		useContext(AuthPostsContext);

	const handleDeleteClick = (e) => {
		e.preventDefault();
		handleDeleteSubmit({ postid: post.id });
	};

	return (
		<Card key={post.id} className="w-[250px] h-max-[350px] ">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{post.description}</p>
			</CardContent>
			<div className="flex flex-row">
				<CardContent>{post.interested}     👍</CardContent>
			</div>
			<CardFooter className="flex justify-between">
				<Button
					variant="outline"
					size="sm"
					className="h-7"
					disabled={isDeleteRequestPending}
					onClick={(e) => handleDeleteClick(e, post.id)}
				>
					❌
				</Button>
				<UpdateButton post={post} />
			</CardFooter>
		</Card>
	);
}
