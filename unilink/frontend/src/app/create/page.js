"use client";

import { useEffect, useState } from "react";

import useCreateAction from "@/hooks/cud/useCreateAction";

import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { useToast } from "@/shadcn/ui/use-toast";
import { Textarea } from "@/shadcn/ui/textarea";

export default function Create() {
	const { toast } = useToast();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const { handleCreateSubmit, isRequestPending, createStatus } =
		useCreateAction();

	const handlePostSubmit = (e) => {
		e.preventDefault();
		if (!title || !description) {
			const toast_message = {};
			toast_message.title = "Kindly Enter Valid Info";

			toast(toast_message);
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);

		handleCreateSubmit({ formData });
	};

	const createEffect = () => {
		if (isRequestPending) return;
		if (!createStatus) return;
		setTitle("");
		setDescription("");
	};
	useEffect(createEffect, [isRequestPending, createStatus]);

	return (
		<form
			onSubmit={handlePostSubmit}
			className="flex flex-col space-y-5 max-w-[500px] mx-auto mt-20"
		>
			<Input
				value={title}
				onChange={(e) => {
					setTitle((prev) => e.target.value);
				}}
				className="text-xl"
				id="title"
				placeholder="Title"
				type="text"
			/>
			<Textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="min-h-[250px]"
				placeholder="Description"
				id="description"
				name="description"
			/>
			<Button type="submit" disabled={isRequestPending}>
				Submit
			</Button>
		</form>
	);
}
