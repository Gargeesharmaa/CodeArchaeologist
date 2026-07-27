from pydantic import BaseModel, HttpUrl
from typing import Any

class AnalyzeRequest(BaseModel):
    repo_url: HttpUrl
    branch: str = "main"

class AnalyzeResponse(BaseModel):
    analysis_id: str
    status: str
    message: str
    result: dict[str, Any]