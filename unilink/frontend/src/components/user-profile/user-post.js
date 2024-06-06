"use client";
import { useState } from "react";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/ui/card";
import { ToggleInterestedButton } from "../toggle-interested-button";

export default function UserPost({ post }) {
	const [interestedCount, setInterestedCount] = useState(post.interested);
	const [isInterested, setIsInterested] = useState(post.isAuthInterested);

	return (
		<Card key={post.id} className="w-[250px] h-max-[350px] ">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{post.description}</p>
			</CardContent>
			<CardContent>
				<p>👍 : {interestedCount}</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<ToggleInterestedButton
					post={post}
					setInterestedCount={setInterestedCount}
					interestedCount={interestedCount}
					isInterested={isInterested}
					setIsInterested={setIsInterested}
				/>
			</CardFooter>
		</Card>
	);
}
