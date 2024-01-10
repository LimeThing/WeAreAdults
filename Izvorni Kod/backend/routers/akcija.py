from fastapi import FastAPI, HTTPException, Depends, status, APIRouter, Form
from pydantic import BaseModel

import models
from dependencies import db_dependency
import enum
from datetime import datetime, date
from typing import Optional

router = APIRouter(
    prefix="/akcija"
)


class AkcijaModel(BaseModel):
    idAkcija: int
    imeLokacije: str
    adresa: str
    datumPoc: date
    datumKraj: date
    hitna: bool
    krgrupa: models.KrvnaGrupa
    mail: str
    geo_duzina: float 
    geo_sirina: float


# Endpointi za akcije
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def akcija_create(akcija: AkcijaModel, db: db_dependency):
    db_akcija = models.Akcija(**akcija.dict())
    db.add(db_akcija)
    db.commit()


@router.get("/get_one/{akcija_id}", status_code=status.HTTP_200_OK)
async def akcija_get_one(akcija_id, db: db_dependency):
    akcija = db.query(models.Akcija).filter(models.Akcija.idAkcija == akcija_id).first()
    if akcija is None:
        raise HTTPException(status_code=404, detail='Akcija ne postoji')
    return akcija


@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def akcija_get_all(db: db_dependency):
    akcije = db.query(models.Akcija).all()
    return akcije


@router.get("/get_hitne/", status_code=status.HTTP_200_OK)
async def akcija_get_hitne(db: db_dependency):
    akcije = db.query(models.Akcija).filter(models.Akcija.hitna == True).all()
    if akcije is None:
        raise HTTPException(status_code=404, detail='Nema hitnih akcija')
    return akcije


@router.get("/get_aktivne/", status_code=status.HTTP_200_OK)
async def akcija_get_aktivne(db: db_dependency):
    akcije = db.query(models.Akcija).filter(models.Akcija.datumKraj >= date.today()).all()
    if akcije is None:
        raise HTTPException(status_code=404, detail='Nema aktivnih akcija')
    return akcije


@router.delete("/delete/{akcija_id}", status_code=status.HTTP_200_OK)
async def akcija_delete(akcija_id, db: db_dependency):
    db_akcija = db.query(models.Akcija).filter(models.Akcija.idAkcija == akcija_id).first()
    if db_akcija is None:
        raise HTTPException(status_code=404, detail='Akcija ne postoji')
    db.delete(db_akcija)
    db.commit()

    # za uređivanje - nisam sigurna radi li, ali za to svakako treba instalirati
    # pip install python-multipart


@router.put("/edit/")
async def update_akcija(id_rez: int, akcija: AkcijaModel, db: db_dependency):
    existing_akcija = db.query(models.Akcija).filter(models.Akcija.idAkcija == id_rez).first()

    if existing_akcija is None:
        raise HTTPException(status_code=404, detail="Akcija ne postoji")

    db.delete(existing_akcija)

    updated_akcija = models.Akcija(
        idAkcija=id_rez,
        imeLokacije=akcija.imeLokacije,
        adresa=akcija.adresa,
        datumPoc=akcija.datumPoc,
        datumKraj=akcija.datumKraj,
        hitna=akcija.hitna,
        mail=akcija.mail,
        krgrupa=akcija.krgrupa
    )

    db.add(updated_akcija)
    db.commit()
    # u tijelu odgovora se neće vidjeti nita, ali su promjene puno brže vidljive u bazi nego kod flush()
    # ako skužimo da stvar bolje radi s flush(), možemo staviti to
    return updated_akcija
