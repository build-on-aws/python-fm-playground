from fastapi import APIRouter
from . import models
from . import services


router = APIRouter()


@router.post("/foundation-models/model/image/stability.stable-diffusion-xl/invoke")
def invoke(body: models.ImageRequest):
    response = services.invoke(body.prompt, body.stylePreset)

    # return models.ImageResponse(
    #     imageByteArray=response
    # )

    return { "imageByteArray": response }