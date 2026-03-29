import { useState, useEffect, useRef } from 'react';
import { accounts, dailyActions, signalFeed, performanceData } from './mockData';

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
  blue: '#0091ae',
  blueBg: '#e8f7fa',
  purple: '#6a78d1',
  purpleBg: '#f0f1fa',
};

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */
const Icon = {
  aiQueue: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  signal: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
  ),
  dashboard: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  ),
  info: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2 2h11"/></svg>
  ),
  phone: (color = C.green) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  mail: (color = C.textLight) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  linkedin: (color = '#0077b5') => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  check: (color = C.green) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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
  search: (color = C.textMuted) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  bell: (color = '#fff') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  settings: (color = '#fff') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  briefcase: (color = C.textLight) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  ),
  globe: (color = C.textLight) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
  ),
  send: (color = '#fff') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  chevronDown: (color = C.textMuted) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  chevronRight: (color = C.textMuted) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  ),
  play: (color = '#fff') => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  ),
  refresh: (color = C.textMuted) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
  ),
  externalLink: (color = C.textMuted) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
  user: (color = C.textLight) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  target: (color = C.orange) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  lightbulb: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>
  ),
  arrowRight: (color = '#fff') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  database: (color = C.teal) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ),
  cpu: (color = C.orange) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
  ),
  monitor: (color = C.navy) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  ),
};

const signalTypeIcon = {
  website: Icon.globe,
  email: Icon.mail,
  linkedin: Icon.linkedin,
  job: Icon.briefcase,
};

/* ═══════════════════════════════════════════
   ACTION TYPE CONFIG
   ═══════════════════════════════════════════ */
const actionTypeConfig = {
  'CALL': { color: C.orange, bg: C.orangeLight, icon: Icon.phone, label: 'CALL' },
  'EMAIL': { color: C.blue, bg: C.blueBg, icon: Icon.mail, label: 'EMAIL' },
  'LINKEDIN': { color: '#0077b5', bg: '#e8f4f8', icon: Icon.linkedin, label: 'LINKEDIN' },
  'FOLLOW-UP': { color: C.purple, bg: C.purpleBg, icon: Icon.refresh, label: 'FOLLOW-UP' },
  'RESEARCH': { color: C.textLight, bg: '#eaf0f6', icon: Icon.search, label: 'RESEARCH' },
  'CREATE DEAL': { color: C.green, bg: C.greenBg, icon: Icon.deals, label: 'CREATE DEAL' },
};

const priorityConfig = {
  urgent: { color: C.hot, bg: C.hotBg, label: 'Urgent' },
  high: { color: C.warm, bg: C.warmBg, label: 'High' },
  standard: { color: C.blue, bg: C.blueBg, label: 'Standard' },
};

