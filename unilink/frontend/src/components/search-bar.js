"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Input } from "@/shadcn/ui/input";

const SearchBar = () => {
	const [query, setQuery] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();

	const handleEnter = (event) => {
		if (event.key !== "Enter") return;
		if (!query) return;

		const params = new URLSearchParams(searchParams);
		params.set("query", query);

		setQuery((prev) => "");

		router.push(`/search?${params.toString()}`);
		router.refresh();
	};

	return (
		<div className="flex w-[50vw] min-w-[500px] space-x-2">
			<Input
				name="search"
				className="h-8 focus-visible:ring-0 basis-5/6"
				type="text"
				placeholder="🔎 Search User"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleEnter}
			/>
		</div>
	);
};

export default SearchBar;
