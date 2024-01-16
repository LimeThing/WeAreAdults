from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, Date, Float
from database import Base
import enum


# Modeli napisani tocno onako kako izgledaju u bazi podataka

# potrebni enumi
class Spol(enum.Enum):
    MUŠKO = "Muško"
    ŽENSKO = "Žensko"
    OSTALO = "Ostalo"


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

    mbo = Column(String(9), primary_key=True, index=True)
    oib = Column(String(11), unique=True, nullable=False)
    ime = Column(String(100), nullable=False)
    prezime = Column(String(100), nullable=False)
    spol = Column(Enum(Spol), nullable=False)
    dob = Column(Integer, nullable=False)
    krgrupa = Column(Enum(KrvnaGrupa), nullable=False)
    mjstan = Column(String(100), nullable=False)
    favkbc = Column(String(100), nullable=False)
    verificiran = Column(Boolean, nullable=False)


class KBC(Base):
    __tablename__ = 'kbc'

    ime = Column(String(100), primary_key=True, index=True)
    adresa = Column(String(100), nullable=False)
    geo_sirina = Column(Float, nullable=False, default=0.000000)
    geo_duzina = Column(Float, nullable=False, default=0.000000)


class LoginInfo(Base):
    __tablename__ = 'loginInfo'

    mail = Column(String(100), primary_key=True, index=True)
    lozinka = Column(String(100), nullable=False)
    mbo = Column(String(9), unique=True, nullable=False)


class Administrator(Base):
    __tablename__ = 'administrator'

    mail = Column(String(100), primary_key=True, index=True)
    lozinka = Column(String(100), nullable=False)


class Termin(Base):
    __tablename__ = 'termini'

    idTermin = Column(Integer, primary_key=True, index=True)
    imeLokacije = Column(String(100), nullable=False, index=True)
    vrijemePoc = Column(DateTime, nullable=False)
    vrijemeKraj = Column(DateTime, nullable=False)
    zauzeto = Column(Boolean, nullable=False)


class Rezervacija(Base):
    __tablename__ = 'rezervacija'

    idRezervacija = Column(Integer, primary_key=True, index=True)
    vrijemePoc = Column(DateTime, nullable=False)
    imeLokacije = Column(String(100), nullable=False)
    mbo = Column(String(9), unique=True, nullable=False, index=True)


class Akcija(Base):
    __tablename__ = 'akcija'

    idAkcija = Column(Integer, primary_key=True, index=True)
    imeLokacije = Column(String(100), nullable=False, index=True)
    adresa = Column(String(100), nullable=False, index=True)
    datumPoc = Column(Date, nullable=False)
    datumKraj = Column(Date, nullable=False)
    hitna = Column(Boolean, nullable=False)
    krgrupa = Column(Enum(KrvnaGrupa), nullable=True)
    mail = Column(String(100), nullable=False)
    geo_sirina = Column(Float, nullable=False, default=0.000000)
    geo_duzina = Column(Float, nullable=False, default=0.000000)
