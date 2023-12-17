from sqlalchemy import Booleam, Column, Integer, String
from database import Base

class Korisnik(Base):
    __tablename__ = 'korisnik'
    
    mbo = Column(String(50), primary_key=True, index=True)
    ime = Column(String)
    prezime = Column(String)
    oib = Column(String(50), uinique=True)
    
class KBC(Base):
    __tablename__ = 'kbc'
    id = Column(Integer, primary_key=True, index=True)
    naziv = Column(String(100))
    adresa = Column(String(100))
    
    