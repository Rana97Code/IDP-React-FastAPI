from sqlalchemy import create_engine,MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

metadata = MetaData()
#for local mysql: mySQL workbench:
# SQLALCHEMY_DATABASE_URL = "mysql+mysqldb://root:Bmit123@localhost:3306/bmitvatdb"

#PostgreSQL:::active now;
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Bmit1234@localhost:5432/bmitvatdb"

#Database connection
engine=create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metadata.create_all(engine)

Base = declarative_base()

#Session Generate
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()