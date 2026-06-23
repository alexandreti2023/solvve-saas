from pydantic import BaseModel


class ClientCreate(BaseModel):

    name: str

    cpf_cnpj: str

    phone: str

    email: str

    notes: str


class ClientResponse(ClientCreate):

    id: int

    user_id: int

    class Config:

        from_attributes = True