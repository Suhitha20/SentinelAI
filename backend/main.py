from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from backend.config import settings
from backend.routers import disasters
from backend.database import engine, Base

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    logger.info("Starting SENTINEL AI application...")
    Base.metadata.create_all(bind=engine)
    yield
    logger.info("Shutting down SENTINEL AI application...")


app = FastAPI(
    title="SENTINEL AI",
    description="Adaptive disaster intelligence platform for emergency response coordination",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(disasters.router, prefix="/api/v1", tags=["disasters"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "operational",
        "service": "SENTINEL AI",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "database": "connected",
        "api": "operational"
    }
