from pydantic import BaseModel, HttpUrl
from typing import Any

class AnalyzeRequest(BaseModel):
    repo_url: str
    branch: str = "main"

class AnalyzeResponse(BaseModel):
    analysis_id: str
    status: str
    analysis: dict