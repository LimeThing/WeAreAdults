from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'mysql+pymysql://sql11677640:PrIf3sr2FR@sql11.freesqldatabase.com:3306/sql11677640'

# Host: sql11.freesqldatabase.com
# Database name: sql11677640
# Database user: sql11677640
# Database password: PrIf3sr2FR
# Port number: 3306

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()