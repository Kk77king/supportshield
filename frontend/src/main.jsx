import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Laptop,
  LockKeyhole,
  Network,
  ShieldCheck,
  ShieldAlert,
  Wifi,
} from 'lucide-react';
import './styles.css';

const EXAMPLES = [
  'I received a suspicious Microsoft login email and clicked the link.',
  'My laptop cannot connect to Wi-Fi but my phone can.',
  'My computer became very slow after I downloaded a file.',
  'I got a login notification from a country I have never visited.',
];

const QUICK_CATEGORIES = [
  { label: 'Suspicious email', icon: ShieldAlert },
  { label: 'Network / Wi-Fi', icon: Wifi },
  { label: 'Slow computer', icon: Laptop },
  { label: 'Account security', icon: LockKeyhole },
];

const riskClass = (risk = '') => `risk-pill risk-${risk.toLowerCase()}`;

function App() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL || '', []);

  const analyze = async () => {
    const trimmed = description.trim();
    if (!trimmed) {
      setError('Describe the issue before running the assessment.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (!apiUrl) {
        const mod = await import('./offlineClassifier.js');
        setResult(mod.classifyIncident(trimmed));
        return;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: trimmed }),
      });

      if (!response.ok) throw new Error(`API returned ${response.status}`);
      setResult(await response.json());
    } catch (e) {
      console.error(e);
      setError('The incident service could not be reached. Check the API configuration and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="SupportShield home">
          <span className="brand-mark"><ShieldCheck size={22} /></span>
          <span>SupportShield</span>
        </a>
        <div className="status"><span className="status-dot" /> SYSTEM ONLINE</div>
      </header>

      <main id="top" className="content">
        <section className="hero">
          <div className="eyebrow"><Activity size={15} /> IT & CYBERSECURITY INCIDENT TRIAGE</div>
          <h1>Know what to do <span>before the issue gets worse.</span></h1>
          <p>
            Describe an IT or cybersecurity problem. SupportShield assesses the likely incident type,
            risk level, immediate actions, and whether escalation is recommended.
          </p>
        </section>

        <section className="workspace-grid">
          <div className="panel input-panel">
            <div className="panel-heading">
              <div>
                <span className="step">01</span>
                <h2>Describe the incident</h2>
              </div>
              <CircleHelp size={19} />
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: I received a password reset email I didn't request and clicked the link..."
              maxLength={800}
            />
            <div className="textarea-meta"><span>Do not enter passwords or sensitive personal data.</span><span>{description.length}/800</span></div>

            <div className="quick-grid">
              {QUICK_CATEGORIES.map(({ label, icon: Icon }) => (
                <button key={label} type="button" className="quick-chip" onClick={() => setDescription(label)}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>

            {error && <div className="error-box"><AlertTriangle size={18} /> {error}</div>}

            <button className="primary-btn" type="button" onClick={analyze} disabled={loading}>
              {loading ? 'ANALYZING…' : 'ANALYZE INCIDENT'} <ChevronRight size={18} />
            </button>

            <div className="examples">
              <span>Try an example:</span>
              {EXAMPLES.slice(0, 2).map((text) => (
                <button type="button" key={text} onClick={() => setDescription(text)}>{text}</button>
              ))}
            </div>
          </div>

          <div className={`panel result-panel ${result ? 'has-result' : ''}`}>
            {!result ? (
              <div className="empty-state">
                <div className="radar"><Network size={42} /></div>
                <h2>Assessment ready</h2>
                <p>Your incident assessment will appear here after analysis.</p>
                <div className="empty-stats">
                  <div><b>8</b><span>Incident types</span></div>
                  <div><b>3</b><span>Risk levels</span></div>
                  <div><b>&lt;1s</b><span>Local rules engine</span></div>
                </div>
              </div>
            ) : (
              <div className="assessment">
                <div className="panel-heading assessment-head">
                  <div>
                    <span className="step">02</span>
                    <h2>Threat assessment</h2>
                  </div>
                  <ShieldCheck size={20} />
                </div>

                <div className="assessment-top">
                  <span className={riskClass(result.risk)}>{result.risk} RISK</span>
                  <span className="confidence">Rule match: {result.confidence}</span>
                </div>

                <h3>{result.category}</h3>
                <p className="summary">{result.summary}</p>

                <div className="recommendations">
                  <h4>Recommended actions</h4>
                  {result.actions.map((action) => (
                    <div className="action-row" key={action}><CheckCircle2 size={17} /> <span>{action}</span></div>
                  ))}
                </div>

                <div className={`escalation ${result.escalation ? 'escalate' : 'monitor'}`}>
                  {result.escalation ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                  <div>
                    <b>{result.escalation ? 'Escalation recommended' : 'Self-service troubleshooting appropriate'}</b>
                    <span>{result.escalationReason}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="info-strip">
          <div><ShieldCheck size={18} /><span><b>Privacy first</b> — incident text is only sent to the configured API.</span></div>
          <div><Network size={18} /><span><b>AWS-ready</b> — designed for Amplify, API Gateway, and Lambda.</span></div>
        </section>
      </main>

      <footer>
        <span>SupportShield</span>
        <span>Built for the AWS Weekend Deployment Challenge</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
