"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import LoginForm from "@/components/login-form/login-form";
import RegisterForm from "@/components/register-form/register-form";

export default function Home() {
	return (
		<div className="w-[500px] mx-auto my-5 p-5">
			<Tabs defaultValue="login">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<LoginForm />
				</TabsContent>
				<TabsContent value="register">
					<RegisterForm />
				</TabsContent>
			</Tabs>
		</div>
	);
}
