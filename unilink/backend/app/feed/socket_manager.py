from fastapi import WebSocket


class WebSocketManager:
    def __init__(self):
        self.active_connections = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)

    async def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: dict):
        for websocket in self.active_connections:
            await websocket.send_json(message)

    async def broadcast(self, message: dict):
        for websocket in self.active_connections:
            await websocket.send_json(message)
