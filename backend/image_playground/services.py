import base64
import boto3
import json

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1",
)

STYLES = [
    "3d-model",
    "analog-film",
    "anime",
    "cinematic",
    "comic-book",
    "digital-art",
    "enhance",
    "fantasy-art",
    "isometric",
    "line-art",
    "low-poly",
    "modeling-compound",
    "neon-punk",
    "origami",
    "photographic",
    "pixel-art",
    "tile-texture"
]

def invoke(prompt, style_preset):
    prompt_config = {
        "text_prompts": [ { "text": prompt } ],
        "cfg_scale": 20,
        "steps": 100
    }

    if style_preset in STYLES:
        prompt_config["style_preset"] = style_preset

    response = bedrock_runtime.invoke_model(
        body=json.dumps(prompt_config),
        modelId="stability.stable-diffusion-xl-v1"
    )

    response_body = json.loads(response["body"].read())

    base64_str = response_body["artifacts"][0]["base64"]

    response = base64_str

    return response
