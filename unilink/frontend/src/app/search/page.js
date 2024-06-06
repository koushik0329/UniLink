"use client";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

import ViewUserButton from "@/components/view-user-button";
import useSearchAction from "@/hooks/useSearchAction";
import Loading from "../loading";

import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function SearchPage() {
	const searchParams = useSearchParams();
	const quser = searchParams.get("query");

	const { searchResult, handleSearch, isSearchPending } = useSearchAction();

	const handleSearchEffect = () => {
		const query_params = {
			quser: quser,
		};

		handleSearch(query_params);
	};

	useEffect(handleSearchEffect, [quser]);

	if (isSearchPending) return <Loading />;
	return (
		<div className="flex flex-col space-y-4 mx-20 mt-20 content-center">
			<h1>Search Results for : {JSON.stringify(quser)}</h1>
			<div className="space-y-4 items-stretch content-center">
				{searchResult?.length ? (
					searchResult.map((user, index) => (
						<div
							key={index}
							className="flex space-x-2 justify-between"
						>
							<CiUser size={"20"} />
							<p className="font-medium">{user.name}</p>
							<ViewUserButton email={user.email} />
						</div>
					))
				) : (
					<p>Not Found!</p>
				)}
			</div>
		</div>
	);
}
