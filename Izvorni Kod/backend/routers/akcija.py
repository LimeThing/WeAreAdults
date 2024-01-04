from fastapi import FastAPI, HTTPException, Depends, status, APIRouter, Form
from pydantic import BaseModel

import models
from dependencies import db_dependency
import enum
from datetime import datetime

router = APIRouter(
    prefix="/akcija"
)

class AkcijaModel(BaseModel):
    idAkcija: int
    imeLokacije: str
    adresa: str
    datumPoc: datetime
    datumKraj: datetime
    hitna: bool
    krgrupa: models.KrvnaGrupa
    mail: str

# Endpointi za akcije
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def akcija_create(akcija: AkcijaModel, db: db_dependency):
    db_akcija = models.Akcija(**akcija.dict())
    db.add(db_akcija)
    db.commit()

@router.get("/get_one/", status_code=status.HTTP_200_OK)
async def akcija_get_one(akcija_id: int, db: db_dependency):
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
async def akcija_get_aktivne(akcija_id: int, db: db_dependency):
    akcije = db.query(models.Akcija).filter(models.Akcija.datumKraj < date.today()).all()
    if akcije is None:
        raise HTTPException(status_code=404, detail='Nema aktivnih akcija')
    return akcije

@router.delete("/delete/", status_code=status.HTTP_200_OK)
async def akcija_delete(akcija_id: int, db: db_dependency):
    db_akcija = db.query(models.Akcija).filter(models.Akcija.idAkcija == akcija_id).first()
    if db_akcija is None:
        raise HTTPException(status_code=404, detail='Akcija ne postoji')
    db.delete(db_akcija)
    db.commit()
    
    #za uređivanje - nisam sigurna radi li, ali za to svakako treba instalirati
    #pip install python-multipart

@router.put("/akcije/{akcija_id}")
async def update_akcija(akcija_id: int, akcija: AkcijaModel = Form(...)):
    db=db_dependency
    trenutna_akcija = await db.akcija_get_one(akcija_id)

    if trenutna_akcija is None:
        raise HTTPException(status_code=404, detail="Akcija ne postoji")
    

    trenutna_akcija.imeLokacije = akcija.imeLokacije
    trenutna_akcija.vrijemePoc = akcija.vrijemePoc
    trenutna_akcija.mbo = akcija.mbo

    await db.update_rezervacija(trenutna_akcija)

    return trenutna_akcija
