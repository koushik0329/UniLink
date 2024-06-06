import { CardContent } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";

const FormFields = ({ email, setEmail, password, setPassword }) => (
	<>
		<CardContent>
			<Input
				type="email"
				name="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoComplete="email"
			/>
		</CardContent>

		<CardContent>
			<Input
				type="password"
				name="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoComplete="current-password"
			/>
		</CardContent>
	</>
);

export default FormFields;
