from sqlalchemy import Boolean, Column, Integer, String, Enum
from database import Base
import enum


# Modeli napisani tocno onako kako izgledaju u bazi podataka

# potrebni enumi
class Spol(enum.Enum):
    M = "MUŠKO"
    F = "ŽENSKO"

class KrvnaGrupa(enum.Enum):
    Apoz = "A+"
    Aneg = "A-"
    Bpoz = "B+"
    Bneg = "B-"
    ABpoz = "AB+"
    ABneg = "AB-"
    Npoz = "0+"
    Nneg = "0-"

class Korisnik(Base):
    __tablename__ = 'korisnik'
    
    mbo = Column(String(50), primary_key=True, index=True)
    oib = Column(String(50), unique=True)
    ime = Column(String(100))
    prezime = Column(String(100))
    spol = Column(Enum(Spol))
    dob = Column(Integer)
    krgrupa = Column(Enum(KrvnaGrupa))
    mjstan = Column(String(100))
    favkbc = Column(String(100))
    verificiran = Column(Boolean)
    
class KBC(Base):
    __tablename__ = 'kbc'

    id = Column(Integer, primary_key=True, index=True)
    naziv = Column(String(100))
    adresa = Column(String(100))
    
    