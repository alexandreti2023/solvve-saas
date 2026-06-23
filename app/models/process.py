from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.base import Base
from sqlalchemy.orm import relationship

class Process(Base):

    __tablename__ = "processes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    number = Column(String)

    title = Column(String)

    court = Column(String)

    status = Column(String)

    client_id = Column(
        Integer,
        ForeignKey("clients.id")
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )
    client = relationship("Client")

    documents = relationship(
    "Document",
    back_populates="process",
    cascade="all, delete"
)