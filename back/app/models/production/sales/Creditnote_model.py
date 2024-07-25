from app.db.database import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,SmallInteger,DateTime,Date,Text,Double,Float,BigInteger,Numeric
from sqlalchemy.sql import func
from datetime import datetime, time ,date
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from typing import Optional


class CreditNote(Base):
    __tablename__ = 'credit_note'

    id = Column(Integer, primary_key=True, autoincrement=True)
    credit_note_no = Column(String, nullable=True)
    credit_note_type = Column(Integer, nullable=True)
    cn_issue_date = Column(Date, nullable=True)
    sales_id = Column(BigInteger, nullable=True)
    customer_id = Column(BigInteger, nullable=True)
    vehicle_info = Column(String, nullable=True)
    total_sd = Column(Numeric(precision=10, scale=2), nullable=True)
    total_vat = Column(Numeric(precision=10, scale=2), nullable=True)
    grand_total = Column(Numeric(precision=10, scale=2), nullable=True)
    notes = Column(String, nullable=True)
    user_id = Column(BigInteger, nullable=True)
    created_at = Column(Date, server_default=func.now(), nullable=False)


class CreditNoteItem(Base):
    __tablename__ = 'credit_note_item'

    id = Column(Integer, primary_key=True, autoincrement=True)
    credit_note_id = Column(BigInteger, nullable=True)
    item_id = Column(BigInteger, nullable=True)
    item_name = Column(String, nullable=True)
    qty = Column(Numeric(precision=10, scale=2), nullable=True)
    rate = Column(Numeric(precision=10, scale=2), nullable=True)
    sales_amount = Column(Numeric(precision=10, scale=2), nullable=True)
    vat_rate = Column(Numeric(precision=10, scale=2), nullable=True)
    vat_amount = Column(Numeric(precision=10, scale=2), nullable=True)
    sd_rate = Column(Numeric(precision=10, scale=2), nullable=True)
    sd_amount = Column(Numeric(precision=10, scale=2), nullable=True)
    return_qty = Column(Numeric(precision=10, scale=2), nullable=True)
    return_amount = Column(Numeric(precision=10, scale=2), nullable=True)
    return_vat = Column(Numeric(precision=10, scale=2), nullable=True)
    return_sd = Column(Numeric(precision=10, scale=2), nullable=True)
    entry_date = Column(Date, nullable=True, server_default=func.now())
    created_at = Column(Date, nullable=False, server_default=func.now())

Base.metadata.create_all(bind=engine)