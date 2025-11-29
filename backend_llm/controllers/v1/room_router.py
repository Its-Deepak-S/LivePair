from fastapi import APIRouter, Depends , HTTPException, status
from sqlalchemy.orm import Session
from db.sesison import get_db
from services.room_service import (create_room , get_room_by_id)
from models.rooms import RoomResponse
from models.autocomplete import AutoCompleteRequest , AutoCompleteResponse
from services.autocomplete_service import mock_suggestion
from services.autocomplete_service import get_llama_suggestion

router =  APIRouter(prefix="/v1", tags=["rooms"])

@router.post("/rooms" , response_model=RoomResponse)
def create_room_endpoint(db:Session = Depends(get_db)) -> RoomResponse:
  room = create_room(db)
  return get_room_by_id(db, room_id = room.room_id)

@router.get("/room/{room_id}",response_model=RoomResponse)
def get_room(room_id:str , db:Session = Depends(get_db)) -> RoomResponse:

  room = get_room_by_id(db, room_id)
  if room is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Room not found")
  return RoomResponse(roomId=room_id) 

@router.post("/autocomplete",response_model=AutoCompleteResponse, tags=["autocomplete"])
def autocomplete(payload: AutoCompleteRequest) -> AutoCompleteResponse:
  suggestion = get_llama_suggestion(payload)
  return AutoCompleteResponse(suggestion=suggestion)
