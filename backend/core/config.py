from pydantic_settings import BaseSettings


# Configuring and using variables from the .env file

class Settings(BaseSettings):
  PROJECT_NAME : str = "Pair programming assignment"
  DATABASE_URL : str
  ALLOWED_ORIGINS : str
  DEBUG : bool

  class Config:
    env_file = ".env"
    env_file_encoding = "utf-8"
    case_sensitive = "True"

settings = Settings()
