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
class terminModel(BaseModel):
    idTermin: int
    imeLokacije: str
    datum = Column(DateTime, nullable=False)
    vrijemePoc = Column(DateTime, nullable=False)
    vrijemeKraj = Column(DateTime, nullable=False)
    zauzeto: bool


# Endpointi za termina
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def termin_create(termin: terminModel, db: db_dependency):
    termin.verificiran = False
    db_termin = models.termin(**termin.dict())
    db.add(db_termin)
    db.commit()


@router.patch("/verify/", status_code=status.HTTP_200_OK)
async def termin_verify(db: db_dependency, mbo: str):
    termin = db.query(models.termin).filter(models.termin.mbo == mbo).first()
    if termin is None:
        raise HTTPException(status_code=404, detail='termin by requested MBO not found')
    db.delete(termin)
    termin.verificiran = True
    db.add(termin)
    db.commit()


@router.get("/get_one/", status_code=status.HTTP_200_OK)
async def termin_get_one(mbo: str, db: db_dependency):
    termin = db.query(models.termin).filter(models.termin.mbo == mbo).first()
    if termin is None:
        raise HTTPException(status_code=404, detail='termin by requested MBO not found')
    return termin


@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def termin_get_one(db: db_dependency):
    korisnici = db.query(models.termin).all()
    return korisnici


@router.delete("/delete/", status_code=status.HTTP_200_OK)
async def termin_delete(mbo: str, db: db_dependency):
    db_termin = db.query(models.termin).filter(models.termin.mbo == mbo).first()
    if db_termin is None:
        raise HTTPException(status_code=404, detail='termin by requested MBO not found')
    db.delete(db_termin)
    db.commit()
