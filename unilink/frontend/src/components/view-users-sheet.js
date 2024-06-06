"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shadcn/ui/sheet";
import { CiUser } from "react-icons/ci";
import { Button } from "@/shadcn/ui/button";
import ViewUserButton from "@/components/view-user-button";

export default function ViewUsersSheet({ category = "", users_list = [] }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="sm" className="h-7">
					{category}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{category}</SheetTitle>
					{users_list?.length
						? users_list.map((user, index) => (
								<div
									key={index}
									className="flex space-x-2 justify-between"
								>
									<CiUser size={"20"} />
									<p className="font-medium">{user.name}</p>
									<ViewUserButton email={user.email} />
								</div>
						  ))
						: "None"}
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
