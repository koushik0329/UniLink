import { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle } from "@/shadcn/ui/card";

import FormFields from "./form-fields";
import SubmitButton from "./submit-button";
import useLoginAction from "@/hooks/auth/useLoginAction";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { handleLoginSubmit, isRequestPending } = useLoginAction();

	const handleLoginFormSubmit = (e) => {
		//console.log("handleLoginFormSubmit method invoked");
		e.preventDefault();

		const credentials = {
			username: email,
			password: password,
		};

		handleLoginSubmit(credentials);
	};

	return (
		<form onSubmit={handleLoginFormSubmit} method="post">
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>

				<FormFields
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
				/>

				<SubmitButton isLoading={isRequestPending} />
			</Card>
		</form>
	);
}
