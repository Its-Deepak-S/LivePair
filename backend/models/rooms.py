from pydantic import BaseModel, Field , ConfigDict

class RoomCreate(BaseModel):
  language : str | None = "python"

class RoomResponse(BaseModel):
  model_config = ConfigDict(populate_by_name=True)
  room_id: str = Field(... , alias="roomId")
  