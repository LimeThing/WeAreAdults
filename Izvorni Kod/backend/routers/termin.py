from datetime import date, time

from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from pydantic import BaseModel

import models
from dependencies import db_dependency
import enum

# postavke routera, 'termin' je naziv tablice u bazi
router = APIRouter(
    prefix="/termin"
)


# klasa termina kakvog ga koristimo u python kodu
class TerminModel(BaseModel):
    idTermin: int
    imeLokacije: str
    datum: date
    vrijemePoc: time
    vrijemeKraj: time
    zauzeto: bool


# Endpointi za termina
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def termin_create(termin: TerminModel, db: db_dependency):
    db_termin = models.Termin(**termin.dict())
    db.add(db_termin)
    db.commit()


@router.get("/get_one/{id}", status_code=status.HTTP_200_OK)
async def termin_get_one(id, db: db_dependency):
    termin = db.query(models.Termin).filter(models.Termin.idTermin == id).first()
    if termin is None:
        raise HTTPException(status_code=404, detail='Termin by requested id not found')
    return termin

@router.get("/get_by_location/{imeLokacije}", status_code=status.HTTP_200_OK)
async def termin_get_one(imeLokacije, db: db_dependency):
    termin = db.query(models.Termin).filter(models.Termin.imeLokacije == imeLokacije).all()
    if termin is None:
        raise HTTPException(status_code=404, detail='Termin by requested ime lokacije not found')
    return termin


@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def termin_get_one(db: db_dependency):
    termini = db.query(models.Termin).all()
    return termini


@router.delete("/delete/{id}", status_code=status.HTTP_200_OK)
async def termin_delete(id, db: db_dependency):
    db_termin = db.query(models.Termin).filter(models.Termin.idTermin == id).first()
    if db_termin is None:
        raise HTTPException(status_code=404, detail='Termin by requested id not found')
    db.delete(db_termin)
    db.commit()