/* ═══════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════ */
export default function App() {
  const [activeView, setActiveView] = useState('queue');
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [expandedAction, setExpandedAction] = useState(null);
  const [completedActions, setCompletedActions] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [recentlyCompleted, setRecentlyCompleted] = useState(new Set());

  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || null;
  const completedCount = completedActions.size;
  const totalActions = dailyActions.length;

  const callCount = dailyActions.filter(a => a.type === 'CALL').length;
  const emailCount = dailyActions.filter(a => a.type === 'EMAIL').length;
  const linkedinCount = dailyActions.filter(a => a.type === 'LINKEDIN').length;
  const followUpCount = dailyActions.filter(a => a.type === 'FOLLOW-UP' || a.type === 'RESEARCH' || a.type === 'CREATE DEAL').length;

  const completedCalls = dailyActions.filter(a => a.type === 'CALL' && completedActions.has(a.id)).length;
  const completedEmails = dailyActions.filter(a => a.type === 'EMAIL' && completedActions.has(a.id)).length;

  const navigateToAccount = (id) => {
    setSelectedAccountId(id);
    setActiveView('detail');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const markComplete = (actionId) => {
    setCompletedActions(prev => {
      const next = new Set(prev);
      next.add(actionId);
      return next;
    });
    setRecentlyCompleted(prev => {
      const next = new Set(prev);
      next.add(actionId);
      return next;
    });
    setTimeout(() => {
      setRecentlyCompleted(prev => {
        const next = new Set(prev);
        next.delete(actionId);
        return next;
      });
      setExpandedAction(null);
    }, 800);
    showToast('Action completed');
  };

  const toggleExpand = (actionId) => {
    setExpandedAction(expandedAction === actionId ? null : actionId);
  };

  const navItems = [
    { id: 'queue', label: 'Action Queue', icon: Icon.aiQueue, accent: true },
    { id: 'signal', label: 'Signal Feed', icon: Icon.signal },
    { id: 'performance', label: 'Performance', icon: Icon.dashboard },
    { id: 'howItWorks', label: 'How It Works', icon: Icon.lightbulb },
    { id: 'divider' },
    { id: 'contacts', label: 'Contacts', icon: Icon.contacts },
    { id: 'companies', label: 'Companies', icon: Icon.companies },
    { id: 'deals', label: 'Deals', icon: Icon.deals },
    { id: 'tasks', label: 'Tasks', icon: Icon.tasks },
  ];

  /* ═══════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════ */
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.bg }}>
      {/* ═══ LEFT SIDEBAR NAV ═══ */}
      <nav style={{
        width: 56, background: C.navy, display: 'flex', flexDirection: 'column',
        alignItems: 'center', paddingTop: 0, flexShrink: 0, zIndex: 100,
      }}>
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

        {navItems.map((item, i) => {
          if (item.id === 'divider') {
            return <div key={i} style={{ width: 32, height: 1, background: C.navyLight, margin: '8px 0' }} />;
          }
          const isActive = activeView === item.id;
          const isHovered = hoveredNav === item.id;
          const isStatic = ['contacts', 'companies', 'deals', 'tasks'].includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => !isStatic && setActiveView(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 4, cursor: isStatic ? 'default' : 'pointer',
                background: isActive ? (item.accent ? C.orange : 'rgba(255,255,255,0.12)') : isHovered && !isStatic ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'background 0.15s',
                position: 'relative',
                opacity: isStatic ? 0.4 : 1,
              }}
              title={item.label}
            >
              {item.icon(isActive && item.accent ? '#fff' : isActive ? '#fff' : 'rgba(255,255,255,0.65)')}
              {isHovered && (
                <div style={{
                  position: 'absolute', left: 50, top: '50%', transform: 'translateY(-50%)',
                  background: C.navyDark, color: '#fff', padding: '4px 10px', borderRadius: 6,
                  fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', zIndex: 1000,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>{item.label}</div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* ═══ TOP BAR ═══ */}
        <header style={{
          height: 52, background: C.white, borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Financial Cents Portal</span>
            <span style={{ fontSize: 11, color: C.textMuted, background: C.borderLight, padding: '2px 8px', borderRadius: 4 }}>HubSpot CRM Extension</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, background: C.bg,
              borderRadius: 6, padding: '6px 12px', border: `1px solid ${C.borderLight}`,
            }}>
              {Icon.search()}
              <span style={{ fontSize: 13, color: C.textMuted }}>Search contacts, companies...</span>
            </div>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              {Icon.bell(C.textLight)}
              <div style={{
                position: 'absolute', top: -4, right: -4, width: 14, height: 14,
                background: C.hot, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700,
              }}>5</div>
            </div>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', background: C.orange,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer',
            }}>SM</div>
          </div>
        </header>

        {/* ═══ CONTENT ═══ */}
        <main style={{ flex: 1, overflow: 'auto', padding: activeView === 'howItWorks' ? 0 : '24px 28px' }}>
          {activeView === 'queue' && (
            <QueueView
              completedActions={completedActions}
              completedCount={completedCount}
              totalActions={totalActions}
              expandedAction={expandedAction}
              toggleExpand={toggleExpand}
              markComplete={markComplete}
              navigateToAccount={navigateToAccount}
              recentlyCompleted={recentlyCompleted}
              callCount={callCount}
              emailCount={emailCount}
              linkedinCount={linkedinCount}
              followUpCount={followUpCount}
              completedCalls={completedCalls}
              completedEmails={completedEmails}
            />
          )}
          {activeView === 'detail' && selectedAccount && (
            <AccountDetailView
              account={selectedAccount}
              onBack={() => setActiveView('queue')}
              navigateToAccount={navigateToAccount}
            />
          )}
          {activeView === 'signal' && (
            <SignalFeedView navigateToAccount={navigateToAccount} />
          )}
          {activeView === 'performance' && (
            <PerformanceView
              completedCount={completedCount}
              totalActions={totalActions}
              completedCalls={completedCalls}
              completedEmails={completedEmails}
            />
          )}
          {activeView === 'howItWorks' && (
            <HowItWorksView />
          )}
        </main>
      </div>

      {/* ═══ TOAST ═══ */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, background: C.navy, color: '#fff',
          padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 8, zIndex: 10000,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.3s ease',
        }}>
          {Icon.check('#fff')}
          {toast}
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════
   VIEW 1: TODAY'S ACTION QUEUE
   ═══════════════════════════════════════════ */
function QueueView({
  completedActions, completedCount, totalActions, expandedAction,
  toggleExpand, markComplete, navigateToAccount, recentlyCompleted,
  callCount, emailCount, linkedinCount, followUpCount,
  completedCalls, completedEmails,
}) {
  const progressPct = (completedCount / totalActions) * 100;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>
            Sarah's Daily Queue
          </h1>
          <span style={{ fontSize: 13, color: C.textMuted }}>March 29, 2026</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
          fontSize: 13, color: C.textLight,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: C.greenBg, color: C.green, padding: '2px 10px',
            borderRadius: 20, fontSize: 12, fontWeight: 600,
          }}>
            {Icon.zap(C.green)} AI Confidence: High
          </span>
          <span>12 accounts showing active buying signals today</span>
        </div>

        {/* Progress bar */}
        <div style={{
          background: C.borderLight, borderRadius: 6, height: 8, marginBottom: 12,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 6,
            background: `linear-gradient(90deg, ${C.teal}, ${C.green})`,
            width: `${progressPct}%`,
            transition: 'width 0.5s ease',
          }} />
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StatPill label="Actions" value={`${completedCount}/${totalActions}`} />
            <StatPill label="Calls" value={`${completedCalls}/${callCount}`} color={C.orange} />
            <StatPill label="Emails" value={`${completedEmails}/${emailCount}`} color={C.blue} />
            <StatPill label="LinkedIn" value={`${dailyActions.filter(a=>a.type==='LINKEDIN'&&completedActions.has(a.id)).length}/${linkedinCount}`} color="#0077b5" />
            <StatPill label="Other" value={`${dailyActions.filter(a=>['FOLLOW-UP','RESEARCH','CREATE DEAL'].includes(a.type)&&completedActions.has(a.id)).length}/${followUpCount}`} color={C.purple} />
          </div>
          <div style={{
            fontSize: 12, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {Icon.clock()}
            Est. queue time: 2.5 hours
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {dailyActions.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            isCompleted={completedActions.has(action.id)}
            isExpanded={expandedAction === action.id}
            isRecentlyCompleted={recentlyCompleted.has(action.id)}
            onToggle={() => toggleExpand(action.id)}
            onComplete={() => markComplete(action.id)}
            onNavigate={() => navigateToAccount(action.accountId)}
          />
        ))}
      </div>
    </div>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
      background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: 6,
      padding: '4px 10px',
    }}>
      <span style={{ color: C.textMuted, fontWeight: 400 }}>{label}:</span>
      <span style={{ color: color || C.text, fontWeight: 600 }}>{value}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ACTION CARD
   ═══════════════════════════════════════════ */
