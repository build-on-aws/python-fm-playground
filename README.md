# 🐍 Python FM Playground

Welcome to the Python Foundation Model (FM) Playground, an example app to explore how to use **Amazon Bedrock** with boto3, the AWS SDK for Python.

> 🚨 **Important:** This application is for educational purposes and not intended for production use.

## Overview

This repository includes a **FastAPI** application and a **Next.js** frontend, both executable locally. Below is a screenshot of the app in action.


<img src="screenshot.png" alt="Screenshot of the Python FM Playground" width="720" />

## Prerequisites

Ensure you have the following installed:

- [Python 3.8+](https://www.python.org/downloads/) with pip
- [Node.js (v18.17+)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with npm (for the Next.js frontend)
- An [AWS account](https://aws.amazon.com/free/) with permissions to access Amazon Bedrock
- To use Bedrock, you must [enable access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html#add-model-access) to at least the following models in `us-east-1`: 
  1. Anthropic: Claude
  2. Stability AI: Stable Diffusion XL

## Running the Application

After verifying the prerequisites, follow these steps:

### Clone the repository

Open a terminal, navigate to a directory of your choice, and execute the following command:

```shell
git clone https://github.com/build-on-aws/python-fm-playground.git
```

### Backend Setup

**Note:** It's a good practice to use a virtual environment for your Python projects to manage dependencies separately for each project. If you're not already in a virtual environment, [you can create one and then install your packages there](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/).

In the `python-fm-playground/backend` directory, run:

```shell
pip install -r requirements.txt
python main.py
```

> 🛠 The backend runs on port 55500 by default. See below for port changes.

### Frontent Setup

In a new terminal window, navigate to `python-fm-playground/frontend` and execute:

```shell
npm install
npm run dev
```

> 🛠 The frontend runs on port 3000 by default. See below for port changes.

## Accessing the Application

Open `http://localhost:3000` in your web browser to interact with the application.

## Stopping the Application

To halt the application, you will need to stop both the backend and frontend processes.

### Stopping the Frontend

In the terminal where the frontend is running, press `Ctrl + C` to terminate the process.

### Stopping the Backend

Similarly, in the backend terminal, use the `Ctrl + C` shortcut to stop the server.

If you encounter any issues, you can forcefully terminate the processes by finding the process ID (`PID`) and using the `kill` command on Unix-based systems or Task Manager on Windows.


## Using Different Ports

Change the backend port in the following files:
- `backend/config.py`
- `frontend/app/app.config.js`

To run the frontend on a different port:

```shell
npm run dev -- --port NEW_PORT
```

## Troubleshooting

The AWS Region is hard-coded in the application. However, if your local `AWS_REGION` environment variable is set to a different region, the application may fail. In this case, please make sure to either unset `AWS_REGION`, or set it to `us-east-1`.

## License

This library is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.
