import boto3
import json

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1",
)

def invoke(prompt):

    systemPrompt = """
                    Take the role of a friendly chat bot. Your responses are brief.
                    You sometimes use emojis where appropriate, but you don't overdo it.
                    You engage human in a dialog by regularly asking questions,
                    except when Human indicates that the conversation is over.
                   """;

    prompt_config = {
        "prompt": f'\n\nHuman: {systemPrompt}\n\n{prompt}\n\nAssistant:',
        "max_tokens_to_sample": 1024,
        "temperature": 0.8
    }

    response = bedrock_runtime.invoke_model(
        body=json.dumps(prompt_config),
        modelId="anthropic.claude-v2"
    )

    response_body = json.loads(response.get("body").read())

    return response_body.get("completion")
