import { Button } from "@/shadcn/ui/button";
import useLogOutAction from "@/hooks/auth/useLogOutAction";

const LogOutButton = () => {
	const { handleLogOut, isRequestPending } = useLogOutAction();

	const handleLogOutClick = (e) => {
		e.preventDefault();
		handleLogOut();
	};

	return (
		<Button
			variant="secondary"
			className=" h-7"
			onClick={handleLogOutClick}
			disabled={isRequestPending}
		>
			Log Out
		</Button>
	);
};

export default LogOutButton;
