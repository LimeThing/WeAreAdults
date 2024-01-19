# uvicorn main:app --reload    komanda za pokrenut server
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine



# importati svaku novu klasu
from routers import korisnik
from routers import rezervacija
from routers import akcija
from routers import termin
from routers import loginInfo
from routers import kbc

app = FastAPI()
models.Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://sql11.freesqldatabase.com",
    "http://sql11.freesqldatabase.com:3306",
    "https://we-are-adults.vercel.app/",
    "https://we-are-adults.vercel.app:3000/",
    "https://we-are-adults.vercel.app:8000/",
    "https://we-are-adults-backend.vercel.app/",
    "https://we-are-adults-backend.vercel.app:3000/",
    "https://we-are-adults-backend.vercel.app:8000/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# dodati rutere za svaku klasu
app.include_router(korisnik.router)
app.include_router(rezervacija.router)
app.include_router(akcija.router)
app.include_router(termin.router)
app.include_router(kbc.router)
app.include_router(loginInfo.router)

# mozete provjerit dal vam rade rute na http://127.0.0.1:8000/docs#/
# (treba pricekat oko minutu ili restartirati server da se vide promjene)
