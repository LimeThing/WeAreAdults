# uvicorn main:app --reload    komanda za pokrenut server
from fastapi import FastAPI
import models
from database import engine

from routers import korisnik

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

# ruteri za svaku klasu
app.include_router(korisnik.router)


# mozete provjerit dal vam rade rute na http://127.0.0.1:8000/docs#/
# (treba pricekat oko minutu ili restartirati server da se vide promjene)
