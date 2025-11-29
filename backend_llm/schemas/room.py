from sqlalchemy import Column, String, Text , DateTime
from sqlalchemy.sql import func
from db.sesison import Base
import uuid

class Room(Base):
  __tablename__ = "rooms"

  id = Column(String , primary_key=True , default=lambda:str (uuid.uuid4()))

  room_id = Column(String, unique=True, nullable=False)
  
  created_at = Column(DateTime(timezone=True),server_default=func.now())
  updated_at = Column(DateTime(timezone=True),server_default=func.now(),onupdate=func.now())


  saved_code = Column(Text , nullable=True)

  