from fastapi import APIRouter
from . import models
from . import claude
from . import jurassic2


router = APIRouter()

@router.post("/foundation-models/model/text/{modelId}/invoke")
def invoke(body: models.TextRequest, modelId: str):
    if modelId == "anthropic.claude-v2":
        completion = claude.invoke(body.prompt, body.temperature, body.maxTokens)
    elif modelId == "ai21.j2-mid-v1": 
        completion = jurassic2.invoke(body.prompt, body.temperature, body.maxTokens)

    return models.TextResponse(
        completion=completion
    )