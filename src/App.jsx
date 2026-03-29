import { useState, useEffect } from 'react';
import { accounts, signalFeed, summaryStats, performanceData } from './mockData';

/* ═══════════════════════════════════════════
   COLOR TOKENS — HubSpot Design Language
   ═══════════════════════════════════════════ */
const C = {
  orange: '#ff7a59',
  orangeHover: '#ff5c35',
  orangeLight: '#fff1ee',
  navy: '#2d3e50',
  navyLight: '#3b4f63',
  navyDark: '#253342',
  teal: '#00bda5',
  tealLight: '#e5f8f5',
  white: '#ffffff',
  bg: '#f5f8fa',
  bgCard: '#ffffff',
  text: '#33475b',
  textLight: '#516f90',
  textMuted: '#7c98b6',
  border: '#cbd6e2',
  borderLight: '#eaf0f6',
  hot: '#f2545b',
  hotBg: '#fef0f0',
  warm: '#f5a623',
  warmBg: '#fef8ee',
  green: '#00bda5',
  greenBg: '#e5f8f5',
};

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */
const Icon = {
  contacts: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  companies: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  ),
  deals: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  tasks: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2 2h11"/></svg>
  ),
  aiQueue: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  signal: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
  ),
  dashboard: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  ),
  globe: (color = C.textLight) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
  ),
  mail: (color = C.textLight) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  linkedin: (color = '#0077b5') => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  briefcase: (color = C.textLight) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  ),
  phone: (color = C.green) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  phoneEnd: (color = '#f2545b') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  clock: (color = C.textMuted) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  fire: (color = '#f2545b') => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c.5 3.5 3 6 3 9a6 6 0 0 1-12 0c0-3 2.5-5.5 3-9l3 2 3-2z"/></svg>
  ),
  zap: (color = '#f5a623') => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  arrowLeft: (color = C.textLight) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
  ),
  close: (color = C.textMuted) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  send: (color = '#fff') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  check: (color = C.green) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  user: (color = C.textLight) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  search: (color = C.textMuted) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  bell: (color = '#fff') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  settings: (color = '#fff') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  externalLink: (color = C.textMuted) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
};

const signalTypeIcon = {
  website: Icon.globe,
  email: Icon.mail,
  linkedin: Icon.linkedin,
  job: Icon.briefcase,
};

