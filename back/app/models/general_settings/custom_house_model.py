from app.db.database import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,SmallInteger, TIMESTAMP, func, create_engine
from sqlalchemy.orm import relationship
from pydantic import BaseModel, Field
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base


class Custom_house(Base):
    __tablename__="custom_house"
    id = Column(Integer, primary_key=True, index=True)
    custom_house_name = Column(String(255), index=True)
    custom_house_code = Column(String(255), index=True)
    custom_house_address = Column(String(255), nullable=True)
    custom_house_status = Column(Integer, nullable=True )
    




Base.metadata.create_all(bind=engine)

class Custom_houseCreateSchema(BaseModel):
    custom_house_name : str
    custom_house_code : str
    custom_house_address : str
    custom_house_status : int
    class Config:
        from_attributes = True



class Custom_houseSchema(BaseModel):
    id:int
    custom_house_name : str
    custom_house_code : str
    custom_house_address : str
    custom_house_status : int

    class Config:
        from_attributes = True

class Custom_houseBase(BaseModel):
    custom_house_name : str
    custom_house_code : str
    custom_house_address : str
    custom_house_status : int

    class Config:
        from_attributes = True