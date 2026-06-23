from pydantic import BaseModel


class ProcessCreate(BaseModel):

    number: str

    title: str

    court: str

    status: str
    
    client_id: int

class ProcessResponse(ProcessCreate):

    id: int

    user_id: int

    client_name: str | None = None

    class Config:

        from_attributes = True