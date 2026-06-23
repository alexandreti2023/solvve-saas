from pydantic import BaseModel


class CalculationCreate(BaseModel):

    title: str

    description: str

    value: float


class CalculationResponse(BaseModel):

    id: int

    title: str

    description: str

    value: float

    result: float

    user_id: int

    class Config:

        from_attributes = True