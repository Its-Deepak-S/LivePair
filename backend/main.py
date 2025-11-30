from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from controllers.v1.room_router import router as rooms_router 
from controllers.v1.websockets import router as websocket_router
from db.sesison import create_tables
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000",  
    ],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


create_tables()

app.include_router(rooms_router)
app.include_router(websocket_router)

