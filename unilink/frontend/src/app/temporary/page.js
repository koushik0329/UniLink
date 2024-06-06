import { useEffect, useRef } from "react";

export default function WebSocketClient() {
	const wsRef = useRef(null);

	const handleOpen = () => {
		console.log("WebSocket connected");
	};

	const handleMessage = (event) => {
		console.log("message received");
		const message = JSON.parse(event.data);
		console.log(event);
		console.log(message);
	};

	const handleClose = () => {
		console.log("WebSocket disconnected");
	};

	// useEffect(() => {
	// 	wsRef.current = new WebSocket("ws://localhost:8000/feed/ws");
	// 	wsRef.current.onopen = handleOpen;
	// 	wsRef.current.onmessage = handleMessage;
	// 	wsRef.current.onclose = handleClose;

	// 	return () => {
	// 		wsRef.current.close();
	// 	};
	// }, []);

	return (
		<div>
			<p>WebSocket Client</p>
		</div>
	);
}
