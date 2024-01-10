from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from pydantic import BaseModel

import models
from dependencies import db_dependency


# postavke routera, 'kbc' je naziv tablice u bazi
router = APIRouter(
    prefix="/kbc"
)


class KbcModel(BaseModel):
    naziv: str
    adresa: str


@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def kbc_create(kbc: KbcModel, db: db_dependency):
    db_kbc = models.KBC(**kbc.dict())
    db.add(db_kbc)
    db.commit()


@router.get("/get_one/{naziv}", status_code=status.HTTP_200_OK)
async def kbc_get_one(naziv, db: db_dependency):
    kbc = db.query(models.KBC).filter(models.KBC.naziv == naziv).first()
    if kbc is None:
        raise HTTPException(status_code=404, detail='Kbc by requested naziv not found')
    return kbc


@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def kbc_get_one(db: db_dependency):
    kbci = db.query(models.KBC).all()
    return kbci


@router.delete("/delete/", status_code=status.HTTP_200_OK)
async def kbc_delete(naziv: int, db: db_dependency):
    db_kbc = db.query(models.KBC).filter(models.KBC.naziv == naziv).first()
    if db_kbc is None:
        raise HTTPException(status_code=404, detail='Kbc by requested naziv not found')
    db.delete(db_kbc)
    db.commit()