const signalIconMap = {
  'Website Visit': 'globe',
  'Email Engagement': 'mail',
  'Email Reply': 'mail',
  'Job Posting': 'briefcase',
  'LinkedIn Activity': 'linkedin',
  'Webinar': 'globe',
  'Content Download': 'globe',
  'Blog Engagement': 'globe',
};

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [activeView, setActiveView] = useState('queue');
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [showDialer, setShowDialer] = useState(null);
  const [showCompose, setShowCompose] = useState(null);
  const [toast, setToast] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [completedAccounts, setCompletedAccounts] = useState([]);

  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || null;

  const navigateToAccount = (id) => {
    setSelectedAccountId(id);
    setActiveView('detail');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action, account) => {
    if (action.type === 'call') {
      const contact = account.contacts[0];
      setShowDialer({ name: contact.name, phone: contact.phone, company: account.company });
    } else if (action.type === 'email') {
      const contact = account.contacts[0];
      setShowCompose({ name: contact.name, email: contact.email, company: account.company, subject: action.subtitle });
    } else if (action.type === 'deal') {
      showToast(`Deal created for ${account.company} — added to pipeline`);
    }
  };

  const navItems = [
    { id: 'queue', label: 'AI Priority Queue', icon: Icon.aiQueue, accent: true },
    { id: 'signal', label: 'Signal Feed', icon: Icon.signal },
    { id: 'dashboard', label: 'Performance', icon: Icon.dashboard },
    { id: 'divider' },
    { id: 'contacts', label: 'Contacts', icon: Icon.contacts },
    { id: 'companies', label: 'Companies', icon: Icon.companies },
    { id: 'deals', label: 'Deals', icon: Icon.deals },
    { id: 'tasks', label: 'Tasks', icon: Icon.tasks },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.bg }}>
      {/* ═══ LEFT SIDEBAR NAV ═══ */}
      <nav style={{
        width: 56,
        background: C.navy,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 0,
        flexShrink: 0,
        zIndex: 100,
      }}>
        {/* HubSpot sprocket logo area */}
        <div style={{
          width: 56, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: C.navyDark, marginBottom: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: C.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff',
          }}>H</div>
        </div>

        {navItems.map((item) => {
          if (item.id === 'divider') {
            return <div key="div" style={{ width: 32, height: 1, background: C.navyLight, margin: '8px 0' }} />;
          }
          const isActive = (activeView === item.id) || (activeView === 'detail' && item.id === 'queue');
          const isHovered = hoveredNav === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (['contacts','companies','deals','tasks'].includes(item.id)) return;
                setActiveView(item.id);
                setSelectedAccountId(null);
              }}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                width: 44, height: 44, borderRadius: 8, marginBottom: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: ['contacts','companies','deals','tasks'].includes(item.id) ? 'default' : 'pointer',
                background: isActive ? (item.accent ? C.orange : 'rgba(255,255,255,0.12)') : isHovered ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'background 0.15s',
                position: 'relative',
              }}
              title={item.label}
            >
              {item.icon(isActive ? '#fff' : 'rgba(255,255,255,0.6)')}
              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: 'absolute', left: 54, top: '50%', transform: 'translateY(-50%)',
                  background: '#1a1a2e', color: '#fff', fontSize: 12, fontWeight: 500,
                  padding: '6px 12px', borderRadius: 6, whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 200,
                  pointerEvents: 'none',
                }}>
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* ═══ TOP NAV BAR ═══ */}
        <header style={{
          height: 52, background: C.navy, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 24px', flexShrink: 0,
          borderBottom: `1px solid ${C.navyDark}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: C.orange, fontWeight: 700, fontSize: 15 }}>Financial Cents Portal</span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 14px',
            }}>
              {Icon.search('rgba(255,255,255,0.4)')}
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Search contacts, companies, deals...</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              {Icon.bell('rgba(255,255,255,0.7)')}
              <div style={{
                position: 'absolute', top: -4, right: -4, width: 8, height: 8,
                borderRadius: '50%', background: C.orange,
              }} />
            </div>
            {Icon.settings('rgba(255,255,255,0.5)')}
            <div style={{
              width: 30, height: 30, borderRadius: '50%', background: C.orange,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
            }}>JD</div>
          </div>
        </header>

        {/* ═══ CONTENT AREA ═══ */}
        <main style={{ flex: 1, overflow: 'auto', padding: 0 }}>
          {activeView === 'queue' && (
            <QueueView
              navigateToAccount={navigateToAccount}
              completedAccounts={completedAccounts}
            />
          )}
          {activeView === 'detail' && selectedAccount && (
            <DetailView
              account={selectedAccount}
              onBack={() => { setActiveView('queue'); setSelectedAccountId(null); }}
              onAction={(action) => handleAction(action, selectedAccount)}
              navigateToAccount={navigateToAccount}
            />
          )}
          {activeView === 'signal' && (
            <SignalFeedView navigateToAccount={navigateToAccount} />
          )}
          {activeView === 'dashboard' && (
            <DashboardView />
          )}
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer style={{
          height: 36, background: '#fff', borderTop: `1px solid ${C.borderLight}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: C.textMuted, flexShrink: 0, gap: 4,
        }}>
          Powered by <span style={{ color: C.orange, fontWeight: 600 }}>Skaled</span> — AI Jumpstart Program
          <span style={{ margin: '0 8px', color: C.border }}>|</span>
          This demo shows how SDR Prioritization lives natively inside HubSpot. No separate tools. No context switching.
        </footer>
      </div>

      {/* ═══ DIALER OVERLAY ═══ */}
      {showDialer && (
        <DialerOverlay
          contact={showDialer}
          onClose={() => setShowDialer(null)}
        />
      )}

      {/* ═══ EMAIL COMPOSE OVERLAY ═══ */}
      {showCompose && (
        <ComposeOverlay
          contact={showCompose}
          onClose={() => setShowCompose(null)}
          onSend={() => { setShowCompose(null); showToast('Email sent successfully'); }}
        />
      )}

      {/* ═══ TOAST ═══ */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: C.navy, color: '#fff', padding: '12px 24px', borderRadius: 8,
          fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 8, zIndex: 9999,
          animation: 'slideUp 0.3s ease-out',
        }}>
          {Icon.check('#fff')}
          {toast}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEW 1: AI PRIORITY QUEUE
   ═══════════════════════════════════════════ */
