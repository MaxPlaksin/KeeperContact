from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str = 'sqlite:///./contacts.db'  # Добавь поле DATABASE_URL
    SECRET_KEY: str = 'supersecretkey'             # Другие поля
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    UPLOAD_DIR: str = './photos'
    telegram_token: str = ''
    admin_user_id: int = 0
    api_url: str = ''
    api_token: str = ''

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings()
