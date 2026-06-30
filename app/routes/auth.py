from fastapi import APIRouter, HTTPException

from app.database.connection import SessionLocal
from app.models.user import User

from app.schemas.auth_schema import LoginData
from fastapi import Depends

from app.core.security import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends

from app.services.auth_service import (
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):

    db = SessionLocal()

    try:

        user = db.query(User).filter(
            User.email == form_data.username
        ).first()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Email ou senha inválidos"
            )

        valid_password = verify_password(
            form_data.password,
            user.password
        )

        if not valid_password:
            raise HTTPException(
                status_code=401,
                detail="Email ou senha inválidos"
            )

        token = create_access_token(
            data={
            "user_id": user.id,
            "email": user.email,
            "company_id": user.company_id
        }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    finally:

        db.close()

@router.get("/me")
def me(
    current_user = Depends(get_current_user)
):

    return current_user