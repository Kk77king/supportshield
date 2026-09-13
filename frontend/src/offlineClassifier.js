const rules = [
  {
    category: 'Phishing / Suspicious Email', risk: 'High', confidence: 'strong', escalation: true,
    keywords: ['phishing', 'suspicious email', 'email', 'clicked the link', 'login email', 'reset email', 'attachment'],
    summary: 'The description contains indicators commonly associated with phishing or social-engineering attempts.',
    actions: ['Stop interacting with the suspicious message or website.', 'If credentials were entered, change the affected password from a trusted device.', 'Enable multi-factor authentication where available.', 'Report the message to your IT or security team and preserve it for review.'],
    escalationReason: 'Credential exposure and malicious links can lead to account compromise.'
  },
  {
    category: 'Malware / Suspicious Download', risk: 'High', confidence: 'strong', escalation: true,
    keywords: ['malware', 'virus', 'downloaded a file', 'download', 'ransomware', 'pop-up', 'popup', 'unknown app'],
    summary: 'The symptoms may indicate malicious software or an unwanted application.',
    actions: ['Disconnect the device from unnecessary network connections.', 'Do not enter passwords or sensitive information on the affected device.', 'Run an approved endpoint or antivirus scan.', 'Preserve the suspicious file or alert details for IT/security analysis.'],
    escalationReason: 'Potential malware can affect credentials, data, and other systems on the network.'
  },
  {
    category: 'Account Compromise / Suspicious Login', risk: 'High', confidence: 'strong', escalation: true,
    keywords: ['suspicious login', 'unknown login', 'login notification', 'country', 'account hacked', 'password changed', 'locked out'],
    summary: 'The activity described may indicate unauthorized access to an account.',
    actions: ['Change the account password using a trusted device.', 'Review active sessions and sign out of unrecognized devices.', 'Enable or verify multi-factor authentication.', 'Review recent account activity for unauthorized changes.'],
    escalationReason: 'Unrecognized authentication activity should be investigated promptly.'
  },
  {
    category: 'Network / Wi-Fi Connectivity', risk: 'Low', confidence: 'strong', escalation: false,
    keywords: ['wifi', 'wi-fi', 'network', 'internet', 'dns', 'cannot connect', "can't connect", 'no connection'],
    summary: 'The issue appears consistent with a local connectivity, wireless, or network configuration problem.',
    actions: ['Confirm whether other devices can reach the same network.', 'Toggle Wi-Fi off and on and reconnect to the expected SSID.', 'Restart the affected device and, if permitted, the network equipment.', 'Check IP configuration and DNS settings if the problem continues.'],
    escalationReason: 'Escalate if multiple users are affected or basic network troubleshooting does not restore service.'
  },
  {
    category: 'System Performance', risk: 'Medium', confidence: 'moderate', escalation: false,
    keywords: ['slow', 'freezing', 'freeze', 'lag', 'performance', 'high cpu', 'memory'],
    summary: 'The device is showing performance degradation that may be caused by resource usage, software, storage, or unwanted processes.',
    actions: ['Restart the device and note whether the issue returns.', 'Check CPU, memory, and disk utilization.', 'Close unnecessary applications and verify available storage.', 'If the slowdown started after an unknown download or pop-up, run an approved security scan.'],
    escalationReason: 'Escalate if performance remains poor, security symptoms appear, or business-critical work is blocked.'
  },
  {
    category: 'Software / Application Issue', risk: 'Low', confidence: 'moderate', escalation: false,
    keywords: ['app', 'application', 'software', 'crash', 'error message', 'not opening', 'update'],
    summary: 'The problem is likely isolated to an application or software configuration.',
    actions: ['Restart the application and capture any error message.', 'Check for approved software updates.', 'Restart the device if the issue persists.', 'Reinstall or repair the application only if permitted by your IT policy.'],
    escalationReason: 'Escalate if the application is business-critical, repeatedly crashes, or requires administrative access.'
  },
  {
    category: 'Hardware / Device Issue', risk: 'Medium', confidence: 'moderate', escalation: false,
    keywords: ['hardware', 'screen', 'keyboard', 'mouse', 'battery', 'overheating', 'won\'t turn on', 'not turning on'],
    summary: 'The symptoms appear related to a physical device, component, power, or peripheral problem.',
    actions: ['Check power, cables, and peripheral connections.', 'Disconnect nonessential accessories and test again.', 'Avoid continued use if the device is overheating, swollen, smoking, or physically damaged.', 'Document any error lights, sounds, or visible damage.'],
    escalationReason: 'Escalate physical damage, power faults, overheating, or persistent failures to IT support.'
  }
];

export function classifyIncident(description) {
  const text = description.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const rule of rules) {
    const score = rule.keywords.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0);
    if (score > bestScore) {
      best = rule;
      bestScore = score;
    }
  }

  if (!best) {
    return {
      category: 'General IT Issue', risk: 'Low', confidence: 'limited', escalation: false,
      summary: 'The description does not strongly match a specific incident rule. Start with basic troubleshooting and collect more details.',
      actions: ['Restart the affected application or device where appropriate.', 'Record any error messages and the time the issue occurred.', 'Confirm whether the problem affects one user or multiple users.', 'Contact IT support if the issue persists or blocks important work.'],
      escalationReason: 'Escalate if the issue persists, spreads to other users, or involves sensitive data or account access.'
    };
  }

  return { ...best };
}
