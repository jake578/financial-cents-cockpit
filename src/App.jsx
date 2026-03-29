import { useState } from 'react';
import { accounts, signalFeed, summaryStats } from './mockData';

/* ───────── colour tokens ───────── */
const C = {
  brand: '#3B3BF9',
  brandLight: '#B8B8FF',
  brandBg: '#EDEDFF',
  bg: '#F5F5F7',
  white: '#FFFFFF',
  dark: '#1a1a2e',
  gray: '#6b7280',
  grayLight: '#e5e7eb',
  hot: '#ef4444',
  hotBg: '#fef2f2',
  warm: '#f59e0b',
  warmBg: '#fffbeb',
  green: '#10b981',
  greenBg: '#ecfdf5',
};

/* ───────── icons (inline SVG helpers) ───────── */
const icons = {
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  briefcase: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  phone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  fire: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c.5 3.5 3 6 3 9a6 6 0 0 1-12 0c0-3 2.5-5.5 3-9l3 2 3-2z"/></svg>
  ),
};

const signalTypeIcon = {
  website: icons.globe,
  email: icons.mail,
  linkedin: icons.linkedin,
  job: icons.briefcase,
};

/* ───────── date helper ───────── */
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

/* ===================================================================
   Main App
   =================================================================== */
export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = accounts.find((a) => a.id === selectedId) || null;

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* ─── Header ─── */}
      <header style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Financial Cents <span style={{ color: C.brandLight, fontWeight: 400 }}> — SDR Prioritization Cockpit</span>
          </h1>
          <p style={{ color: '#a0a0c0', fontSize: 13, marginTop: 2 }}>AI Jumpstart Program Demo</p>
        </div>
        <span style={{ color: '#a0a0c0', fontSize: 13 }}>{today}</span>
      </header>

      {/* ─── Summary Stats ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
        padding: '24px 32px 0',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        <StatCard label="Accounts in Queue" value={summaryStats.accountsInQueue} color={C.brand} />
        <StatCard label="Hot Signals Today" value={summaryStats.hotSignalsToday} color={C.hot} />
        <StatCard label="Avg Fit Score" value={summaryStats.avgFitScore} color={C.green} />
        <StatCard label="Calls Completed" value={summaryStats.callsCompleted} color={C.warm} />
      </div>

      {/* ─── Main Layout ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selected ? '1fr 1fr' : '1fr 340px',
        gap: 24,
        padding: '24px 32px',
        maxWidth: 1400,
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* ─── Priority Queue ─── */}
          <section style={cardStyle}>
            <h2 style={sectionTitle}>Daily Priority Queue</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {accounts.map((acct) => (
                <AccountRow
                  key={acct.id}
                  account={acct}
                  isSelected={acct.id === selectedId}
                  onSelect={() => setSelectedId(acct.id === selectedId ? null : acct.id)}
                />
              ))}
            </div>
          </section>

          {/* ─── Signal Feed (shows when NO account selected) ─── */}
          {!selected && <SignalFeed />}
        </div>

        {/* RIGHT COLUMN */}
        {selected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <AccountBrief account={selected} onClose={() => setSelectedId(null)} />
            <CallScript account={selected} />
            <SignalFeed />
          </div>
        ) : (
          <SignalFeedSidebar />
        )}
      </div>

      {/* ─── Footer ─── */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 32px',
        color: C.gray,
        fontSize: 12,
      }}>
        Powered by <span style={{ color: C.brand, fontWeight: 600 }}>Skaled</span>
      </footer>
    </div>
  );
}

/* ===================================================================
   Sub-components
   =================================================================== */

/* ─── Stat Card ─── */
function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: C.white,
      borderRadius: 12,
      padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      borderTop: `3px solid ${color}`,
    }}>
      <p style={{ fontSize: 12, color: C.gray, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginTop: 4 }}>{value}</p>
    </div>
  );
}

