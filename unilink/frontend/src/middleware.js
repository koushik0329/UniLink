import { NextResponse } from "next/server";

export function middleware(request) {
	const access_token = request.cookies.get("access_token");
	const isAuthenticated = Boolean(access_token);

	const path = request.nextUrl.pathname;

	const isPublic = path == "/";
	const isPrivate = isPublic == false;

	if (isAuthenticated && isPrivate) return;

	if (isAuthenticated && isPublic) {
		const tourl = new URL("/profile", request.nextUrl);
		const response = NextResponse.redirect(tourl);
		return response;
	}

	if (!isAuthenticated && isPrivate) {
		const tourl = new URL("/", request.nextUrl);
		const response = NextResponse.redirect(tourl);
		return response;
	}
}

export const config = {
	matcher: [
		"/",
		"/profile",
		"/create",
		"/search",
		"/user/:useremail/",
		"/feed",
		"/likes",
	],
};
