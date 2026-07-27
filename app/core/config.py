from pydantic_settings import BaseSettings, SettingsConfigDict

class settings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool = False
    TEMP_REPO_DIR: str

    model_config= SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings= settings()  