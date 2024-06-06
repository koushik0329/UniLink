from fastapi import APIRouter
from fastapi import Depends
from fastapi import WebSocketDisconnect

from app.lib.helpers import validateAuth
from app.lib.exceptions import *
from app.lib.utils import *
from app.feed.socket_manager import *
from app.feed.prodcon import *

import asyncio

router = APIRouter(prefix="/feed", tags=["/feed"])
websocket_manager = WebSocketManager()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket_manager.connect(websocket)
    except Exception as e:
        print("INFO: WEBSOCKET CONNECT ERROR")
        print(e)

    try:
        count = 0
        while True:
            # count += 1
            # event = {
            #     "count": count,
            #     "double count": count * 2,
            # }
            for message in consumer:
                print(message.key)
                print(message.value)
                await websocket_manager.broadcast(message=message.value)
                await asyncio.sleep(3)
    except WebSocketDisconnect:
        await websocket_manager.disconnect(websocket)
        print("INFO: WEBSOCKET DISCONNECT")
    except Exception as e:
        print(e)
        await websocket_manager.disconnect(websocket)
        print("INFO: WEBSOCKET CLOSED")


@router.get("/feed")
def get_feed(email: str = Depends(validateAuth)):

    response = {"email": email}
    return response
