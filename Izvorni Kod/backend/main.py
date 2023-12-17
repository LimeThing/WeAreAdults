from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)


class kbcBase(BaseModel):
    ime:str #samo se ime šalje u request, adresa dolazi u odgovori 
  
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# uvicorn main:app --reload    komanda za pokrenut server