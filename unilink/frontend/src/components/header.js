"use client";
import Link from "next/link";

import SearchBar from "./search-bar";
import { useAuthToken } from "@/context/AuthTokenProvider";

import { IoAddSharp } from "react-icons/io5";
import { TbFileLike } from "react-icons/tb";

import LogOutButton from "./logout-button";

export default function Header() {
	const { auth } = useAuthToken();
	return auth?.access_token ? <AuthHeader /> : <UnAuthHeader />;
}

function AuthHeader() {
	return (
		<header className="mt-[10px] mb-[30px]">
			<div className="flex justify-between space-x-5 items-center mx-5 mb-10">
				<Link
					className=" hover:underline underline-offset-4"
					href="/profile"
				>
					UniLink
				</Link>
				{/* <Link href="/feed">📝</Link> */}
				<Link className="flex flex-row" href="/likes">
					<TbFileLike />
				</Link>
				<Link href="/create">
					<IoAddSharp color="white" size={"20"} />
				</Link>
				{/* <Link href="/notfound">
					<IoAddSharp color="blue" size={"20"} />
				</Link> */}
				<SearchBar />
				<LogOutButton />
			</div>
		</header>
	);
}

function UnAuthHeader() {
	return (
		<header>
			<div className="flex justify-between items-center text-xl mx-5 mb-10">
				<p className="hover:underline underline-offset-4 mt-3">
					<Link href="/">UniLink</Link>
				</p>
			</div>
		</header>
	);
}
