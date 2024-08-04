from fastapi import APIRouter, Depends, HTTPException, requests,Request, File, UploadFile
from typing import Union,List,Optional
from sqlalchemy.orm import Session
from app.models.inventory.item_model import Item
from app.models.relationship.supplier_model import Supplier
from app.models.country_model import Country
from app.models.production.procurement.Purchase_model import Purchase, Purchase_item
from app.schemas.production.invoice.purchase_invoice_schema import PurchaseInvoiceSchema 
from app.db.database import get_db
from app.routes.auth_router import get_current_active_user;
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pathlib import *
import os



#route define
purchase_invoice_router = APIRouter()


@purchase_invoice_router.get("/bmitvat/api/purchase/purchase_invoice/{purchase_id}",response_model=PurchaseInvoiceSchema, dependencies=[Depends(get_current_active_user)])
async def get_itm(purchase_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Purchase, Purchase_item, Supplier, Item).join(Purchase, Purchase_item.purchase_id==Purchase.id).join(Purchase_item, Item.id==Purchase_item.item_id)\
            .join(Supplier, Purchase.supplier_id== Supplier.id).join(Country, Supplier.country_id==Country.id)\
            .filter(Purchase.id == purchase_id)\
            .add_column(Purchase.invoice_no, Purchase.chalan_date, Supplier.supplier_name, Supplier.s_address, Supplier.supplier_email,Supplier.supplier_phone, Supplier.supplier_type, Country.country_name).first()
            
        return (u)
    except:
        return HTTPException(status_code=422, details="Unit not found")



    







