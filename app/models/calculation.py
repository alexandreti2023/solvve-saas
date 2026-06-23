from sqlalchemy import Column, Integer, String, Float, ForeignKey

from app.database.base import Base


class Calculation(Base):

    __tablename__ = "calculations"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(String)

    value = Column(Float)

    result = Column(Float)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )