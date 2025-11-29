from models.autocomplete import AutoCompleteRequest
from langchain_community.llms import Ollama  # or ChatGroq, HuggingFaceEndpoint, etc.
from langchain_core.prompts import PromptTemplate

llm = Ollama(
    model="llama2",         
    temperature=0.1,       
    num_predict=64,         
)

prompt = PromptTemplate(
    input_variables=["language", "code", "cursor_pos"],
    template=(
        "You are an autocomplete engine for a code editor.\n"
        "Language: {language}\n"
        "Cursor index in the code string: {cursor_pos}\n\n"
        "Full file content (as a single string):\n"
        "{code}\n\n"
        "Your job:\n"
        "- Think about what code should be inserted at the cursor.\n"
        "- OUTPUT ONLY THE CODE TO INSERT.\n"
        "- NO explanations.\n"
        "- NO comments.\n"
        "- NO markdown.\n"
        "- NO surrounding text.\n"
        "- If you are not sure, output a very small placeholder like `pass` or `# TODO`.\n"
    ),
)

autocomplete_chain = prompt | llm




def get_llama_suggestion(payload: AutoCompleteRequest) -> str:

    code = payload.code
    cursor_pos = payload.cursor_position
    language = payload.language

    result = autocomplete_chain.invoke({
        "language": payload.language,
        "code": payload.code,
        "cursor_pos": payload.cursor_position,
    })


    suggestion = result.strip()


    if not suggestion:
        suggestion = ""

    return suggestion

def mock_suggestion(payload: AutoCompleteRequest) -> str:
  code = payload.code
  language = payload.language.lower()

  if language =="python":
    if "def" in code and "pass" not in code:
      return "    pass"
    
