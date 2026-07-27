from uuid import uuid4

from fastapi import APIRouter

from app.schemas.analysis import AnalyzeRequest, AnalyzeResponse
from app.services.pipeline_service import PipelineService

router = APIRouter(
    prefix="/analyze",
    tags=["Analysis"],
)

pipeline = PipelineService()


@router.post("/", response_model=AnalyzeResponse)
async def analyze_repository(request: AnalyzeRequest):

    result = pipeline.analyze_repository(
        repo_url=str(request.repo_url),
        branch=request.branch,
    )

    return AnalyzeResponse(
        analysis_id=str(uuid4()),
        status="completed",
        message="Repository analyzed successfully.",
        result=result,
    )