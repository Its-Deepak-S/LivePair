from pydantic import BaseModel , Field, ConfigDict

class AutoCompleteRequest(BaseModel):
  model_config = ConfigDict(populate_by_name=True)

  code : str
  cursor_position : int = Field(... , alias="cursorPosition")
  language : str = "python"


class AutoCompleteResponse(BaseModel):
  suggestion : str

