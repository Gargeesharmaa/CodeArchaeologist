from fastapi import FastAPI
from app.core.config import settings
from app.api.analyze import router as analyze_router

app=FastAPI(
    title=settings.APP_NAME,
    version= settings.APP_VERSION
)

app.include_router(analyze_router)

@app.get("/")
async def root():
    return{
        "message":f"{settings.APP_NAME} is running"
    }

@app.get("/health")
async def health_check():
    return{
        "status":"healthy"
    }