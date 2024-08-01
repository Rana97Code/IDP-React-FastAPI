from fastapi import APIRouter, Depends, HTTPException, requests,Request, File, UploadFile
from typing import Union,List,Optional
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.routes.auth_router import get_current_active_user;
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pathlib import *
import os
from sqlalchemy.sql.sqltypes import Numeric
from app.models.inventory.opening_stock_model import OpeningStock, OpeningInsertSchema , OpeningStockSchema
from app.models.relationship.supplier_model import Supplier, supplierBase, SupplierSchema
from app.models.production.procurement.Purchase_model import Purchase,Purchase_item
from app.schemas.production.procurement.ForeignPurchase_schema import ForeignPurchaseInsertSchema,ItemDetailsModel, PurchaseTableDetailsModel
from app.schemas.production.procurement.ServicePurchase_schema import ServicePurchaseInsertSchema
from app.models.general_settings.hs_code_model import Hscode
from app.models.inventory.item_model import Item, ItemSuggest

Service_purchase_router = APIRouter()

@Service_purchase_router.post("/bmitvat/api/service_purchase/add-service-purchase", dependencies=[Depends(get_current_active_user)])
async def create_foreign_purchase(Spurchase: ServicePurchaseInsertSchema, db: Session = Depends(get_db)):
    try:
        print(Spurchase)
        srv = Purchase(
            invoice_no='SER-20241206-0001',
            vendor_inv=Spurchase.chalan_number,
            supplier_id=Spurchase.supplier_id,
            purchase_type=Spurchase.purchase_type,
            purchase_category=Spurchase.purchase_category,
            grand_total=Spurchase.grand_total,
            total_tax=Spurchase.total_tax,
            total_sd=Spurchase.total_sd,
            fiscal_year=Spurchase.fiscal_year,
            notes=Spurchase.notes,
            user_id='1',
            chalan_date=Spurchase.chalan_date,
            entry_date=Spurchase.entry_date
            )
        db.add(srv)
        db.flush()  # Get the srv.id before committing

        for item in Spurchase.items:
            purchase_item = Purchase_item(
                item_id = item.item_id,
                hs_code = item.hs_code,
                hs_code_id = item.hs_code_id,
                purchase_id = srv.id,
                qty = item.qty,
                rate = item.rate,
                access_amount = item.access_amount,
                item_sd = item.item_sd,
                sd_amount = item.sd_amount,
                vat_rate = item.vat_rate,
                vat_type = item.vat_type,
                vatable_value = item.vatable_value,
                rebate = item.rebate,
                item_total = item.item_total,
                purchase_date = srv.entry_date,
                entry_date = srv.entry_date,
                p_date = srv.entry_date
                )
            db.add(purchase_item)
        db.commit()
        return {"Message": "Successfully Added"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error occurred: {e}")
    finally:
        db.close()









#foreing purchase ITem Search function
async def service_suggestitm(year: int, db:Session=Depends(get_db)):
    result = db.query(Item,Hscode).join(Hscode, Item.hs_code_id==Hscode.id)\
            .filter(Hscode.schedule == "service", Hscode.calculate_year == year)\
            .add_columns(Item.id, Item.item_name, Item.hs_code, Item.calculate_year).all()
            
    items = []
    for y in result:
        items.append({
            'id' : y.id,
            'item_name': y.item_name,
            'hs_code': y.hs_code,
            'calculate_year': y.calculate_year,
        })

    json_items = jsonable_encoder(items)
    return json_items

#foreing purchase ITem Search query
@Service_purchase_router.post("/bmitvat/api/service_purchase/get_service_item_suggestions", response_model=List[ItemSuggest])
async def suggest_items(request: Request,db:Session=Depends(get_db)):
    request_body = await request.body()
    decoded_string = request_body.decode()
    parts = decoded_string.split("/")
    
    if len(parts) > 1:
        year = parts[0]
        part2 = parts[1]
        items = await service_suggestitm(year = year, db = db)
        searchTerm = part2.lower()
        if searchTerm:
            data= [item for item in items if 'item_name' in item and searchTerm in item['item_name'].lower()]
            return data

        else:
            return []
    else:
        return []


@Service_purchase_router.get("/bmitvat/api/service_purchase/get_service_item_details/{item_id}", response_model=ItemDetailsModel, dependencies=[Depends(get_current_active_user)])
async def get_item_details_by_id(item_id: int, db: Session = Depends(get_db)):
    try:
        print(item_id)
        item = db.query(Item.id, Item.item_name, Item.hs_code_id, Item.hs_code, Hscode.sd, Hscode.vat, Hscode.cd, Hscode.ait, Hscode.rd, Hscode.at, Hscode.tti)\
            .join(Hscode, Item.hs_code_id == Hscode.id).filter(Item.id == item_id).first()
        
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")


        item_details = {
            "id": item.id, 
            "item_name": item.item_name, 
            "hs_code_id": item.hs_code_id,
            "hs_code": item.hs_code,
            "sd": item.sd,
            "vat": item.vat,
            "cd": item.cd,
            "ait": item.ait,
            "rd": item.rd,
            "at": item.at,
            "tti": item.tti
        }

        return item_details
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Unexpected error: {e}")