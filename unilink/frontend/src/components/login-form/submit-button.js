import { CardFooter } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";

const SubmitButton = ({ isLoading }) => {
	return (
		<CardFooter>
			<Button className="w-full" type="submit" disabled={isLoading}>
				Submit
			</Button>
		</CardFooter>
	);
};

export default SubmitButton;
