from fastapi import APIRouter, Depends
from fastapi import APIRouter, Depends, HTTPException
from fastapi import HTTPException
from app.database.connection import SessionLocal
from app.models.client import Client
from app.schemas.client_schema import ClientCreate, ClientResponse  

from app.core.security import (
    get_current_user
)

router = APIRouter()


@router.post(
    "/clients",
    response_model=ClientResponse
)
def create_client(
    data: ClientCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    client = Client(
        name=data.name,
        cpf_cnpj=data.cpf_cnpj,
        phone=data.phone,
        email=data.email,
        notes=data.notes,
        user_id=current_user["user_id"]
    )

    db.add(client)

    db.commit()

    db.refresh(client)

    return client


@router.get(
    "/clients",
    response_model=list[ClientResponse]
)
def list_clients(
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    return db.query(Client).filter(
        Client.user_id ==
        current_user["user_id"]
    ).all()

@router.get(
    "/clients/{client_id}",
    response_model=ClientResponse
)
def get_client(
    client_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    client = db.query(Client).filter(
        Client.id == client_id,
        Client.user_id == current_user["user_id"]
    ).first()

    if not client:

        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado"
        )

    return client

@router.delete("/clients/{client_id}")
def delete_client(
    client_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    client = db.query(Client).filter(
        Client.id == client_id,
        Client.user_id == current_user["user_id"]
    ).first()

    if not client:
        return {"error": "Cliente não encontrado"}

    db.delete(client)

    db.commit()

    return {"message": "Cliente removido"}

@router.put(
    "/clients/{client_id}",
    response_model=ClientResponse
)
def update_client(
    client_id: int,
    data: ClientCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    client = db.query(Client).filter(
        Client.id == client_id,
        Client.user_id == current_user["user_id"]
    ).first()

    if not client:

        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado"
        )

    client.name = data.name
    client.cpf_cnpj = data.cpf_cnpj
    client.phone = data.phone
    client.email = data.email
    client.notes = data.notes

    db.commit()

    db.refresh(client)

    return client

@router.get(
    "/clients/{client_id}",
    response_model=ClientResponse
)
def get_client(
    client_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    client = db.query(Client).filter(
        Client.id == client_id,
        Client.user_id == current_user["user_id"]
    ).first()

    if not client:
        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado"
        )

    return client