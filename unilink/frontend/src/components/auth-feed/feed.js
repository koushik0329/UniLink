"use client";
import { useEffect, useRef, useState } from "react";

export default function AuthFeed({ auth_connections }) {
	const [event, setEvent] = useState();

	const wsRef = useRef(null);
	const handleOpen = () => {
		console.log("WebSocket connected");
	};
	const handleMessage = (event) => {
		console.log("message received");
		const message = JSON.parse(event.data);
		setEvent((prev) => message);
		console.log(message);
		// console.log(event);
	};
	const handleClose = () => {
		console.log("WebSocket disconnected");
	};
	useEffect(() => {
		wsRef.current = new WebSocket("ws://localhost:8000/feed/ws");
		wsRef.current.onopen = handleOpen;
		wsRef.current.onmessage = handleMessage;
		wsRef.current.onclose = handleClose;

		return () => {
			wsRef.current.close();
		};
	}, []);
	return (
		<div>
			websocket client : real time feed updates dd
			<div className="border border-red-500">
				followers : {JSON.stringify(auth_connections)}
			</div>
			<div className="border border-green-500">
				recent received event : {JSON.stringify(event)}
			</div>
		</div>
	);
}
