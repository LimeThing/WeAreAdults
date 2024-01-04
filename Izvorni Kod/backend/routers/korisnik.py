from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from pydantic import BaseModel

import models
from dependencies import db_dependency
import enum

# postavke routera, 'korisnik' je naziv tablice u bazi
router = APIRouter(
    prefix="/korisnik"
)

# klasa korisnika kakvog ga koristimo u python kodu
class KorisnikModel(BaseModel):
    mbo: str
    oib: str
    ime: str
    prezime: str
    spol: models.Spol
    dob: int
    krgrupa: models.KrvnaGrupa
    mjstan: str
    favkbc: str
    verificiran: bool


# Endpointi za korisnika
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def korisnik_create(korisnik: KorisnikModel, db: db_dependency):
    db_korisnik = models.Korisnik(**korisnik.dict())
    db.add(db_korisnik)
    db.commit()

@router.get("/get_one/", status_code=status.HTTP_200_OK)
async def korisnik_get_one(korisnik_mbo: str, db: db_dependency):
    korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == korisnik_mbo).first()
    if korisnik is None:
        raise HTTPException(status_code=404, detail='Korisnik by requested MBO not found')
    return korisnik

@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def korisnik_get_all(db: db_dependency):
    korisnici = db.query(models.Korisnik).all()
    return korisnici

@router.delete("/delete/", status_code=status.HTTP_200_OK)
async  def korisnik_delete(korisnik_mbo: str, db: db_dependency):
    db_korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == korisnik_mbo).first()
    if db_korisnik is None:
        raise HTTPException(status_code=404, detail='Korisnik by requested MBO not found')
    db.delete(db_korisnik)
    db.commit()
    