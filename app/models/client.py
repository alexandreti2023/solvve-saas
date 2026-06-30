from sqlalchemy import Column, Integer, String, ForeignKey

from app.database.base import Base


class Client(Base):

    __tablename__ = "clients"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(String)

    cpf_cnpj = Column(String)

    phone = Column(String)

    email = Column(String)

    notes = Column(String)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )
    company_id = Column(
    Integer,
    ForeignKey("companies.id"),
    nullable=True
)