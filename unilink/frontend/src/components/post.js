"use client";

import { Button } from "@/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/ui/card";

import ViewUserButton from "./view-user-button";
import EditButton from "./update-button";

export default function Post({
	id,
	title,
	description,
	interested,
	inAuthMode,
}) {
	return (
		<Card key={id} className="w-[250px] h-max-[350px] ">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{description}</p>
			</CardContent>
			<CardContent>
				<p>Interested : {interested}</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				{inAuthMode ? (
					<>
						<Button size="sm">edit</Button>
						<Button size="sm">delete</Button>
						<EditButton
							id={id}
							title={title}
							description={description}
						/>
					</>
				) : (
					<>
						<Button>interested/uninterested</Button>
						<ViewUserButton />
					</>
				)}
			</CardFooter>
		</Card>
	);
}
