from fastapi import APIRouter, HTTPException
from botocore.exceptions import ClientError
from . import models
from . import services

router = APIRouter()


@router.post("/foundation-models/model/image/stability.stable-diffusion-xl/invoke")
def invoke(body: models.ImageRequest):
    try:
        response = services.invoke(body.prompt, body.stylePreset)
        return {
            "imageByteArray": response
        }
    except ClientError as e:
        if e.response["Error"]["Code"] == "AccessDeniedException":
            raise HTTPException(status_code=403)
        else:
            raise HTTPException(status_code=500)
