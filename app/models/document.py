from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    filepath = Column(String, nullable=False)

    process_id = Column(
        Integer,
        ForeignKey("processes.id")
    )

    process = relationship(
        "Process",
        back_populates="documents"
    )