from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyze import router as analyze_router
from app.core.config import settings

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

# Define allowed origins (your React/Vite dev server)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(analyze_router)


@app.get("/")
async def root():
    return {"message": f"{settings.APP_NAME} is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}