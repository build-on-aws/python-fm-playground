'use client';

export default function Home() {
  return (
      <div className="container px-6 py-8 mx-auto">
          <h3 className="text-3xl font-medium text-gray-700">Welcome to the Python FM Playground!</h3>
          <div className="mt-8">
              The Python Foundation Model (FM) Playground is a sample application showcasing how to leverage Amazon
              Bedrock using Python. As any sample application, it is not production-ready. It is provided
              for the sole purpose of illustrating how Python developers can leverage Amazon Bedrock to build
              generative AI-enabled applications.
          </div>
          <div className="mt-8"></div>
          <div className="mt-4">
              Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation
              models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Stability AI,
              and Amazon via a single API.
          </div>
      </div>
  )
}
