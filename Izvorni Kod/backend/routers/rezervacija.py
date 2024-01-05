from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from pydantic import BaseModel
from datetime import datetime, time

import models
from dependencies import db_dependency
import enum

router = APIRouter(
    prefix="/rezervacija"
)

class RezervacijaModel(BaseModel):
    idRezervacija: int
    vrijemePoc: datetime
    imeLokacije: str
    mbo: str


# Endpointi za rezervacije
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def rezervacija_create(rezervacija: RezervacijaModel, db: db_dependency):
    #vrijemePoc_as_datetime = datetime.fromisoformat(str(rezervacija.vrijemePoc))
    db_rezervacija = models.Rezervacija(**rezervacija.dict())
    db.add(db_rezervacija)
    db.commit()

@router.get("/get_one/", status_code=status.HTTP_200_OK)
async def rezervacija_get_one(id_rez: str, db: db_dependency):
    rezervacija = db.query(models.Rezervacija).filter(models.Rezervacija.idRezervacija == id_rez).first()
    if rezervacija is None:
        raise HTTPException(status_code=404, detail='Rezervacija ne postoji')
    return rezervacija

@router.get("/get_my/", status_code=status.HTTP_200_OK)
async def rezervacija_get_my(mbo: str, db: db_dependency):
    rezervacije = db.query(models.Rezervacija).filter(models.Rezervacija.mbo == mbo).all()
    if rezervacije is None:
        raise HTTPException(status_code=404, detail='Još nemate rezervacija')
    return rezervacije

@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def rezervacija_get_all(db: db_dependency):
    rezervacije = db.query(models.Rezervacija).all()
    return rezervacije

@router.delete("/delete/", status_code=status.HTTP_200_OK)
async  def rezervacija_delete(id_rez: str, db: db_dependency):
    db_rezervacija = db.query(models.Rezervacija).filter(models.Rezervacija.idRezervacija == id_rez).first()
    if db_rezervacija is None:
        raise HTTPException(status_code=404, detail='Rezervacija ne postoji')
    db.delete(db_rezervacija)
    db.commit()
    
@router.put("/edit/")
async def update_rezervacija(id_rez:int, rezervacija: RezervacijaModel, db: db_dependency): 
    existing_rezervacija = db.query(models.Rezervacija).filter(models.Rezervacija.idRezervacija == id_rez).first()

    if existing_rezervacija is None:
        raise HTTPException(status_code=404, detail="Rezervacija ne postoji")
    
    db.delete(existing_rezervacija)

    updated_rezervacija = models.Rezervacija(
        idRezervacija=id_rez,
        imeLokacije=rezervacija.imeLokacije,
        vrijemePoc=rezervacija.vrijemePoc,
        mbo=rezervacija.mbo,
    )
    db.add(updated_rezervacija)
    db.commit()
    return updated_rezervacija
    