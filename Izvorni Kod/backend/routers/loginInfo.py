from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from pydantic import BaseModel

import models
from dependencies import db_dependency
import enum

# postavke routera, 'loginInfo' je naziv tablice u bazi
router = APIRouter(
    prefix="/loginInfo"
)


# klasa loginInfo
class LoginInfoModel(BaseModel):
    mail: str
    lozinka: str
    mbo: str


# Endpointi za loginInfo
@router.post("/create/", status_code=status.HTTP_201_CREATED)
async def loginInfo_create(loginInfo: LoginInfoModel, db: db_dependency):
    db_loginInfo = models.LoginInfo(**loginInfo.dict())
    db.add(db_loginInfo)
    db.commit()



@router.get("/get_one/{mail}", status_code=status.HTTP_200_OK)
async def loginInfo_get_one(mail, db: db_dependency):
    loginInfo = db.query(models.LoginInfo).filter(models.LoginInfo.mail == mail).first()
    if loginInfo is None:
        raise HTTPException(status_code=404, detail='LoginInfo by requested mail not found')
    return loginInfo


@router.get("/get_all/", status_code=status.HTTP_200_OK)
async def loginInfo_get_one(db: db_dependency):
    loginInfos = db.query(models.LoginInfo).all()
    return loginInfos


@router.delete("/delete/", status_code=status.HTTP_200_OK)
async def loginInfo_delete(mail: str, db: db_dependency):
    db_loginInfo = db.query(models.LoginInfo).filter(models.LoginInfo.mail == mail).first()
    if db_loginInfo is None:
        raise HTTPException(status_code=404, detail='LoginInfo by requested mail not found')
    db.delete(db_loginInfo)
    db.commit()
