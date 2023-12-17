#u backend folderu
"""
python3 -m venv env
source env/bin/activate -> meni je radilo bez ovoga, možda je samo za Linux
pip install fastapi uvicorn sqlalchemy pymysql
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = ''
engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()