function QueueView({ navigateToAccount, completedAccounts }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      {/* Page Header */}
      <div style={{
        padding: '20px 28px 16px', background: '#fff', borderBottom: `1px solid ${C.borderLight}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>AI Priority Queue</h1>
            <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
              Your prioritized outreach list for today, ranked by AI scoring
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              ...btnOutline, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {Icon.signal(C.textLight)}
              Refresh Signals
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        padding: '20px 28px',
      }}>
        <StatCard label="Today's Queue" value={summaryStats.todayQueue} suffix=" accounts" icon="queue" color={C.orange} />
        <StatCard label="Signals Detected" value={summaryStats.signalsDetected} icon="signal" color={C.teal} />
        <StatCard label="Est. Pipeline Value" value={summaryStats.estimatedPipeline} icon="deals" color={C.green} />
        <StatCard label="Queue Completion" value={summaryStats.queueCompletion} icon="tasks" color={C.textMuted} />
      </div>

      {/* Priority Queue Table */}
      <div style={{ padding: '0 28px 28px' }}>
        <div style={{
          background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
          overflow: 'hidden',
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 2fr 100px 120px 100px 140px',
            padding: '12px 20px',
            background: '#f5f8fa',
            borderBottom: `1px solid ${C.borderLight}`,
            fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <span>Priority</span>
            <span>Company</span>
            <span>Fit Score</span>
            <span>Signals</span>
            <span>Status</span>
            <span style={{ textAlign: 'right' }}>Actions</span>
          </div>

          {/* Table Rows */}
          {accounts.map((acct) => (
            <div
              key={acct.id}
              onClick={() => navigateToAccount(acct.id)}
              onMouseEnter={() => setHoveredRow(acct.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 2fr 100px 120px 100px 140px',
                padding: '16px 20px',
                alignItems: 'center',
                borderBottom: `1px solid ${C.borderLight}`,
                cursor: 'pointer',
                background: hoveredRow === acct.id ? '#f0f5fa' : '#fff',
                transition: 'background 0.12s',
              }}
            >
              {/* Priority */}
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: '50%',
                  background: acct.priority <= 2 ? C.orange : C.borderLight,
                  color: acct.priority <= 2 ? '#fff' : C.text,
                  fontSize: 14, fontWeight: 700,
                }}>
                  {acct.priority}
                </span>
              </div>

              {/* Company */}
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{acct.company}</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                  {acct.overview.size} &middot; {acct.overview.location} &middot; {acct.overview.currentTools}
                </div>
              </div>

              {/* Fit Score */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 48, height: 6, borderRadius: 3, background: C.borderLight, overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${acct.fitScore}%`, height: '100%', borderRadius: 3,
                      background: acct.fitScore >= 90 ? C.teal : acct.fitScore >= 85 ? C.orange : C.warm,
                    }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{acct.fitScore}</span>
                </div>
              </div>

              {/* Signals */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{acct.signalCount}</span>
                <span style={{ fontSize: 12, color: C.textMuted }}>signals</span>
              </div>

              {/* Status */}
              <div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 4,
                  textTransform: 'uppercase', letterSpacing: '0.03em',
                  ...(acct.strength === 'Hot'
                    ? { background: C.hotBg, color: C.hot }
                    : { background: C.warmBg, color: C.warm }),
                }}>
                  {acct.strength === 'Hot' && Icon.fire()} {acct.strength}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateToAccount(acct.id); }}
                  style={{
                    ...btnPrimary, fontSize: 12, padding: '6px 14px',
                  }}
                >
                  View Account
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEW 2: ACCOUNT DETAIL
   ═══════════════════════════════════════════ */
