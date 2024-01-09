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
    korisnik.verificiran = False
    db_korisnik = models.Korisnik(**korisnik.dict())
    db.add(db_korisnik)
    db.commit()


@router.patch("/verify/{mbo}", status_code=status.HTTP_200_OK)
async def korisnik_verify(db: db_dependency, mbo):
    korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == mbo).first()
    if korisnik is None:
        raise HTTPException(status_code=404, detail='Korisnik by requested MBO not found')
    db.delete(korisnik)
    korisnik.verificiran = True
    db.add(korisnik)
    db.commit()


@router.get("/get_one/", status_code=status.HTTP_200_OK)
async def korisnik_get_one(mbo: str, db: db_dependency):
    korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == mbo).first()
    if korisnik is None:
        raise HTTPException(status_code=404, detail='Korisnik by requested MBO not found')
    return korisnik


@router.get("/get_names_one/{mbo}", status_code=status.HTTP_200_OK)
async def korisnik_get_one(mbo, db: db_dependency):
    korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == mbo).first()
    if korisnik is None:
        raise HTTPException(status_code=404, detail='Korisnik by requested MBO not found')
    return korisnik.ime + " " + korisnik.prezime


@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def korisnik_get_all(db: db_dependency):
    korisnici = db.query(models.Korisnik).all()
    return korisnici


@router.get("/get_all_unverified/", status_code=status.HTTP_200_OK)
async def korisnik_get_all(db: db_dependency):
    korisnici = db.query(models.Korisnik).filter(False == models.Korisnik.verificiran).all()
    return korisnici


@router.delete("/delete/", status_code=status.HTTP_200_OK)
async def korisnik_delete(mbo: str, db: db_dependency):
    db_korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == mbo).first()
    if db_korisnik is None:
        raise HTTPException(status_code=404, detail='Korisnik by requested MBO not found')
    db.delete(db_korisnik)
    db.commit()


@router.put("/edit/")
async def update_korisnik(mbo: str, korisnik: KorisnikModel, db: db_dependency):
    existing_korisnik = db.query(models.Korisnik).filter(models.Korisnik.mbo == mbo).first()

    if existing_korisnik is None:
        raise HTTPException(status_code=404, detail="Korisnik ne postoji")

    verified = existing_korisnik.verificiran
    # da osiguramo da se korisnik ne verificira sam
    db.delete(existing_korisnik)

    updated_korisnik = models.Korisnik(
        mbo=mbo,
        oib=korisnik.oib,
        ime=korisnik.ime,
        prezime=korisnik.prezime,
        spol=korisnik.spol,
        dob=korisnik.dob,
        krgrupa=korisnik.krgrupa,
        mjstan=korisnik.mjstan,
        favkbc=korisnik.favkbc,
        verificiran=verified
    )

    db.add(updated_korisnik)
    db.commit()
    return updated_korisnik
