from fastapi import APIRouter
from . import service

router = APIRouter()

@router.get("/foundation-models")
def list_foundation_models():
    return service.list_foundation_models()

@router.get("/foundation-models/model/{model_id}")
def get_foundation_model_details(model_id: str):
    return service.get_foundation_model(model_id)