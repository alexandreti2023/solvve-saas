from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine

from app.routes.home import router as home_router
from app.routes.health import router as health_router
from app.routes.users import router as users_router
from app.routes.auth import router as auth_router
from app.routes.calculations import router as calculations_router
from app.routes.clients import router as clients_router
from app.routes.processes import router as processes_router
from app.routes.documents import router as document_router

from app.models.user import User
from app.models.calculation import Calculation
from app.models.client import Client
from app.models.document import Document

app = FastAPI()

Base.metadata.create_all(bind=engine)
app.include_router(document_router)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(home_router)
app.include_router(health_router)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(calculations_router)
app.include_router(clients_router)
app.include_router(processes_router)
app.include_router(document_router)