from pydantic import BaseModel


class ProcessEventCreate(BaseModel):

    title: str
    description: str
    event_date: str
    process_id: int


class ProcessEventResponse(
    ProcessEventCreate
):

    id: int

    class Config:

        from_attributes = True