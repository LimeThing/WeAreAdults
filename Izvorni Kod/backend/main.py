# uvicorn main:app --reload    komanda za pokrenut server
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine

from routers import korisnik

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ruteri za svaku klasu
app.include_router(korisnik.router)


# mozete provjerit dal vam rade rute na http://127.0.0.1:8000/docs#/
# (treba pricekat oko minutu ili restartirati server da se vide promjene)
