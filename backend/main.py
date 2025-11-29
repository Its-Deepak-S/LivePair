from fastapi import FastAPI
from controllers.v1.room_router import router as rooms_router 
from controllers.v1.websockets import router as websocket_router

app = FastAPI()

app.include_router(rooms_router)
app.include_router(websocket_router)
