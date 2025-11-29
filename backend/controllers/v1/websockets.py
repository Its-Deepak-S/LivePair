from fastapi import APIRouter, WebSocket, WebSocketDisconnect , Depends, status
from sqlalchemy.orm import Session
from db.sesison import get_db
from services.room_service import get_room_by_id
from services.room_service import update_saved_code

router = APIRouter(prefix="/v1",tags=["websocket"])


# Manages Websockets Connections
class ConnectionManager:
  def __init__(self):
    self.active_connections : dict[str,set[WebSocket]] = {}
    self.room_code_state : dict[str,str] = {}

  # Function to connect
  async def connect(self,room_id:str, websocket : WebSocket):
    await websocket.accept()

    if room_id not in self.active_connections:
      self.active_connections[room_id]=set()
    self.active_connections[room_id].add(websocket)

    existing_code = self.room_code_state.get(room_id)
    if existing_code is not None:
      await websocket.send_text(existing_code)
  
  # Function to disconnect
  def disconnect(self,room_id:str, websocket: WebSocket):
    connections = self.active_connections.get(room_id)
    if connections and websocket in connections:
      connections.remove(websocket)
      if not connections:
        pass
  
  # To display messages to all other connections
  async def broadcast(self,room_id: str, message: str, sender:WebSocket| None=None ):
    connections = self.active_connections.get(room_id,set())
    for connection in list(connections):
      if connection is sender:
        continue
      try:
        await connection.send_text(message)
      except Exception:
        connections.remove(connection)

manager = ConnectionManager()


#Websockets endpoint
@router.websocket("/ws/{room_id}")
async def websocket(websocket: WebSocket, room_id: str, db:Session = Depends(get_db)):
  
  #checking if room exists
  room = get_room_by_id(db,room_id)   
  if room is None:
    await websocket.close()
    return
  
  await manager.connect(room_id,websocket)

  try:
    #Receives and broadcasts messages
    while True:
      code = await websocket.receive_text()
      manager.room_code_state[room_id] = code

      await manager.broadcast(room_id,code,sender=websocket)

  except WebSocketDisconnect:
    # remove socket from the room
    manager.disconnect(room_id,websocket)

    #persist final code to DB
    if manager.room_code_state.get(room_id):
      update_saved_code(db, room_id, manager.room_code_state[room_id])

