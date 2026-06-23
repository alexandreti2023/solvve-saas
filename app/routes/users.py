from fastapi import APIRouter
from app.schemas.user_schema import UserCreate
from app.models.user import User
from app.database.connection import SessionLocal
from app.services.auth_service import hash_password

router = APIRouter()


@router.post("/users")
def create_user(user: UserCreate):

    db = SessionLocal()

    try:

        new_user = User(
            name=user.name,
            email=user.email,
            password=hash_password(user.password)
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "Usuário criado com sucesso",
            "user": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email
            }
        }

    finally:

        db.close()


@router.get("/users")
def list_users():

    db = SessionLocal()

    try:

        return db.query(User).all()

    finally:

        db.close()

@router.get("/users/{user_id}")
def get_user(user_id: int):

    db = SessionLocal()

    try:

        user = db.query(User).filter(
            User.id == user_id
        ).first()

        if not user:
            return {
                "error": "Usuário não encontrado"
            }

        return user

    finally:

        db.close()

