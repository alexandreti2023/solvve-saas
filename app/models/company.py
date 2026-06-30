from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.base import Base


class Company(Base):

    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    cnpj = Column(String, unique=True)

    email = Column(String)

    phone = Column(String)

    plan = Column(String, default="Starter")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )