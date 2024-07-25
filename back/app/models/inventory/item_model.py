from app.db.database import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,SmallInteger,DateTime
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime,date, time


class Item(Base):
    __tablename__="items"
    id=Column(Integer,primary_key=True,index=True)
    item_name = Column(String(255),index=True)
    item_type = Column(Integer,index=True)
    hs_code = Column(String(255), nullable=True)
    hs_code_id = Column(Integer, nullable=True)
    unit_id = Column(Integer, nullable=True)
    stock_status = Column(Integer, nullable=True)
    status = Column(Integer, nullable=True)
    calculate_year = Column(String(255), nullable=True)
    created_by = Column(Integer, nullable=True)
    updated_by = Column(Integer, nullable=True)
    created_at = Column(DateTime,index=True, default=datetime.utcnow())
    # prod = relationship(Product)


Base.metadata.create_all(bind=engine)

class ItemCreateSchema(BaseModel):
    item_name:str
    item_type:int
    hs_code:str
    hs_code_id:int
    unit_id:int
    stock_status:int | None
    status:int | None
    calculate_year:str
    created_by:int | None
    updated_by:int | None

    class Config:
        from_attributes = True

class ItemSchema(BaseModel):
    id:int
    item_name:str
    description:str
    item_type:int
    hs_code:str
    unit_name:int | None
    stock_status:int | None
    status:int | None
    calculate_year:str | None
    created_by:int | None
    updated_by:int | None

    class Config:
        from_attributes = True

class ItemBase(BaseModel):
    id : int
    item_name:str
    item_type:int
    hs_code:str
    hs_code_id:int | None
    unit_id:int | None
    stock_status:int | None
    status:int | None
    calculate_year:str | None
    created_by:int | None
    updated_by:int | None

    class Config:
        from_attributes = True

class ItemSuggest(BaseModel):
    id : int
    item_name:str
    hs_code:str
    calculate_year:str | None
 


    class Config:
        from_attributes = True 
