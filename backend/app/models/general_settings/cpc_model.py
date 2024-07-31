from app.db.database import engine, Base, SessionLocal
from sqlalchemy import Column, DateTime,String,Integer,Boolean,SmallInteger, TIMESTAMP, func, create_engine
from sqlalchemy.orm import relationship
from pydantic import BaseModel, Field
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base


class Cpc(Base):
    __tablename__="cpc"
    id = Column(Integer, primary_key=True, index=True)
    cpc_name = Column(String(255), index=True)
    cpc_code = Column(Integer, index=True)
    cpc_status = Column(Integer, nullable=True)
    user_id = Column(Integer, nullable=True)
    
Base.metadata.create_all(bind=engine)

class CpcCreateSchema(BaseModel):
    cpc_name: str
    cpc_code : int
    cpc_status: int
    user_id : int

    class Config:
        from_attributes = True



class CpcSchema(BaseModel):
    id : int 
    cpc_name: str
    cpc_code : int
    cpc_status: int
    user_id : int

    class Config:
        from_attributes = True

class CpcBase(BaseModel):
    id : int 
    cpc_name: str
    cpc_code : int
    cpc_status: int
    user_id : int

    class Config:
        from_attributes = True