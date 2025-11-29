# Real Time Pair Programming Web App

## Tech Stack Used

### -- Backend 
● Python 

● FastAPI

● WebSockets

● SQLAlchemy ORM

● PostgreSQL

● Pydantic 

● Uvicorn

### -- Frontend
● React (Vite)

● TypeScript

● Redux Toolkit

---

## -- Backend Setup

1. Navigate to backend folder

   cd backend

3. Create and activate the virtual environment

   python -m venv .venv
   
   /.venv/Scripts/Activate.ps1
   
5. Install dependencies

   pip install -r dependencies.txt

   OR

   to install manually

   pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary pydantic-settings

7. Create .env file

   Example env file has been provided.

9. Start the backend server

   uvicorn main:app --reload

**Backend will run at http://127.0.0.1:8000**

---

## -- Frontend Setup

1. Navigate to frontend

   cd frontend

2. Install dependencies

   npm install

3. Start dev server

   npm run dev

**Frontend runs at http://localhost:5173**

---

## Database Schema

#### Rooms table

| Column              | Type | Description |
| :---------------- | :------: | ----: |
| id        |   UUID/str   | Internal ID for the database and primary key |
| room_id           |   String   | Public room ID |
| created_at    |  DateTime   | Time of creation |
| updated_at |  DateTime   | Time of updation |
| saved_code |  text   | Persisted Code |

---

## Potential Improvements

* Add authentication and store user IDs in the database
* Add chat bar for communication
* Add support for more languages
* Implement deletion of rooms after certain time period
* Improve the AI autocomplete feature

---

## LLM Integration for Autocompletion

1. Navigate into the "backend_llm" folder instead of "backend"

2. Follow the same steps as mentioned above for the "backend" folder

**Note: You will need to have Ollama installed along with the appropriate model being used ( in this case LLama2)**

### Limitations

* Suggestions may not always be accurate
* The model may occasionally output extra text instead of pure code


  

