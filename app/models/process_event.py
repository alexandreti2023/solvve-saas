from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.base import Base


class ProcessEvent(Base):

    __tablename__ = "process_events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    description = Column(String)

    event_date = Column(String)

    process_id = Column(
        Integer,
        ForeignKey("processes.id")
    )