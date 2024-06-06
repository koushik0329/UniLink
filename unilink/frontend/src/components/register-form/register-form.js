import { useState } from "react";

import { Card, CardHeader, CardTitle } from "@/shadcn/ui/card";

import FormFields from "./form-fields";
import SubmitButton from "./submit-button";
import useRegisterAction from "@/hooks/auth/useRegisterAction";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { handleRegisterSubmit, isRequestPending } = useRegisterAction();

	const handleRegisterSubmitClick = (e) => {
		e.preventDefault();

		const credentials = {
			name: name,
			email: email,
			password: password,
		};

		//console.log(credentials);

		handleRegisterSubmit(credentials);
	};

	return (
		<form onSubmit={handleRegisterSubmitClick} method="post">
			<Card>
				<CardHeader>
					<CardTitle>Register</CardTitle>
				</CardHeader>

				<FormFields
					name={name}
					setName={setName}
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
