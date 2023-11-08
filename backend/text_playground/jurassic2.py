import boto3
import json

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1",
)

def invoke(prompt, temperature, max_tokens):
    prompt_config = {
        "prompt": prompt,
        "maxTokens": max_tokens,
        "temperature": temperature
    }

    response = bedrock_runtime.invoke_model(
        body=json.dumps(prompt_config),
        modelId="ai21.j2-mid-v1"
    )

    response_body = json.loads(response.get("body").read())

    completion = response_body["completions"][0]["data"]["text"]
    if completion.startswith("\n"):
        completion = completion[1:]

    return completion
