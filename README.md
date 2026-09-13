# SupportShield

**IT & Cybersecurity Incident Triage** — a small serverless web app built for the AWS Weekend Deployment Challenge.

SupportShield lets a user describe a common IT or cybersecurity issue and returns a category, risk level, recommended immediate actions, and an escalation recommendation.

## Architecture

```text
User browser
    |
    v
AWS Amplify Hosting
    |
    v
Amazon API Gateway (HTTP API / POST)
    |
    v
AWS Lambda (Node.js 24.x)
    |
    v
Rule-based incident assessment
```

## Project structure

```text
supportshield/
├── frontend/                  React + Vite UI
├── lambda/incident-analyzer/ AWS Lambda function
├── tests/                     Lightweight Lambda tests
├── docs/                      Architecture/article assets
└── screenshots/               Challenge screenshots
```

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend includes a local classifier fallback, so it works before AWS is connected.

### Lambda test

```bash
node tests/lambda-test.mjs
```

## AWS deployment plan

1. Create a Lambda function using the Node.js 24.x runtime.
2. Paste `lambda/incident-analyzer/index.mjs` into the function and set the handler to `index.handler` if required by the console packaging format.
3. Create an API Gateway HTTP API with a `POST /analyze` route targeting the Lambda function.
4. Enable CORS for the Amplify domain (or `*` during the challenge MVP).
5. Copy the API invoke URL into `frontend/.env` as `VITE_API_URL=...`.
6. Push the repository to GitHub.
7. Create an AWS Amplify app connected to the GitHub repository and set the app root/build configuration to `frontend`.
8. Deploy and test the public URL.

## Security / scope notes

- Do not enter real passwords, access tokens, or confidential information.
- This is a demonstration triage assistant, not a replacement for an organization's security team.
- Version 1 uses deterministic rules so deployment does not depend on an LLM, Bedrock access, or model quotas.

## Challenge article title

`Weekend Deployment Challenge: SupportShield`

Required tag: `#deployment`
