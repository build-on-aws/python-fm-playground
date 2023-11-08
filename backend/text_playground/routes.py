from fastapi import APIRouter
from . import models
from . import claude
from . import jurassic2


router = APIRouter()


@router.post("/foundation-models/model/text/anthropic.claude-v2/invoke")
def invoke(body: models.ClaudeRequest):
    completion = claude.invoke(body.prompt, body.temperature, body.maxTokens)
    
    return models.TextResponse(
        completion=completion
    )

@router.post("/foundation-models/model/text/ai21.j2-mid-v1/invoke")
def new_route_function(request: models.Jurassic2Request):
    completion = jurassic2.invoke(request.prompt, request.temperature, request.maxTokens)

    return models.TextResponse(
        completion=completion
    )
