// CodexNav.jsx
const CodexNav = () => (
  <nav style={cnStyles.wrap}>
    <div style={cnStyles.logo}>
      <div style={cnStyles.word}>DOJO SABRE</div>
      <div style={cnStyles.kana}>道場 剣</div>
    </div>
    <div style={cnStyles.crumb}>
      <span style={cnStyles.crumbDim}>showcase</span>
      <span style={cnStyles.crumbSep}>·</span>
      <span style={cnStyles.crumbOn}>⛩ codex</span>
      <span style={cnStyles.crumbSep}>·</span>
      <span style={cnStyles.crumbDim}>figure index</span>
    </div>
    <div style={cnStyles.right}>
      <div style={cnStyles.search}>
        <span style={{opacity:.6}}>⌕</span>
        <input placeholder="find by name, clan, rune…" style={cnStyles.input} />
        <span style={cnStyles.kbd}>⌘K</span>
      </div>
    </div>
  </nav>
);

const cnStyles = {
  wrap: { display: 'grid', gridTemplateColumns: '280px 1fr 1fr', gap: 32,
    alignItems: 'center', padding: '14px 32px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--ink-850)' },
  logo: { display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1 },
  word: { fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16,
    letterSpacing: '.26em', color: 'var(--fg-1)' },
  kana: { fontFamily: 'var(--font-brush)', fontSize: 11,
    color: 'var(--crimson-500)', letterSpacing: '.18em' },
  crumb: { display: 'flex', gap: 10, alignItems: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em',
    textTransform: 'uppercase' },
  crumbDim: { color: 'var(--fg-3)' },
  crumbOn: { color: 'var(--ember-400)' },
  crumbSep: { color: 'var(--fg-dim)' },
  right: { display: 'flex', justifyContent: 'flex-end' },
  search: { display: 'flex', alignItems: 'center', gap: 10,
    background: 'var(--ink-950)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '8px 12px', width: 340, color: 'var(--fg-2)' },
  input: { flex: 1, background: 'transparent', border: 'none',
    color: 'var(--fg-1)', fontFamily: 'var(--font-sans)', fontSize: 13,
    outline: 'none' },
  kbd: { fontFamily: 'var(--font-mono)', fontSize: 10,
    color: 'var(--fg-3)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '2px 6px' },
};

window.CodexNav = CodexNav;
