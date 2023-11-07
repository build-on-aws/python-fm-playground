from pydantic import BaseModel

class ImageRequest(BaseModel):
    prompt: str
    stylePreset: str

# class ImageResponse(BaseModel):
#     imageByteArray: bytes