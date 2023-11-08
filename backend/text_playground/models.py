from pydantic import BaseModel

class TextRequest(BaseModel):
    prompt: str
    temperature: float
    maxTokens: int

class ClaudeRequest(TextRequest):
    prompt: str
    # Randomness and diversity
    # min: 0, max: 1, default: 0.5
    temperature: float = 0.5
    # Length
    # min: 0, max: 4096, default: 200
    maxTokens: int = 200

class Jurassic2Request(TextRequest):
    prompt: str
    # Randomness and diversity
    # min: 0, max: 1, default: 0.5
    temperature: float = 0.5
    # Length
    # min: 0, max: 8191, default: 200
    maxTokens: int = 200

class TextResponse(BaseModel):
    completion: str