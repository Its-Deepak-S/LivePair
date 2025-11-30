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

## Backend Folder Sturcture
```text
backend/
│
├── main.py
├── dependencies.txt
├── .env
│
├── core/
│   ├── config.py
│   └── __init__.py
│
├── controllers/
│   └── v1/
│       ├── room_router.py
│       ├── websockets.py
│       └── __init__.py
│
├── db/
│   ├── session.py
│   └── __init__.py
│
├── models/
│   ├── rooms.py
│   ├── autocomplete.py
│   └── __init__.py
│
├── schemas/
│   ├── room.py
│   └── __init__.py
│
└── services/
    ├── room_service.py
    └── autocomplete_service.py
```

### main.py 
* Includes routers, middleware, startup logic, and table creation.
### core/
* config.py

  Loads environment variables and sets up other configurations

### controllers/

Contains the versioned API folders holding the routes

* v1/

  * API versionining folder. Contains the API endpoints that are exposed.

### db/

* session.py

  Responsible for database connection and session management.

### models/

* Pydantic request/response models for API input and output.

### schemas/

* Contains the SQLAlchemy database models

### services/

* Contains business logic



## -- Backend Setup

1. Navigate to backend folder

   ```bash
   cd backend
   ```
   

3. Create and activate the virtual environment

   ```bash
   python -m venv .venv
   
   /.venv/Scripts/Activate.ps1
   ```
5. Install dependencies

   ```bash
   pip install -r dependencies.txt
   ```
   OR
   
   
   to install manually
   ```
   pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary pydantic-settings
   ```
7. Create .env file

   Example env file has been provided.

9. Start the backend server

   ```bash
   uvicorn main:app --reload
   ```
**Backend will run at http://127.0.0.1:8000**

---

## -- Frontend Setup

1. Navigate to frontend
   ```bash
   cd frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```

3. Start dev server
   ```bash
   npm run dev
   ```

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


  

