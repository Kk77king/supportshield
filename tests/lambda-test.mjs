import { handler } from '../lambda/incident-analyzer/index.mjs';

const cases = [
  ['phishing', 'I received a suspicious email and clicked the link.', 'Phishing / Suspicious Email', 'High'],
  ['network', 'My laptop cannot connect to Wi-Fi but my phone can.', 'Network / Wi-Fi Connectivity', 'Low'],
  ['malware', 'My computer is slow after I downloaded a file and now I get pop-ups.', 'Malware / Suspicious Download', 'High'],
  ['account', 'I received a login notification from another country.', 'Account Compromise / Suspicious Login', 'High'],
];

for (const [name, description, category, risk] of cases) {
  const response = await handler({
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({ description }),
  });
  const body = JSON.parse(response.body);
  if (response.statusCode !== 200 || body.category !== category || body.risk !== risk) {
    throw new Error(`${name} failed: ${response.statusCode} ${response.body}`);
  }
  console.log(`PASS ${name}: ${body.category} / ${body.risk}`);
}
