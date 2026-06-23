from fastapi import (
    APIRouter,
    Depends
)

from app.database.connection import SessionLocal

from app.models.process_event import ProcessEvent

from app.schemas.process_event_schema import (
    ProcessEventCreate,
    ProcessEventResponse
)

from app.core.security import (
    get_current_user
)

router = APIRouter()


@router.post(
    "/process-events",
    response_model=ProcessEventResponse
)
def create_event(
    data: ProcessEventCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    event = ProcessEvent(
        title=data.title,
        description=data.description,
        event_date=data.event_date,
        process_id=data.process_id
    )

    db.add(event)

    db.commit()

    db.refresh(event)

    return event


@router.get(
    "/process-events/{process_id}",
    response_model=list[ProcessEventResponse]
)
def list_events(
    process_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    return db.query(
        ProcessEvent
    ).filter(
        ProcessEvent.process_id == process_id
    ).all()