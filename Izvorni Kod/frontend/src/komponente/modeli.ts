class AkcijaModel(BaseModel):
    idAkcija: int
    imeLokacije: str
    adresa: str
    datumPoc: date
    datumKraj: date
    hitna: bool
    krgrupa: models.KrvnaGrupa
    mail: str

    class KbcModel(BaseModel):
    id: int
    ime: str
    lokacija: str
    class KorisnikModel(BaseModel):
    mbo: str
    oib: str
    ime: str
    prezime: str
    spol: models.Spol
    dob: int
    krgrupa: models.KrvnaGrupa
    mjstan: str
    favkbc: str
    verificiran: bool

    