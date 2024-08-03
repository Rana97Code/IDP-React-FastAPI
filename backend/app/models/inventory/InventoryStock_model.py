from app.db.database import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,SmallInteger,Float,Date,Text,Double,Float,Numeric,BigInteger
from sqlalchemy.sql import func
from datetime import datetime, time ,date
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from typing import Optional

class Stock(Base):
    __tablename__ = 'stock'

    id = Column(Integer, primary_key=True, autoincrement=True)
    item_id = Column(Integer, nullable=True)
    qty = Column(Float, nullable=True)
    rate = Column(Float, nullable=True)
    status = Column(Integer, nullable=True)
    user_id = Column(Integer, nullable=True)
    created_at = Column(Date, server_default=func.now())



class StockHistory(Base):
    __tablename__ = 'stock_history'

    id = Column(Integer, primary_key=True, autoincrement=True)
    item_id = Column(Integer, nullable=False)
    action_tbl = Column(String, nullable=False)
    action_tbl_id = Column(Integer, nullable=True)
    previous_stock = Column(Numeric(precision=10, scale=2), nullable=True)
    qty = Column(Numeric(precision=10, scale=2), nullable=True)
    action_type = Column(String, nullable=True)
    status = Column(Integer, nullable=True)
    user_id = Column(Integer, nullable=True)
    created_at = Column(Date, server_default=func.now(), nullable=False)

Base.metadata.create_all(bind=engine)