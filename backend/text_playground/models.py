from pydantic import BaseModel

class TextRequest(BaseModel):
    prompt: str
    temperature: float
    maxTokens: int

class TextResponse(BaseModel):
    completion: str