function DetailView({ account, onBack, onAction, navigateToAccount }) {
  const a = account;
  const [hoveredAction, setHoveredAction] = useState(null);
  const [expandedScript, setExpandedScript] = useState(true);

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      {/* Page Header */}
      <div style={{
        padding: '14px 28px', background: '#fff', borderBottom: `1px solid ${C.borderLight}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={onBack} style={{
          ...btnGhost, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
        }}>
          {Icon.arrowLeft(C.orange)}
          <span style={{ color: C.orange }}>Back to Queue</span>
        </button>
        <span style={{ color: C.border }}>|</span>
        <span style={{ fontSize: 13, color: C.textMuted }}>Company Record</span>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0,
        height: 'calc(100vh - 52px - 52px - 36px)',
        overflow: 'hidden',
      }}>
        {/* ═══ LEFT COLUMN (65%) ═══ */}
        <div style={{ overflow: 'auto', padding: '24px 28px', borderRight: `1px solid ${C.borderLight}` }}>
          {/* Company Header */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 10, background: C.orange,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {a.company.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>{a.company}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>{a.overview.industry}</span>
                <span style={{ color: C.border }}>|</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>{a.overview.location}</span>
                <span style={{ color: C.border }}>|</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>{a.overview.size}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                {Icon.externalLink(C.textMuted)}
                <span style={{ fontSize: 12, color: C.orange }}>{a.website}</span>
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 4,
              ...(a.strength === 'Hot'
                ? { background: C.hotBg, color: C.hot }
                : { background: C.warmBg, color: C.warm }),
            }}>
              {a.strength === 'Hot' ? 'HOT' : 'WARM'}
            </span>
          </div>

          {/* About This Company */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            marginBottom: 24, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: '#f5f8fa',
              borderBottom: `1px solid ${C.borderLight}`,
              fontSize: 13, fontWeight: 600, color: C.text,
            }}>
              About This Company
            </div>
            <div style={{ padding: '4px 0' }}>
              {[
                ['Company Size', a.overview.size],
                ['Industry', a.overview.industry],
                ['Location', a.overview.location],
                ['Annual Revenue', a.overview.revenue],
                ['Current Tools', a.overview.currentTools],
                ['Founded', a.overview.founded],
                ['Specialties', a.overview.specialties],
              ].map(([label, val]) => (
                <div key={label} style={{
                  display: 'flex', padding: '10px 16px',
                  borderBottom: `1px solid ${C.borderLight}`,
                  fontSize: 13,
                }}>
                  <span style={{ width: 160, color: C.textMuted, fontWeight: 500, flexShrink: 0 }}>{label}</span>
                  <span style={{ color: C.text }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            marginBottom: 24, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: '#f5f8fa',
              borderBottom: `1px solid ${C.borderLight}`,
              fontSize: 13, fontWeight: 600, color: C.text,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>Activity Timeline</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: C.textMuted }}>{a.signals.length} activities</span>
            </div>
            <div style={{ padding: '16px' }}>
              {a.signals.map((sig, i) => {
                const iconKey = signalIconMap[sig.type] || 'globe';
                const iconFn = Icon[iconKey] || Icon.globe;
                return (
                  <div key={i} style={{
                    display: 'flex', gap: 12, marginBottom: i < a.signals.length - 1 ? 0 : 0,
                    position: 'relative',
                  }}>
                    {/* Timeline line */}
                    {i < a.signals.length - 1 && (
                      <div style={{
                        position: 'absolute', left: 15, top: 32, bottom: -16,
                        width: 2, background: C.borderLight,
                      }} />
                    )}
                    {/* Icon */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: sig.strength === 'hot' ? C.hotBg : '#f5f8fa',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, zIndex: 1,
                      border: `2px solid ${sig.strength === 'hot' ? C.hot : C.borderLight}`,
                    }}>
                      {iconFn(sig.strength === 'hot' ? C.hot : C.textMuted)}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, paddingBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{sig.type}</span>
                        {sig.strength === 'hot' && (
                          <span style={{
                            fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 3,
                            background: C.hotBg, color: C.hot,
                          }}>HIGH INTENT</span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, color: C.textLight, marginTop: 2, lineHeight: 1.5 }}>
                        {sig.detail}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                        {Icon.clock()}
                        <span style={{ fontSize: 11, color: C.textMuted }}>{sig.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI-Generated Call Script */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            marginBottom: 24, overflow: 'hidden',
          }}>
            <div
              onClick={() => setExpandedScript(!expandedScript)}
              style={{
                padding: '12px 16px', background: '#f5f8fa',
                borderBottom: expandedScript ? `1px solid ${C.borderLight}` : 'none',
                fontSize: 13, fontWeight: 600, color: C.text,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {Icon.aiQueue(C.orange)}
                <span>AI-Generated Call Script</span>
              </div>
              <span style={{ fontSize: 18, color: C.textMuted, lineHeight: 1 }}>
                {expandedScript ? '\u2212' : '+'}
              </span>
            </div>
            {expandedScript && (
              <div style={{ padding: '20px' }}>
                {/* Opening */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: 8,
                  }}>Opening Line</div>
                  <div style={{
                    padding: 14, borderRadius: 6, background: C.orangeLight,
                    borderLeft: `3px solid ${C.orange}`, fontSize: 13, lineHeight: 1.6,
                    fontStyle: 'italic', color: C.text,
                  }}>
                    "{a.callScript.opening}"
                  </div>
                </div>

                {/* Discovery Questions */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: 8,
                  }}>Discovery Questions</div>
                  <ol style={{ paddingLeft: 20, fontSize: 13, color: C.text, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {a.callScript.discoveryQuestions.map((q, i) => (
                      <li key={i} style={{ lineHeight: 1.6 }}>{q}</li>
                    ))}
                  </ol>
                </div>

                {/* Value Hook */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: 8,
                  }}>Value Hook</div>
                  <div style={{
                    padding: 14, borderRadius: 6, background: C.tealLight,
                    borderLeft: `3px solid ${C.teal}`, fontSize: 13, lineHeight: 1.6, color: C.text,
                  }}>
                    {a.callScript.valueHook}
                  </div>
                </div>

                {/* Objection Handler */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: 8,
                  }}>Objection Handler</div>
                  <div style={{
                    padding: 14, borderRadius: 6, background: C.warmBg,
                    borderLeft: `3px solid ${C.warm}`, fontSize: 13, lineHeight: 1.6, color: C.text,
                  }}>
                    {a.callScript.objectionHandler}
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: 8,
                  }}>Suggested CTA</div>
                  <div style={{
                    padding: 14, borderRadius: 6, background: '#f5f8fa',
                    borderLeft: `3px solid ${C.navy}`, fontSize: 13, lineHeight: 1.6, color: C.text,
                    fontWeight: 500,
                  }}>
                    {a.callScript.suggestedCTA}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══ RIGHT COLUMN (35%) ═══ */}
        <div style={{ overflow: 'auto', padding: '24px 20px', background: '#f5f8fa' }}>
          {/* AI Priority Score */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            marginBottom: 16, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: C.navy, color: '#fff',
              fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {Icon.aiQueue('#fff')}
              AI Priority Score
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 72, height: 72, borderRadius: '50%',
                  background: `conic-gradient(${C.orange} ${a.fitScore * 3.6}deg, ${C.borderLight} 0deg)`,
                  position: 'relative',
                }}>
                  <div style={{
                    width: 58, height: 58, borderRadius: '50%', background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: 700, color: C.text,
                  }}>
                    {a.fitScore}
                  </div>
                </div>
              </div>
              {[
                { label: 'Fit Score', value: a.fitScore, color: C.teal },
                { label: 'Intent Score', value: a.intentScore, color: C.orange },
                { label: 'Timing Score', value: a.timingScore, color: C.warm },
              ].map((s) => (
                <div key={s.label} style={{ marginBottom: 10 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', fontSize: 12,
                    color: C.textMuted, marginBottom: 4,
                  }}>
                    <span>{s.label}</span>
                    <span style={{ fontWeight: 600, color: C.text }}>{s.value}/100</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: C.borderLight, overflow: 'hidden' }}>
                    <div style={{
                      width: `${s.value}%`, height: '100%', borderRadius: 3, background: s.color,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Actions */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            marginBottom: 16, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: '#f5f8fa',
              borderBottom: `1px solid ${C.borderLight}`,
              fontSize: 13, fontWeight: 600, color: C.text,
            }}>
              Recommended Actions
            </div>
            <div style={{ padding: '8px' }}>
              {a.recommendedActions.map((action, i) => (
                <div
                  key={i}
                  onClick={() => onAction(action)}
                  onMouseEnter={() => setHoveredAction(i)}
                  onMouseLeave={() => setHoveredAction(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px', borderRadius: 6,
                    cursor: 'pointer',
                    background: hoveredAction === i ? '#f0f5fa' : 'transparent',
                    transition: 'background 0.12s',
                    borderBottom: i < a.recommendedActions.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 6,
                    background: action.type === 'call' ? C.tealLight : action.type === 'email' ? C.orangeLight : C.warmBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {action.type === 'call' ? Icon.phone(C.teal) : action.type === 'email' ? Icon.mail(C.orange) : Icon.deals(C.warm)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{action.label}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {action.subtitle}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 3,
                    background: action.priority === 'high' ? C.hotBg : C.warmBg,
                    color: action.priority === 'high' ? C.hot : C.warm,
                    textTransform: 'uppercase', flexShrink: 0,
                  }}>
                    {action.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Contacts */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            marginBottom: 16, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: '#f5f8fa',
              borderBottom: `1px solid ${C.borderLight}`,
              fontSize: 13, fontWeight: 600, color: C.text,
            }}>
              Key Contacts
            </div>
            <div style={{ padding: '8px' }}>
              {a.contacts.map((contact, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '12px', borderRadius: 6,
                  borderBottom: i < a.contacts.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: contact.isPrimary ? C.orange : C.borderLight,
                    color: contact.isPrimary ? '#fff' : C.text,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, flexShrink: 0,
                  }}>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{contact.name}</span>
                      {contact.isPrimary && (
                        <span style={{
                          fontSize: 9, fontWeight: 600, padding: '2px 5px', borderRadius: 3,
                          background: C.orangeLight, color: C.orange,
                        }}>PRIMARY</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 1 }}>{contact.title}</div>
                    <div style={{ fontSize: 11, color: C.orange, marginTop: 3 }}>{contact.email}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{contact.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Starters */}
          <div style={{
            background: '#fff', border: `1px solid ${C.borderLight}`, borderRadius: 8,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px', background: '#f5f8fa',
              borderBottom: `1px solid ${C.borderLight}`,
              fontSize: 13, fontWeight: 600, color: C.text,
            }}>
              Conversation Starters
            </div>
            <div style={{ padding: '12px 16px' }}>
              {a.conversationStarters.map((starter, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, marginBottom: i < a.conversationStarters.length - 1 ? 12 : 0,
                  padding: '10px 12px', background: '#f5f8fa', borderRadius: 6,
                  fontSize: 13, lineHeight: 1.5, color: C.text,
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: '50%',
                    background: C.orangeLight, color: C.orange,
                    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  <span>{starter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEW 3: SIGNAL FEED
   ═══════════════════════════════════════════ */
function SignalFeedView({ navigateToAccount }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{
        padding: '20px 28px 16px', background: '#fff', borderBottom: `1px solid ${C.borderLight}`,
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Signal Feed</h1>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
          Real-time buyer intent signals across all tracked accounts
        </p>
      </div>

      <div style={{ padding: '20px 28px' }}>
        <div style={{
          background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
          overflow: 'hidden',
        }}>
          {signalFeed.map((sig, i) => {
            const iconFn = signalTypeIcon[sig.type] || Icon.globe;
            return (
              <div
                key={sig.id}
                onClick={() => navigateToAccount(sig.accountId)}
                onMouseEnter={() => setHoveredRow(sig.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 20px',
                  borderBottom: i < signalFeed.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                  cursor: 'pointer',
                  background: hoveredRow === sig.id ? '#f0f5fa' : '#fff',
                  transition: 'background 0.12s',
                }}
              >
                {/* Signal icon */}
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: sig.strength === 'hot' ? C.hotBg : '#f5f8fa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  border: `1.5px solid ${sig.strength === 'hot' ? C.hot : C.borderLight}`,
                }}>
                  {iconFn(sig.strength === 'hot' ? C.hot : C.textMuted)}
                </div>

                {/* Company name */}
                <span style={{
                  fontWeight: 600, fontSize: 13, color: C.orange,
                  width: 220, flexShrink: 0,
                }}>
                  {sig.account}
                </span>

                {/* Description */}
                <span style={{ flex: 1, fontSize: 13, color: C.text, lineHeight: 1.4 }}>
                  {sig.action}
                </span>

                {/* Strength badge */}
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                  flexShrink: 0, textTransform: 'uppercase',
                  ...(sig.strength === 'hot'
                    ? { background: C.hotBg, color: C.hot }
                    : { background: C.warmBg, color: C.warm }),
                }}>
                  {sig.strength}
                </span>

                {/* Time */}
                <span style={{
                  fontSize: 12, color: C.textMuted, flexShrink: 0, width: 100,
                  display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end',
                }}>
                  {Icon.clock()}
                  {sig.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEW 4: PERFORMANCE DASHBOARD
   ═══════════════════════════════════════════ */
function DashboardView() {
  const pd = performanceData;

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{
        padding: '20px 28px 16px', background: '#fff', borderBottom: `1px solid ${C.borderLight}`,
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Performance Dashboard</h1>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
          Weekly SDR performance metrics and signal analytics
        </p>
      </div>

      <div style={{ padding: '20px 28px' }}>
        {/* Top Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {/* Calls vs Target — Circular */}
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
            padding: 20, textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Calls vs Target
            </div>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke={C.borderLight} strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={C.orange} strokeWidth="8"
                  strokeDasharray={`${(pd.callsMade / pd.callsTarget) * 213.6} 213.6`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                fontSize: 18, fontWeight: 700, color: C.text,
              }}>
                {pd.callsMade}
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{pd.callsMade} / {pd.callsTarget} calls</div>
          </div>

          {/* Pipeline Generated */}
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
            padding: 20, textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Pipeline This Week
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.teal, marginBottom: 4 }}>
              {pd.pipelineGenerated}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Target: {pd.pipelineTarget}</div>
            <div style={{ height: 6, borderRadius: 3, background: C.borderLight, overflow: 'hidden', marginTop: 10 }}>
              <div style={{
                width: '78%', height: '100%', borderRadius: 3, background: C.teal,
              }} />
            </div>
          </div>

          {/* Signal-to-Meeting */}
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
            padding: 20, textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Signal-to-Meeting Rate
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.orange, marginBottom: 4 }}>
              {pd.signalToMeeting}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{pd.meetingsBooked} meetings booked</div>
          </div>

          {/* Avg Response Time */}
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
            padding: 20, textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Avg Response Time
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
              {pd.avgResponseTime}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>From signal to outreach</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Top Signal Types Bar Chart */}
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
            padding: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 20 }}>
              Top Performing Signal Types
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {pd.topSignals.map((sig) => (
                <div key={sig.type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                    <span style={{ color: C.text, fontWeight: 500 }}>{sig.type}</span>
                    <span style={{ color: C.textMuted }}>{sig.conversions}% conversion</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: C.borderLight, overflow: 'hidden' }}>
                    <div style={{
                      width: `${sig.conversions}%`, height: '100%', borderRadius: 5,
                      background: sig.conversions >= 50 ? C.teal : sig.conversions >= 35 ? C.orange : C.warm,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Trend */}
          <div style={{
            background: '#fff', borderRadius: 8, border: `1px solid ${C.borderLight}`,
            padding: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 20 }}>
              Weekly Activity Trend
            </div>
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 16, height: 160,
              padding: '0 12px',
            }}>
              {pd.weeklyTrend.map((day) => (
                <div key={day.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 120 }}>
                    {/* Calls bar */}
                    <div style={{
                      width: 20, borderRadius: '4px 4px 0 0',
                      background: C.orange,
                      height: `${(day.calls / 5) * 100}%`,
                      minHeight: day.calls > 0 ? 8 : 0,
                      transition: 'height 0.5s ease',
                    }} />
                    {/* Meetings bar */}
                    <div style={{
                      width: 20, borderRadius: '4px 4px 0 0',
                      background: C.teal,
                      height: `${(day.meetings / 5) * 100}%`,
                      minHeight: day.meetings > 0 ? 8 : 0,
                      transition: 'height 0.5s ease',
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 500 }}>{day.day}</span>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16,
              fontSize: 11, color: C.textMuted,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: C.orange }} />
                Calls
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: C.teal }} />
                Meetings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DIALER OVERLAY
   ═══════════════════════════════════════════ */
function DialerOverlay({ contact, onClose }) {
  const [callState, setCallState] = useState('idle'); // idle, ringing, connected
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (callState === 'ringing') {
      const t = setTimeout(() => setCallState('connected'), 2000);
      return () => clearTimeout(t);
    }
  }, [callState]);

  useEffect(() => {
    if (callState === 'connected') {
      const interval = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      width: 320, background: '#fff', borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
      overflow: 'hidden', zIndex: 9000,
      animation: 'slideUp 0.3s ease-out',
    }}>
      {/* Header */}
      <div style={{
        background: C.navy, padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {Icon.phone('#fff')}
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>
            {callState === 'idle' ? 'HubSpot Calling' : callState === 'ringing' ? 'Ringing...' : 'Connected'}
          </span>
        </div>
        <button onClick={onClose} style={{ ...btnGhost, padding: 4 }}>
          {Icon.close('#fff')}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 16px', textAlign: 'center' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: C.orange,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px', fontSize: 18, fontWeight: 700, color: '#fff',
        }}>
          {contact.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{contact.name}</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{contact.company}</div>
        <div style={{ fontSize: 14, color: C.orange, fontWeight: 500, marginTop: 4 }}>{contact.phone}</div>

        {callState === 'connected' && (
          <div style={{
            fontSize: 20, fontWeight: 600, color: C.teal, marginTop: 12,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatTime(timer)}
          </div>
        )}

        {callState === 'ringing' && (
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 12, animation: 'pulse 1.5s infinite' }}>
            Connecting...
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{
        padding: '12px 16px 16px', display: 'flex', justifyContent: 'center', gap: 16,
      }}>
        {callState === 'idle' ? (
          <button
            onClick={() => setCallState('ringing')}
            style={{
              ...btnPrimary, background: C.teal, width: '100%', padding: '10px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {Icon.phone('#fff')}
            Call Now
          </button>
        ) : (
          <button
            onClick={onClose}
            style={{
              ...btnPrimary, background: C.hot, width: '100%', padding: '10px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {Icon.phoneEnd('#fff')}
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EMAIL COMPOSE OVERLAY
   ═══════════════════════════════════════════ */
function ComposeOverlay({ contact, onClose, onSend }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      width: 440, background: '#fff', borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
      overflow: 'hidden', zIndex: 9000,
      animation: 'slideUp 0.3s ease-out',
    }}>
      {/* Header */}
      <div style={{
        background: C.navy, padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>New Email</span>
        <button onClick={onClose} style={{ ...btnGhost, padding: 4 }}>
          {Icon.close('#fff')}
        </button>
      </div>

      {/* Fields */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13 }}>
          <span style={{ color: C.textMuted, width: 50 }}>To:</span>
          <span style={{
            background: '#f0f5fa', padding: '4px 10px', borderRadius: 4,
            fontSize: 12, color: C.text,
          }}>
            {contact.name} &lt;{contact.email}&gt;
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <span style={{ color: C.textMuted, width: 50 }}>Subject:</span>
          <span style={{ color: C.text, fontSize: 13 }}>
            Quick question for {contact.company}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 16px', minHeight: 120 }}>
        <div style={{
          fontSize: 13, color: C.text, lineHeight: 1.7,
          background: '#f9fafb', padding: 12, borderRadius: 6, border: `1px solid ${C.borderLight}`,
        }}>
          <p>Hi {contact.name.split(' ')[0]},</p>
          <br />
          <p>I noticed some interesting activity from {contact.company} recently and wanted to reach out with a quick thought...</p>
          <br />
          <p style={{ color: C.textMuted, fontStyle: 'italic' }}>[AI-generated draft based on signal data]</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        padding: '12px 16px', display: 'flex', justifyContent: 'flex-end', gap: 8,
        borderTop: `1px solid ${C.borderLight}`,
      }}>
        <button onClick={onClose} style={btnOutline}>Discard</button>
        <button onClick={onSend} style={{
          ...btnPrimary, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {Icon.send('#fff')}
          Send
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════════ */
function StatCard({ label, value, suffix = '', color }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 8, padding: '16px 20px',
      border: `1px solid ${C.borderLight}`,
      borderLeft: `3px solid ${color}`,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: C.textMuted,
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>
        {value}{suffix && <span style={{ fontSize: 13, fontWeight: 500, color: C.textMuted }}>{suffix}</span>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SHARED STYLES
   ═══════════════════════════════════════════ */
const btnPrimary = {
  background: C.orange,
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background 0.15s, transform 0.1s',
};

const btnOutline = {
  background: 'transparent',
  color: C.textLight,
  border: `1px solid ${C.border}`,
  borderRadius: 6,
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background 0.15s',
};

const btnGhost = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  fontFamily: 'inherit',
};
