from fastapi import APIRouter
from . import models
from . import services

router = APIRouter()


@router.post("/foundation-models/model/text/anthropic.claude-v2/invoke")
def invoke(body: models.TextRequest):
    completion = services.invoke(body.prompt, body.temperature, body.maxTokens)
    
    return models.TextResponse(
        completion=completion
    )
