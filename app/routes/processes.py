from fastapi import APIRouter, Depends, HTTPException

from app.database.connection import SessionLocal

from app.models.process import Process
from app.models.client import Client

from app.schemas.process_schema import (
    ProcessCreate,
    ProcessResponse
)

from app.core.security import get_current_user

router = APIRouter()


@router.post(
    "/processes",
    response_model=ProcessResponse
)
def create_process(
    data: ProcessCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    process = Process(
    number=data.number,
    title=data.title,
    court=data.court,
    status=data.status,
    client_id=data.client_id,
    user_id=current_user["user_id"]
)

    db.add(process)

    db.commit()

    db.refresh(process)

    return process


@router.get(
    "/processes",
    response_model=list[ProcessResponse]
)
def list_processes(
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    processos = db.query(Process).filter(
        Process.user_id == current_user["user_id"]
    ).all()

    resultado = []

    for processo in processos:

        cliente = db.query(Client).filter(
            Client.id == processo.client_id
        ).first()

        resultado.append({

            "id": processo.id,
            "number": processo.number,
            "title": processo.title,
            "court": processo.court,
            "status": processo.status,
            "client_id": processo.client_id,
            "user_id": processo.user_id,
            "client_name": cliente.name if cliente else "Sem Cliente"

        })

    return resultado

@router.put(
    "/processes/{process_id}",
    response_model=ProcessResponse
)
def update_process(
    process_id: int,
    data: ProcessCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    process = db.query(Process).filter(
        Process.id == process_id,
        Process.user_id == current_user["user_id"]
    ).first()

    if not process:

        raise HTTPException(
            status_code=404,
            detail="Processo não encontrado"
        )

    process.number = data.number
    process.title = data.title
    process.court = data.court
    process.status = data.status
    process.client_id = data.client_id

    db.commit()

    db.refresh(process)

    return process


@router.delete(
    "/processes/{process_id}"
)
def delete_process(
    process_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    process = db.query(Process).filter(
        Process.id == process_id,
        Process.user_id == current_user["user_id"]
    ).first()

    if not process:

        raise HTTPException(
            status_code=404,
            detail="Processo não encontrado"
        )

    db.delete(process)

    db.commit()

    return {
        "message": "Processo removido com sucesso"
    }

@router.get(
    "/processes/{process_id}",
    response_model=ProcessResponse
)
def get_process(
    process_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    process = db.query(Process).filter(
        Process.id == process_id,
        Process.user_id == current_user["user_id"]
    ).first()

    if not process:

        raise HTTPException(
            status_code=404,
            detail="Processo não encontrado"
        )

    return {
        "id": process.id,
        "number": process.number,
        "title": process.title,
        "court": process.court,
        "status": process.status,
        "client_id": process.client_id,
        "user_id": process.user_id,
        "client_name": (
            process.client.name
            if process.client
            else "Sem Cliente"
        )
    }