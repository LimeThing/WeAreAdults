from pydantic import BaseModel

class KbcModel(BaseModel):
    id: int
    ime: str
    lokacija: str
