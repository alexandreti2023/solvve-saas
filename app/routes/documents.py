from app.database.connection import SessionLocal
from app.models.document import Document
from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Form

import shutil
import os

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)
@router.post("/upload")
async def upload_document(
    process_id: int = Form(...),
    file: UploadFile = File(...)
):

    db = SessionLocal()

    os.makedirs(
        "uploads/processos",
        exist_ok=True
    )

    filepath = (
        f"uploads/processos/{file.filename}"
    )

    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    document = Document(
        filename=file.filename,
        filepath=filepath,
        process_id=process_id
    )

    db.add(document)

    db.commit()

    db.refresh(document)

    return {
        "message": "Arquivo enviado",
        "id": document.id,
        "filename": document.filename
    }
@router.get("/{process_id}")
def list_documents(process_id: int):

    db = SessionLocal()

    return db.query(Document).filter(
        Document.process_id == process_id
    ).all()