from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker , declarative_base
from core.config import settings

Base = declarative_base()

engine = create_engine(settings.DATABASE_URL , echo = True)

SessionLocal = sessionmaker(bind = engine , autoflush=False , autocommit = False)

# To get database session
def get_db():
  db=SessionLocal()
  try:
    yield db
  finally:
    db.close()

# Creates schemas when app runs
def create_tables():
  Base.metadata.create_all(bind=engine)
