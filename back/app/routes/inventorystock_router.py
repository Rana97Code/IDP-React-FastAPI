from fastapi import APIRouter, Depends, HTTPException, requests,Request, File, UploadFile
from typing import Union,List,Optional
from sqlalchemy.orm import Session
from app.models.production.inventorystock import InventoryStock_model
from app.db.database import get_db
from app.routes.auth_router import get_current_active_user;
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pathlib import *
import os

InventoryStock_router = APIRouter()