/* ─── Account Row ─── */
function AccountRow({ account, isSelected, onSelect }) {
  const a = account;
  const strengthStyle = a.strength === 'Hot'
    ? { background: C.hotBg, color: C.hot }
    : { background: C.warmBg, color: C.warm };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 20px',
      borderRadius: 10,
      background: isSelected ? C.brandBg : C.bg,
      border: isSelected ? `2px solid ${C.brand}` : `2px solid transparent`,
      transition: 'all 0.15s ease',
      cursor: 'pointer',
      flexWrap: 'wrap',
    }}
      onClick={onSelect}
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#eeeef4'; }}
      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = C.bg; }}
    >
      {/* Rank */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: a.rank <= 2 ? C.brand : C.brandLight,
        color: a.rank <= 2 ? '#fff' : C.dark,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>#{a.rank}</div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 140 }}>
        <p style={{ fontWeight: 600, fontSize: 15 }}>{a.company}</p>
        <p style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>
          Fit: {a.fitScore} &middot; {a.intentSignals} signals
        </p>
      </div>

      {/* Strength badge */}
      <span style={{
        ...strengthStyle,
        fontSize: 11,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 20,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        flexShrink: 0,
      }}>
        {a.strength === 'Hot' ? icons.fire : icons.zap} {a.strength}
      </span>

      {/* Fit Score bar */}
      <div style={{ width: 80, flexShrink: 0 }}>
        <div style={{ height: 6, borderRadius: 3, background: C.grayLight, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${a.fitScore}%`,
            borderRadius: 3,
            background: a.fitScore >= 90 ? C.green : a.fitScore >= 80 ? C.brand : C.warm,
          }} />
        </div>
        <p style={{ fontSize: 10, color: C.gray, marginTop: 3, textAlign: 'center' }}>{a.fitScore}/100</p>
      </div>

      {/* Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          background: isSelected ? C.dark : C.brand,
          color: '#fff',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        {isSelected ? 'Close' : 'View Brief'}
      </button>
    </div>
  );
}

/* ─── 30-Second Account Brief ─── */
function AccountBrief({ account, onClose }) {
  const a = account;
  return (
    <section style={{ ...cardStyle, borderLeft: `4px solid ${C.brand}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
        <div>
          <h2 style={{ ...sectionTitle, marginBottom: 2 }}>30-Second Brief</h2>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark }}>{a.company}</h3>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: C.gray, padding: 4,
        }}>&times;</button>
      </div>

      {/* Overview */}
      <div style={{ background: C.bg, borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <h4 style={labelStyle}>Company Overview</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 13 }}>
          <div><span style={{ color: C.gray }}>Size:</span> {a.overview.size}</div>
          <div><span style={{ color: C.gray }}>Industry:</span> {a.overview.industry}</div>
          <div><span style={{ color: C.gray }}>Location:</span> {a.overview.location}</div>
          <div><span style={{ color: C.gray }}>Revenue:</span> {a.overview.revenue}</div>
          <div style={{ gridColumn: '1 / -1' }}><span style={{ color: C.gray }}>Tech Stack:</span> {a.overview.techStack}</div>
        </div>
      </div>

      {/* Active Intent Signals */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={labelStyle}>Active Intent Signals</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {a.signals.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 8, background: C.bg, fontSize: 13,
            }}>
              <span style={{ flexShrink: 0 }}>{icons[s.icon]}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600 }}>{s.type}</span> &mdash; {s.detail}
              </div>
              <span style={{ color: C.gray, fontSize: 11, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                {icons.clock} {s.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Starters */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={labelStyle}>Conversation Starters</h4>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          {a.conversationStarters.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>

      {/* Why Now */}
      <div style={{
        background: 'linear-gradient(135deg, #EDEDFF, #f0f4ff)',
        borderRadius: 8,
        padding: 16,
        borderLeft: `3px solid ${C.brand}`,
      }}>
        <h4 style={{ ...labelStyle, color: C.brand }}>Why Now?</h4>
        <p style={{ fontSize: 13, lineHeight: 1.6 }}>{a.whyNow}</p>
      </div>
    </section>
  );
}

/* ─── Call Script ─── */
function CallScript({ account }) {
  const s = account.callScript;
  return (
    <section style={{ ...cardStyle, borderLeft: `4px solid ${C.green}` }}>
      <h2 style={sectionTitle}>Call Script / Talk Track</h2>
      <p style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>For: {account.company}</p>

      {/* Opening */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>{icons.phone} Opening Line</h4>
        <p style={{
          fontSize: 13, lineHeight: 1.6, background: C.greenBg, padding: 14, borderRadius: 8,
          fontStyle: 'italic',
        }}>"{s.opening}"</p>
      </div>

      {/* Discovery Questions */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={labelStyle}>Discovery Questions</h4>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          {s.discoveryQuestions.map((q, i) => (
            <li key={i} style={{ lineHeight: 1.5 }}>{q}</li>
          ))}
        </ol>
      </div>

      {/* Value Hook */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={labelStyle}>Value Hook</h4>
        <p style={{
          fontSize: 13, lineHeight: 1.6, background: C.brandBg, padding: 14, borderRadius: 8,
          borderLeft: `3px solid ${C.brand}`,
        }}>{s.valueHook}</p>
      </div>

      {/* Next Step */}
      <div>
        <h4 style={labelStyle}>Suggested Next Step</h4>
        <p style={{
          fontSize: 13, lineHeight: 1.6, background: '#fef9ef', padding: 14, borderRadius: 8,
          borderLeft: `3px solid ${C.warm}`,
        }}>{s.nextStep}</p>
      </div>
    </section>
  );
}

/* ─── Signal Feed (full-width for below main content) ─── */
function SignalFeed() {
  return (
    <section style={cardStyle}>
      <h2 style={sectionTitle}>Signal Activity Feed</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {signalFeed.map((s) => (
          <div key={s.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 8, fontSize: 13,
            borderBottom: `1px solid ${C.grayLight}`,
          }}>
            <span style={{ flexShrink: 0 }}>{signalTypeIcon[s.type]}</span>
            <span style={{ fontWeight: 600, minWidth: 160 }}>{s.account}</span>
            <span style={{ flex: 1, color: '#444' }}>{s.action}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
              ...(s.strength === 'hot' ? { background: C.hotBg, color: C.hot } : { background: C.warmBg, color: C.warm }),
            }}>{s.strength.toUpperCase()}</span>
            <span style={{ color: C.gray, fontSize: 11, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
              {icons.clock} {s.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Signal Feed Sidebar (compact for right column when no selection) ─── */
function SignalFeedSidebar() {
  return (
    <section style={{ ...cardStyle, maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
      <h2 style={sectionTitle}>Recent Signals</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {signalFeed.map((s) => (
          <div key={s.id} style={{
            padding: '10px 12px', borderRadius: 8, fontSize: 12,
            borderBottom: `1px solid ${C.grayLight}`,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {signalTypeIcon[s.type]}
              <span style={{ fontWeight: 600, fontSize: 12 }}>{s.account}</span>
              <span style={{
                marginLeft: 'auto', fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 10,
                ...(s.strength === 'hot' ? { background: C.hotBg, color: C.hot } : { background: C.warmBg, color: C.warm }),
              }}>{s.strength.toUpperCase()}</span>
            </div>
            <p style={{ color: '#555', fontSize: 11, paddingLeft: 24 }}>{s.action}</p>
            <p style={{ color: C.gray, fontSize: 10, paddingLeft: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
              {icons.clock} {s.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── shared styles ───────── */
const cardStyle = {
  background: C.white,
  borderRadius: 12,
  padding: 24,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
};

const sectionTitle = {
  fontSize: 14,
  fontWeight: 600,
  color: C.gray,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 16,
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: C.gray,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 8,
};
