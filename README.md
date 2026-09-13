SupportShield

IT & Cybersecurity Incident Triage Assistant

SupportShield is a serverless web application that helps users quickly assess common IT and cybersecurity incidents. A user describes an issue such as a suspicious email, account compromise, malware warning, or network problem, and SupportShield classifies the incident, assigns a risk level, recommends immediate actions, and advises whether escalation to an IT or security team is appropriate.

Features
Incident classification
Low, Medium, and High risk assessment
Phishing detection
Malware and suspicious-download analysis
Account compromise detection
Network and Wi-Fi troubleshooting
Hardware and software issue guidance
Recommended remediation steps
Escalation recommendations
Responsive web interface
How It Works
User
  ↓
React Web Application
  ↓
AWS Amplify
  ↓
Amazon API Gateway
  ↓
AWS Lambda
  ↓
Incident Classification Engine
  ↓
Risk Assessment + Recommended Actions
AWS Architecture

SupportShield uses a serverless AWS architecture:

AWS Amplify hosts the React frontend.

Amazon API Gateway exposes the /analyze endpoint used by the frontend.

AWS Lambda analyzes the incident description and generates the assessment.

Example

User input:

I received a suspicious Microsoft login email and clicked the link.

SupportShield can return:

Category: Phishing / Suspicious Email
Risk: High
Escalation: Recommended

Along with immediate steps such as changing exposed credentials, enabling MFA, and reporting the message to the security team.

Technology
React
Vite
JavaScript
AWS Amplify
Amazon API Gateway
AWS Lambda
Node.js
Project Structure
supportshield/
├── frontend/
├── lambda/
├── tests/
├── docs/
├── screenshots/
├── amplify.yml
└── README.md
Security Notice

SupportShield is intended as an educational and first-response triage tool. Users should not submit passwords, access tokens, confidential information, or other sensitive credentials. It is not a replacement for an organization's IT or cybersecurity team.
