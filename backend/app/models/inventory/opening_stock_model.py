from app.db.database import engine, Base, SessionLocal
from sqlalchemy import Column, Float,String,Integer,Boolean,SmallInteger,DateTime
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime,date, time


class OpeningStock(Base):
    __tablename__="opening_stock"
    id=Column(Integer,primary_key=True,index=True)
    closing_date = Column(DateTime, index=True, default=datetime.utcnow)
    item_id = Column(Integer, nullable=True)
    item_type = Column(Integer, nullable=True)
    opening_date = Column(DateTime,index=True, default=datetime.utcnow())
    opening_quantity = Column(Float, nullable=True)
    opening_rate = Column(Float, nullable=True)
    opening_value = Column(Float, nullable=True)
    # hs_code = Column(String(255), nullable=True)
    # item_name = Column(String(255), nullable=True)
    #created_at =Column(DateTime, index=True, default=datetime.utcnow())
    # prod = relationship(Product)
    # invoice_id = Column(String(255), nullable=True)


Base.metadata.create_all(bind=engine)

class OpeningStockCreateSchema(BaseModel):
    closing_date: datetime | None
    item_id: int
    item_type: int | None
    opening_date: datetime | None
    opening_quantity: float
    opening_rate: float | None
    opening_value: float | None
    # updated_at: date
    # created_by: int
    # invoice_id: str
    

    class Config:
        from_attributes = True

class OpeningStockSchema(BaseModel):
    id:int
    closing_date: datetime
    item_id:int
    item_type:int | None
    opening_date:datetime | None
    opening_quantity: float
    opening_rate:float | None
    opening_value:float | None
    # hs_code: str| None
    # item_name: str| None





    class Config:
        from_attributes = True

class OpeningStockBase(BaseModel):
    closing_date:str
    item_id:int
    item_type:int | None
    opening_date:datetime | None
    opening_quantity: float
    opening_rate:float | None
    opening_value:float | None
    # updated_at: date
    # created_by: int
    # invoice_id: str

    class Config:
        from_attributes = True

class OpeningInsertSchema(BaseModel):
    item_id:int
    item_type: int
    opening_date:datetime | None
    opening_quantity: float
    opening_rate:float | None
    opening_value:float | None
    # hs_code: str |None

    class Config:
        from_attributes = True