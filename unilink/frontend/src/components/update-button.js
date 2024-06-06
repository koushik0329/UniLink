"use client";

import { useContext, useEffect, useState } from "react";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shadcn/ui/sheet";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";

import { AuthPostsContext } from "./auth-profile/auth-posts";

export default function UpdateButton({ post }) {
	const [open, setOpen] = useState(false);
	const [updateTitle, setUpdateTitle] = useState(post.title);
	const [updateDescription, setUpdateDescription] = useState(
		post.description
	);

	const {
		handleUpdateSubmit,
		isUpdateRequestPending,
		updateStatus,
		updatedPost,
	} = useContext(AuthPostsContext);

	const handleUpdateClick = (e) => {
		e.preventDefault();
		console.log("handleUpdateClick invoked");

		if (!updateTitle) return;
		if (!updateDescription) return;

		const updatePost = {
			id: post.id,
			title: updateTitle,
			description: updateDescription,
		};

		handleUpdateSubmit({ updatePost });
	};

	const forSheetUpdateEffet = () => {
		if (isUpdateRequestPending) return;
		if (!updateStatus) return;
		setOpen((prev) => false);
	};
	useEffect(forSheetUpdateEffet, [
		isUpdateRequestPending,
		updateStatus,
		updatedPost,
	]);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="sm" className="h-7">
					✏
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader></SheetHeader>
			</SheetContent>
			<SheetContent onInteractOutside={(event) => event.preventDefault()}>
				<form
					onSubmit={handleUpdateClick}
					className="flex flex-col space-y-5 max-w-[500px] mx-auto mt-20"
				>
					<SheetTitle>Edit</SheetTitle>
					<Input
						value={updateTitle}
						onChange={(e) => {
							setUpdateTitle((prev) => e.target.value);
						}}
						className="text-xl"
						id="title"
						placeholder="Title"
						type="text"
					/>
					<Textarea
						value={updateDescription}
						onChange={(e) => setUpdateDescription(e.target.value)}
						className="min-h-[250px]"
						placeholder="Description"
						id="description"
					/>
					<Button type="submit" disabled={isUpdateRequestPending}>
						Submit
					</Button>
				</form>
			</SheetContent>
		</Sheet>
	);
}

// <SheetFooter>
// 	<SheetClose asChild>
// 		<Button type="submit">submit</Button>
// 	</SheetClose>
// </SheetFooter>;
