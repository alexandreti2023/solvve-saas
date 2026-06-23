from fastapi import APIRouter, Depends

from app.database.connection import SessionLocal

from app.models.calculation import Calculation

from app.schemas.calculation_schema import (
    CalculationCreate,
    CalculationResponse
)

from app.core.security import get_current_user


router = APIRouter()


@router.post(
    "/calculations",
    response_model=CalculationResponse
)
def create_calculation(
    data: CalculationCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    result = data.value * 1.10

    calculation = Calculation(
        title=data.title,
        description=data.description,
        value=data.value,
        result=result,
        user_id=current_user["user_id"]
    )

    db.add(calculation)

    db.commit()

    db.refresh(calculation)

    return calculation
@router.get(
    "/calculations",
    response_model=list[CalculationResponse]
)
def list_calculations(
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    calculations = db.query(Calculation).filter(
        Calculation.user_id == current_user["user_id"]
    ).all()

    return calculations
@router.put(
    "/calculations/{calculation_id}",
    response_model=CalculationResponse
)
def update_calculation(
    calculation_id: int,
    data: CalculationCreate,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    calculation = db.query(Calculation).filter(
        Calculation.id == calculation_id,
        Calculation.user_id == current_user["user_id"]
    ).first()

    if not calculation:

        return {
            "error": "Cálculo não encontrado"
        }

    calculation.title = data.title

    calculation.description = data.description

    calculation.value = data.value

    calculation.result = data.value * 1.10

    db.commit()

    db.refresh(calculation)

    return calculation
@router.delete("/calculations/{calculation_id}")
def delete_calculation(
    calculation_id: int,
    current_user=Depends(get_current_user)
):

    db = SessionLocal()

    calculation = db.query(Calculation).filter(
        Calculation.id == calculation_id,
        Calculation.user_id == current_user["user_id"]
    ).first()

    if not calculation:

        return {
            "error": "Cálculo não encontrado"
        }

    db.delete(calculation)

    db.commit()

    return {
        "message": "Cálculo deletado com sucesso"
    }