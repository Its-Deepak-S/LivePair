from __future__ import annotations

import secrets
from typing import Optional
from sqlalchemy.orm import Session
from schemas.room import Room


ROOM_ID_BYTES = 4

def private_create_roomId() -> str:  # Create unique room ID
  return secrets.token_hex(ROOM_ID_BYTES)

def private_generate_room_id(db:Session) -> str: # Checks for unique ID
  while True:
    internal_id = private_create_roomId()
    existing = get_room_by_id(db,internal_id)
    if existing is None:
      return internal_id
    

def create_room(db:Session) -> Room :  # Unique Room ID

  room_id = private_generate_room_id(db)
  
  room = Room(room_id = room_id)
  db.add(room)
  db.commit()
  db.refresh(room)

  return room

def get_room_by_id(db:Session , room_id : str) -> Optional[Room]:
  return db.query(Room).filter(Room.room_id == room_id).first()

def update_saved_code(db:Session ,room_id:str,  code:str) -> Optional[Room]:
  room = get_room_by_id(db,room_id)
  if room is None:
    return None

  room.saved_code = code
  db.add(room)
  db.commit()
  db.refresh

  return room
