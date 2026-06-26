from fastapi import APIRouter
from sqlalchemy import func

from app.database.connection import SessionLocal

from app.models.user import User
from app.models.client import Client
from app.models.process import Process
from app.models.document import Document

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Backend Solvve Online"
    }


@router.get("/dashboard")
def dashboard():

    db = SessionLocal()

    try:

        users = db.query(func.count(User.id)).scalar()

        clients = db.query(func.count(Client.id)).scalar()

        processes = db.query(func.count(Process.id)).scalar()

        documents = db.query(func.count(Document.id)).scalar()

        return {
            "users": users,
            "clients": clients,
            "processes": processes,
            "documents": documents
        }

    finally:
        db.close()