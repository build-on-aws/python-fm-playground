from fastapi import APIRouter
from . import models
from . import services

router = APIRouter()


@router.post("/foundation-models/model/chat/anthropic.claude-v2/invoke")
def invoke(body: models.ChatRequest):
    completion = services.invoke(body.prompt)
    
    return models.ChatResponse(
        completion=completion
    )