function ActionCard({ action, isCompleted, isExpanded, isRecentlyCompleted, onToggle, onComplete, onNavigate }) {
  const config = actionTypeConfig[action.type];
  const pConfig = priorityConfig[action.priority];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isCompleted ? '#fafcfa' : C.white,
        border: `1px solid ${isRecentlyCompleted ? C.green : isExpanded ? C.orange : hovered ? C.border : C.borderLight}`,
        borderRadius: 10,
        transition: 'all 0.25s ease',
        opacity: isCompleted && !isRecentlyCompleted ? 0.55 : 1,
        overflow: 'hidden',
        ...(isRecentlyCompleted ? { boxShadow: `0 0 0 2px ${C.greenBg}` } : {}),
      }}
    >
      {/* Main Row */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 14,
        cursor: 'pointer',
      }} onClick={onToggle}>
        {/* Priority Number */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
          background: isCompleted ? C.greenBg : pConfig.bg,
          color: isCompleted ? C.green : pConfig.color,
        }}>
          {isCompleted ? Icon.check(C.green) : `#${action.id}`}
        </div>

        {/* Action Type Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: config.bg, color: config.color,
          padding: '3px 10px', borderRadius: 5, fontSize: 10,
          fontWeight: 700, letterSpacing: '0.5px', flexShrink: 0,
          textTransform: 'uppercase',
        }}>
          {config.icon(config.color)}
          {config.label}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: C.text,
            textDecoration: isCompleted ? 'line-through' : 'none',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {action.contactName && (
              <span>{action.contactName} — </span>
            )}
            <span
              onClick={(e) => { e.stopPropagation(); onNavigate(); }}
              style={{ color: C.orange, cursor: 'pointer', fontWeight: 500 }}
            >{action.company}</span>
          </div>
          <div style={{
            fontSize: 12, color: C.textLight, marginTop: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {action.reason}
          </div>
        </div>

        {/* Right side */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{action.timeSlot}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{action.duration}</div>
          </div>
          {!isCompleted && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              style={{
                background: isExpanded ? C.orangeLight : C.green,
                color: isExpanded ? C.orange : '#fff',
                border: 'none', borderRadius: 6, padding: '6px 14px',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'all 0.15s',
              }}
            >
              {isExpanded ? 'Close' : (<>{Icon.play()} Start</>)}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Panel */}
      {isExpanded && !isCompleted && (
        <ExpandedPanel action={action} onComplete={onComplete} onNavigate={onNavigate} />
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════
   EXPANDED PANEL (inline, varies by type)
   ═══════════════════════════════════════════ */
function ExpandedPanel({ action, onComplete, onNavigate }) {
  if (action.type === 'CALL') return <CallPanel action={action} onComplete={onComplete} onNavigate={onNavigate} />;
  if (action.type === 'EMAIL' || action.type === 'FOLLOW-UP') return <EmailPanel action={action} onComplete={onComplete} />;
  if (action.type === 'LINKEDIN') return <LinkedInPanel action={action} onComplete={onComplete} />;
  if (action.type === 'RESEARCH') return <ResearchPanel action={action} onComplete={onComplete} onNavigate={onNavigate} />;
  if (action.type === 'CREATE DEAL') return <DealPanel action={action} onComplete={onComplete} />;
  return null;
}

function CallPanel({ action, onComplete, onNavigate }) {
  return (
    <div style={{
      padding: '0 16px 16px', borderTop: `1px solid ${C.borderLight}`,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{ paddingTop: 16 }}>
        {/* Contact info row */}
        <div style={{
          display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap',
        }}>
          <div style={{
            flex: '1 1 250px', background: C.orangeLight, borderRadius: 8, padding: 14,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Contact</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{action.contactName}</div>
            <div style={{ fontSize: 12, color: C.textLight, marginBottom: 8 }}>{action.contactTitle} — {action.company}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: C.white, border: `2px solid ${C.green}`, borderRadius: 8, padding: '8px 16px',
              cursor: 'pointer',
            }}>
              {Icon.phone(C.green)}
              <span style={{ fontSize: 16, fontWeight: 700, color: C.green, letterSpacing: '0.5px' }}>{action.contactPhone}</span>
            </div>
          </div>

          {/* Quick Brief */}
          <div style={{ flex: '1 1 300px', background: C.bg, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Quick Brief</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: C.textLight, lineHeight: 1.7 }}>
              {action.callBrief?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opening line */}
        <div style={{
          background: '#f7f9fb', border: `1px solid ${C.borderLight}`, borderRadius: 8,
          padding: 14, marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.orange, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Opening Line</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontStyle: 'italic' }}>
            "{action.openingLine}"
          </div>
        </div>

        {/* Discovery questions */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 250px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Discovery Questions</div>
            {action.discoveryQuestions?.map((q, i) => (
              <div key={i} style={{
                fontSize: 12, color: C.text, padding: '6px 10px', marginBottom: 4,
                background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: 6, lineHeight: 1.5,
              }}>
                {i + 1}. {q}
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 250px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Objection Handler</div>
            <div style={{
              fontSize: 12, color: C.text, padding: '8px 10px',
              background: C.warmBg, border: `1px solid #f0e0c0`, borderRadius: 6, lineHeight: 1.5, marginBottom: 8,
            }}>
              {action.objectionHandler}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Suggested CTA</div>
            <div style={{
              fontSize: 12, color: C.green, fontWeight: 600, padding: '8px 10px',
              background: C.greenBg, borderRadius: 6,
            }}>
              {action.suggestedCTA}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onComplete} style={{
            background: C.green, color: '#fff', border: 'none', borderRadius: 6,
            padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {Icon.check('#fff')} Mark Complete
          </button>
          <button style={{
            background: C.white, color: C.textLight, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            Reschedule
          </button>
          <button onClick={onNavigate} style={{
            background: C.white, color: C.orange, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            View Account
          </button>
        </div>
      </div>
    </div>
  );
}

function EmailPanel({ action, onComplete }) {
  return (
    <div style={{
      padding: '0 16px 16px', borderTop: `1px solid ${C.borderLight}`,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{ paddingTop: 16 }}>
        <div style={{
          background: C.white, border: `1px solid ${C.border}`, borderRadius: 8,
          overflow: 'hidden', marginBottom: 12,
        }}>
          <div style={{
            padding: '10px 14px', borderBottom: `1px solid ${C.borderLight}`,
            display: 'flex', gap: 8, fontSize: 12,
          }}>
            <span style={{ color: C.textMuted }}>To:</span>
            <span style={{ color: C.text, fontWeight: 500 }}>{action.contactName} &lt;{action.contactEmail}&gt;</span>
          </div>
          <div style={{
            padding: '10px 14px', borderBottom: `1px solid ${C.borderLight}`,
            display: 'flex', gap: 8, fontSize: 12,
          }}>
            <span style={{ color: C.textMuted }}>Subject:</span>
            <span style={{ color: C.text, fontWeight: 600 }}>{action.emailSubject}</span>
          </div>
          <div style={{
            padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7,
            whiteSpace: 'pre-line', background: '#fafbfc',
          }}>
            {action.emailBody}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onComplete} style={{
            background: C.blue, color: '#fff', border: 'none', borderRadius: 6,
            padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {Icon.send()} Send Email
          </button>
          <button style={{
            background: C.white, color: C.textLight, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            Edit Draft
          </button>
          <button style={{
            background: C.white, color: C.textLight, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}

function LinkedInPanel({ action, onComplete }) {
  return (
    <div style={{
      padding: '0 16px 16px', borderTop: `1px solid ${C.borderLight}`,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{ paddingTop: 16 }}>
        <div style={{
          background: '#f3f6f8', border: '1px solid #d8dee4', borderRadius: 8,
          padding: 16, marginBottom: 12,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
          }}>
            {Icon.linkedin('#0077b5')}
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0077b5' }}>LinkedIn Message</span>
          </div>
          <div style={{
            background: C.white, borderRadius: 6, padding: 14, fontSize: 13,
            color: C.text, lineHeight: 1.7, whiteSpace: 'pre-line',
            border: '1px solid #e0e4e8',
          }}>
            {action.linkedinMessage}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onComplete} style={{
            background: '#0077b5', color: '#fff', border: 'none', borderRadius: 6,
            padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {Icon.check('#fff')} Mark Complete
          </button>
          <button style={{
            background: C.white, color: C.textLight, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            Open LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

function ResearchPanel({ action, onComplete, onNavigate }) {
  return (
    <div style={{
      padding: '0 16px 16px', borderTop: `1px solid ${C.borderLight}`,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{ paddingTop: 16 }}>
        <div style={{
          background: C.bg, borderRadius: 8, padding: 16, marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Research Checklist</div>
          {action.researchTasks?.map((task, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0',
              borderBottom: i < action.researchTasks.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, border: `2px solid ${C.border}`,
                flexShrink: 0, marginTop: 1, cursor: 'pointer',
              }} />
              <span style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{task}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onComplete} style={{
            background: C.green, color: '#fff', border: 'none', borderRadius: 6,
            padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {Icon.check('#fff')} Mark Complete
          </button>
          <button onClick={onNavigate} style={{
            background: C.white, color: C.orange, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            View Account
          </button>
        </div>
      </div>
    </div>
  );
}

function DealPanel({ action, onComplete }) {
  const d = action.dealDetails;
  return (
    <div style={{
      padding: '0 16px 16px', borderTop: `1px solid ${C.borderLight}`,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{ paddingTop: 16 }}>
        <div style={{
          background: C.greenBg, borderRadius: 8, padding: 16, marginBottom: 12,
          border: `1px solid #b8e8df`,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.green, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Deal to Create</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            <DealField label="Deal Name" value={d.dealName} />
            <DealField label="Amount" value={d.amount} />
            <DealField label="Seats" value={d.seats} />
            <DealField label="Stage" value={d.stage} />
            <DealField label="Expected Close" value={d.closeDate} />
            <DealField label="Primary Contact" value={d.primaryContact} />
          </div>
          <div style={{ marginTop: 8 }}>
            <DealField label="Notes" value={d.notes} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onComplete} style={{
            background: C.green, color: '#fff', border: 'none', borderRadius: 6,
            padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {Icon.check('#fff')} Create Deal
          </button>
        </div>
      </div>
    </div>
  );
}

function DealField({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</div>
      <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{value}</div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   VIEW 2: ACCOUNT DETAIL
   ═══════════════════════════════════════════ */
function AccountDetailView({ account, onBack, navigateToAccount }) {
  const accountActions = dailyActions.filter(a => a.accountId === account.id);
  const accountSignals = signalFeed.filter(s => s.accountId === account.id);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Back button */}
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
        color: C.orange, fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 16,
        padding: 0,
      }}>
        {Icon.arrowLeft(C.orange)} Back to Action Queue
      </button>

      {/* Company Header */}
      <div style={{
        background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
        padding: 24, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>{account.company}</h2>
            <div style={{ fontSize: 13, color: C.textLight, marginTop: 4 }}>
              {account.size} &middot; {account.location} &middot; {account.industry}
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: account.aiScore >= 85 ? C.hotBg : C.warmBg,
            color: account.aiScore >= 85 ? C.hot : C.warm,
            padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 700,
          }}>
            AI Score: {account.aiScore}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          <InfoBlock label="Revenue" value={account.revenue} />
          <InfoBlock label="Current Tools" value={account.currentTools} />
          <InfoBlock label="Deal Value" value={account.dealValue} />
          <InfoBlock label="Seats" value={account.seats} />
          <InfoBlock label="Website" value={account.website} />
          <InfoBlock label="Founded" value={account.founded} />
        </div>
      </div>

      {/* Score breakdown */}
      <div style={{
        background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
        padding: 20, marginBottom: 16,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 12px' }}>Why AI Prioritized This Account</h3>
        <div style={{ fontSize: 13, color: C.textLight, lineHeight: 1.7, marginBottom: 16 }}>
          {account.whyPrioritized}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <ScoreBar label="Fit Score" value={account.fitScore} color={C.teal} />
          <ScoreBar label="Intent Score" value={account.intentScore} color={C.orange} />
          <ScoreBar label="Timing Score" value={account.timingScore} color={C.purple} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Contacts */}
        <div style={{
          background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, padding: 20,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 12px' }}>Key Contacts</h3>
          {account.contacts.filter(c => c.name !== 'TBD').map((contact, i) => (
            <div key={i} style={{
              padding: '10px 0', borderBottom: i < account.contacts.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{contact.name}</span>
                {contact.isPrimary && (
                  <span style={{
                    fontSize: 9, fontWeight: 600, color: C.orange, background: C.orangeLight,
                    padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase',
                  }}>Primary</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: C.textLight }}>{contact.title}</div>
              {contact.phone && (
                <div style={{ fontSize: 12, color: C.green, marginTop: 2 }}>{contact.phone}</div>
              )}
              {contact.email && (
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 1 }}>{contact.email}</div>
              )}
            </div>
          ))}
        </div>

        {/* Today's Actions for this account */}
        <div style={{
          background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, padding: 20,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 12px' }}>
            Today's Actions ({accountActions.length})
          </h3>
          {accountActions.map((action, i) => {
            const config = actionTypeConfig[action.type];
            return (
              <div key={i} style={{
                padding: '8px 0', borderBottom: i < accountActions.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: config.color, background: config.bg,
                  padding: '2px 8px', borderRadius: 4, flexShrink: 0,
                }}>{config.label}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{action.action}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{action.timeSlot} &middot; {action.duration}</div>
                </div>
              </div>
            );
          })}
          {accountActions.length === 0 && (
            <div style={{ fontSize: 13, color: C.textMuted, padding: '16px 0' }}>No actions scheduled for today.</div>
          )}
        </div>
      </div>

      {/* Activity Timeline / Signals */}
      <div style={{
        background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
        padding: 20, marginBottom: 16,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 12px' }}>Signal Timeline</h3>
        {account.signals.map((signal, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
            borderBottom: i < account.signals.length - 1 ? `1px solid ${C.borderLight}` : 'none',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 5,
              background: signal.strength === 'hot' ? C.hot : C.warm,
            }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{signal.type}</div>
              <div style={{ fontSize: 12, color: C.textLight, lineHeight: 1.5 }}>{signal.detail}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{signal.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Call Script */}
      {account.callScript && (
        <div style={{
          background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
          padding: 20, marginBottom: 16,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 12px' }}>AI Call Script</h3>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.orange, textTransform: 'uppercase', marginBottom: 4 }}>Opening</div>
            <div style={{
              fontSize: 13, color: C.text, lineHeight: 1.6, fontStyle: 'italic',
              background: C.bg, padding: 12, borderRadius: 6,
            }}>"{account.callScript.opening}"</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', marginBottom: 4 }}>Discovery Questions</div>
            {account.callScript.discoveryQuestions.map((q, i) => (
              <div key={i} style={{
                fontSize: 12, color: C.text, padding: '6px 10px', marginBottom: 4,
                background: C.bg, borderRadius: 6, lineHeight: 1.5,
              }}>
                {i + 1}. {q}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', marginBottom: 4 }}>Objection Handler</div>
            <div style={{ fontSize: 12, color: C.text, padding: '8px 10px', background: C.warmBg, borderRadius: 6, lineHeight: 1.5 }}>
              {account.callScript.objectionHandler}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, textTransform: 'uppercase', marginBottom: 4 }}>Suggested CTA</div>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 600, padding: '8px 10px', background: C.greenBg, borderRadius: 6 }}>
              {account.callScript.suggestedCTA}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</div>
      <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function ScoreBar({ label, value, color }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: C.textMuted }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color }}>{value}</span>
      </div>
      <div style={{ height: 6, background: C.borderLight, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3, transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   VIEW 3: SIGNAL FEED
   ═══════════════════════════════════════════ */
function SignalFeedView({ navigateToAccount }) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>Signal Feed</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterBadge label="All" active />
          <FilterBadge label="Hot" />
          <FilterBadge label="Warm" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {signalFeed.map((signal) => {
          const iconFn = signalTypeIcon[signal.type] || Icon.globe;
          return (
            <div key={signal.id} style={{
              background: C.white, borderRadius: 8, border: `1px solid ${C.borderLight}`,
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: signal.strength === 'hot' ? C.hot : C.warm,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>
                  <span
                    onClick={() => navigateToAccount(signal.accountId)}
                    style={{ color: C.orange, cursor: 'pointer', fontWeight: 600 }}
                  >
                    {signal.account}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{signal.action}</div>
              </div>
              <div style={{ fontSize: 11, color: C.textMuted, whiteSpace: 'nowrap', flexShrink: 0 }}>{signal.time}</div>
              <div style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, flexShrink: 0,
                textTransform: 'uppercase',
                background: signal.strength === 'hot' ? C.hotBg : C.warmBg,
                color: signal.strength === 'hot' ? C.hot : C.warm,
              }}>{signal.strength}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterBadge({ label, active }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 20, cursor: 'pointer',
      background: active ? C.navy : C.white,
      color: active ? '#fff' : C.textLight,
      border: active ? 'none' : `1px solid ${C.border}`,
    }}>{label}</span>
  );
}


/* ═══════════════════════════════════════════
   VIEW 4: PERFORMANCE
   ═══════════════════════════════════════════ */
function PerformanceView({ completedCount, totalActions, completedCalls, completedEmails }) {
  const pd = performanceData;

  const totalPipeline = accounts.reduce((sum, a) => {
    const val = parseInt(a.dealValue?.replace(/[^0-9]/g, '') || '0');
    return sum + val;
  }, 0);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: '0 0 20px' }}>Performance Dashboard</h1>

      {/* Today's stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Actions Completed" value={`${completedCount}/${totalActions}`} progress={(completedCount/totalActions)*100} color={C.teal} />
        <MetricCard label="Calls Made" value={`${completedCalls}/${pd.callsTotal}`} progress={(completedCalls/pd.callsTotal)*100} color={C.orange} />
        <MetricCard label="Emails Sent" value={`${completedEmails}/${pd.emailsTotal}`} progress={(completedEmails/pd.emailsTotal)*100} color={C.blue} />
        <MetricCard label="Pipeline Influenced" value={`$${(completedCount * 4800).toLocaleString()}`} subtitle={`Target: $${totalPipeline.toLocaleString()}`} color={C.green} />
      </div>

      {/* Weekly trend */}
      <div style={{
        background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
        padding: 20, marginBottom: 16,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Weekly Completion Rate</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120 }}>
          {pd.weeklyCompletion.map((day, i) => {
            const pct = day.total > 0 ? (day.completed / day.total) * 100 : 0;
            const isToday = day.day === 'Fri';
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{day.completed}/{day.total}</div>
                <div style={{
                  width: '100%', maxWidth: 60, background: C.borderLight, borderRadius: 6,
                  height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '100%', borderRadius: 6,
                    height: `${pct}%`,
                    background: isToday ? `linear-gradient(180deg, ${C.orange}, ${C.orangeHover})` : `linear-gradient(180deg, ${C.teal}, #009b87)`,
                    transition: 'height 0.5s ease',
                    minHeight: pct > 0 ? 4 : 0,
                  }} />
                </div>
                <div style={{
                  fontSize: 11, fontWeight: isToday ? 700 : 500,
                  color: isToday ? C.orange : C.textMuted,
                }}>{day.day}{isToday ? ' (today)' : ''}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Conversion Funnel */}
        <div style={{
          background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, padding: 20,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Conversion Funnel</h3>
          {Object.entries(pd.conversionRates).map(([key, val], i) => {
            const labels = {
              signalToCall: 'Signal to Call',
              callToMeeting: 'Call to Meeting',
              meetingToDemo: 'Meeting to Demo',
              demoToClose: 'Demo to Close',
            };
            const pct = parseInt(val);
            return (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: C.textLight }}>{labels[key]}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{val}</span>
                </div>
                <div style={{ height: 6, background: C.borderLight, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`, borderRadius: 3,
                    background: `linear-gradient(90deg, ${C.teal}, ${C.green})`,
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Performing Signals */}
        <div style={{
          background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, padding: 20,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Top Performing Signals</h3>
          {pd.topPerformingSignals.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
              borderBottom: i < pd.topPerformingSignals.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}>
              <span style={{
                fontSize: 12, fontWeight: 700, color: C.text, width: 32, textAlign: 'right',
              }}>{s.conversion}%</span>
              <div style={{ flex: 1, height: 6, background: C.borderLight, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${s.conversion}%`, borderRadius: 3,
                  background: i === 0 ? C.hot : i < 3 ? C.orange : C.teal,
                }} />
              </div>
              <span style={{ fontSize: 12, color: C.textLight, minWidth: 120 }}>{s.signal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtitle, progress, color }) {
  return (
    <div style={{
      background: C.white, borderRadius: 10, border: `1px solid ${C.borderLight}`,
      padding: 16,
    }}>
      <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{value}</div>
      {subtitle && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{subtitle}</div>}
      {progress !== undefined && (
        <div style={{ height: 4, background: C.borderLight, borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 2, transition: 'width 0.5s' }} />
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════
   VIEW 5: HOW IT WORKS
   ═══════════════════════════════════════════ */
function HowItWorksView() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 28px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: C.orangeLight, color: C.orange, padding: '6px 16px',
          borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 16,
        }}>
          {Icon.info(C.orange)} HubSpot Native Experience
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: '0 0 12px', lineHeight: 1.3 }}>
          This Runs Natively in HubSpot
        </h1>
        <p style={{ fontSize: 15, color: C.textLight, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          No separate app. No tab switching. No learning curve. Your SDRs work the AI-powered action queue
          directly inside HubSpot using CRM Extensions and Custom Cards.
        </p>
      </div>

      {/* 3 Column Flow */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 48,
      }}>
        <FlowStep
          number="1"
          icon={Icon.database}
          color={C.teal}
          title="Signals Flow In"
          description="Clay enrichment, website tracking, email engagement, and LinkedIn signals all pipe into HubSpot properties in real-time. Every buyer action is captured and scored."
          items={[
            'Clay enriches contacts with firmographic data',
            'Website visits tracked via HubSpot pixel',
            'Email opens, clicks, and replies scored',
            'LinkedIn engagement via Sales Navigator',
            'Job postings and news alerts via triggers',
          ]}
        />
        <FlowStep
          number="2"
          icon={Icon.cpu}
          color={C.orange}
          title="AI Prioritizes & Sequences"
          description="Daily at 6 AM, AI scores all accounts, generates the action queue, and drafts personalized outreach — ready for your SDR's morning."
          items={[
            'Account scoring: Fit + Intent + Timing',
            'Action sequencing by priority and time',
            'Personalized call scripts generated',
            'Email drafts written with context',
            'Queue optimized for conversion probability',
          ]}
        />
        <FlowStep
          number="3"
          icon={Icon.monitor}
          color={C.navy}
          title="SDR Executes from HubSpot"
          description="Reps work the queue inside HubSpot using the native dialer, email composer, and LinkedIn Sales Nav integration. Everything is logged automatically."
          items={[
            'Action queue on the CRM dashboard',
            'Click-to-call with HubSpot dialer',
            'Pre-drafted emails sent via HubSpot',
            'All activities auto-logged to CRM',
            'Real-time pipeline and performance tracking',
          ]}
        />
      </div>

      {/* Arrow connecting the steps */}
      <div style={{
        display: 'flex', justifyContent: 'center', marginBottom: 48,
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.teal}, ${C.orange}, ${C.navy})`,
          color: '#fff', padding: '16px 32px', borderRadius: 10,
          fontSize: 15, fontWeight: 600, textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}>
          No separate app. No tab switching. No learning curve.
        </div>
      </div>

      {/* Tech Details */}
      <div style={{
        background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
        padding: 32, marginBottom: 32,
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>
          Built on HubSpot's Platform
        </h2>
        <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.7, margin: '0 0 20px' }}>
          This entire experience leverages HubSpot's native extensibility — no third-party iframe hacks or external tools.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TechBlock
            title="CRM Extensions (Custom Cards)"
            description="The action queue, call scripts, and AI insights render directly on contact and company records as custom CRM cards. SDRs see everything in context without leaving the record."
          />
          <TechBlock
            title="Operations Hub Workflows"
            description="Automated workflows handle signal scoring, action queue generation, and outreach drafting. The 6 AM daily queue build runs as a scheduled Operations Hub workflow."
          />
          <TechBlock
            title="HubSpot API Integration"
            description="Real-time data sync between Clay enrichment, AI scoring engine, and HubSpot properties. Custom objects store action queue state and AI recommendations."
          />
          <TechBlock
            title="Native Dialer + Email"
            description="Calls are made through HubSpot's built-in dialer. Emails are sent through HubSpot sequences. Everything is automatically logged — no manual data entry."
          />
        </div>
      </div>

      {/* FAQ */}
      <div style={{
        background: C.bg, borderRadius: 12, border: `1px solid ${C.borderLight}`,
        padding: 32,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: '0 0 20px' }}>Frequently Asked Questions</h3>

        <FAQItem
          question="Can this really run inside HubSpot?"
          answer="Yes. Using HubSpot's CRM Extensions (custom cards), Operations Hub workflows, and the HubSpot API, the entire experience lives on the contact/company record. Your SDRs never leave HubSpot."
        />
        <FAQItem
          question="What HubSpot plan do I need?"
          answer="This requires HubSpot Sales Hub Professional or Enterprise, plus Operations Hub Professional for the automated workflow features. Most mid-market companies already have these tiers."
        />
        <FAQItem
          question="How long does implementation take?"
          answer="Typical implementation is 2-3 weeks. Week 1: CRM configuration and data enrichment setup. Week 2: AI scoring calibration and action queue workflows. Week 3: SDR training and go-live."
        />
        <FAQItem
          question="Does this replace our existing HubSpot workflows?"
          answer="No — it enhances them. Your existing sequences, templates, and workflows continue to work. The AI action queue layers on top, providing intelligent prioritization and pre-built outreach that flows through your existing HubSpot infrastructure."
        />
      </div>
    </div>
  );
}

function FlowStep({ number, icon, color, title, description, items }) {
  return (
    <div style={{
      background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`,
      padding: 24, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: `${color}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon(color)}
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step {number}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{title}</div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6, margin: '0 0 14px' }}>
        {description}
      </p>
      <ul style={{ margin: 0, paddingLeft: 16, listStyle: 'none' }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontSize: 12, color: C.textLight, padding: '3px 0', lineHeight: 1.5,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0,
            }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechBlock({ title, description }) {
  return (
    <div style={{
      background: C.bg, borderRadius: 8, padding: 16,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6 }}>{description}</div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: `1px solid ${C.borderLight}`, padding: '14px 0',
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{question}</span>
        <span style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }}>
          {Icon.chevronDown(C.textMuted)}
        </span>
      </div>
      {open && (
        <div style={{
          fontSize: 13, color: C.textLight, lineHeight: 1.7, marginTop: 8,
          animation: 'fadeIn 0.2s ease',
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}
