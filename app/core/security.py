from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.services.auth_service import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    print("TOKEN RECEBIDO:", token)

    credentials_exception = HTTPException(
        status_code=401,
        detail="Token inválido"
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("PAYLOAD:", payload)

        user_id = payload.get("user_id")
        email = payload.get("email")

        if user_id is None:
            raise credentials_exception

        return {
            "user_id": user_id,
            "email": email
        }

    except Exception as e:

        print("ERRO:", str(e))

        raise credentials_exception