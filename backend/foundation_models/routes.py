from fastapi import APIRouter, HTTPException
from botocore.exceptions import ClientError
from . import service

router = APIRouter()

@router.get("/foundation-models")
def list_foundation_models():
    try:
        return service.list_foundation_models()
    except ClientError as e:
        if e.response["Error"]["Code"] == "AccessDeniedException":
            raise HTTPException(status_code=403)
        else:
            raise HTTPException(status_code=500)

@router.get("/foundation-models/model/{model_id}")
def get_foundation_model_details(model_id: str):
    try:
        return service.get_foundation_model(model_id)
    except ClientError as e:
        if e.response["Error"]["Code"] == "AccessDeniedException":
            raise HTTPException(status_code=403)
        else:
            raise HTTPException(status_code=500)

