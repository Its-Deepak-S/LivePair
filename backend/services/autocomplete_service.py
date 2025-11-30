from models.autocomplete import AutoCompleteRequest


# Static Auto Complete
def mock_suggestion(payload: AutoCompleteRequest) -> str:
  code = payload.code
  language = payload.language.lower()

  if language =="python":
    if "def" in code and "pass" not in code:
      return "  (): pass" 
    elif "print" in code:
      return "('hello world')"
  
  

    
