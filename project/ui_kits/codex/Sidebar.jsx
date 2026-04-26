// Sidebar.jsx — clan filter
const Sidebar = ({ clan, setClan }) => {
  const counts = {};
  window.CODEX_FIGURES.forEach(f => counts[f.clan] = (counts[f.clan] || 0) + 1);
  return (
    <aside style={sbStyles.wrap}>
      <div style={sbStyles.eye}>◈ filter · by clan</div>
      <div style={sbStyles.list}>
        {window.CODEX_CLANS.map(c => {
          const total = c === 'All'
            ? window.CODEX_FIGURES.length : (counts[c] || 0);
          const on = c === clan;
          return (
            <div key={c} onClick={() => setClan(c)} style={{
              ...sbStyles.item, ...(on ? sbStyles.itemOn : {}),
            }}>
              <span>{c}</span>
              <span style={on ? sbStyles.countOn : sbStyles.count}>{total}</span>
            </div>
          );
        })}
      </div>
      <div style={sbStyles.rule}></div>
      <div style={sbStyles.eye}>◈ forge log</div>
      <div style={sbStyles.log}>
        <div><span style={sbStyles.dot}></span> 11 figures forged</div>
        <div><span style={sbStyles.dot}></span> last · 10.23.26</div>
        <div><span style={sbStyles.dot}></span> rotation · 22.0s</div>
      </div>
      <div style={sbStyles.rule}></div>
      <div style={sbStyles.eye}>◈ inscriptions</div>
      <div style={sbStyles.brushRow}>
        <span style={sbStyles.brush}>道</span>
        <span style={sbStyles.brush}>場</span>
        <span style={sbStyles.brush}>剣</span>
      </div>
    </aside>
  );
};

const sbStyles = {
  wrap: { width: 260, padding: '28px 20px', background: 'var(--ink-850)',
    borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', gap: 14,
    overflowY: 'auto' },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em',
    color: 'var(--ember-400)', textTransform: 'uppercase' },
  list: { display: 'flex', flexDirection: 'column', gap: 2 },
  item: { display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '9px 12px', borderRadius: 6,
    fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)',
    cursor: 'pointer', transition: 'all .14s' },
  itemOn: { background: 'var(--crimson-900)', color: 'var(--fg-1)',
    boxShadow: 'inset 3px 0 0 var(--crimson-500)' },
  count: { fontFamily: 'var(--font-mono)', fontSize: 11,
    color: 'var(--fg-3)' },
  countOn: { fontFamily: 'var(--font-mono)', fontSize: 11,
    color: 'var(--ember-400)' },
  rule: { height: 1, background: 'var(--border)', margin: '8px 0' },
  log: { display: 'flex', flexDirection: 'column', gap: 6,
    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)',
    letterSpacing: '.04em' },
  dot: { display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
    background: 'var(--ember-500)', marginRight: 8,
    boxShadow: 'var(--glow-ember-sm)' },
  brushRow: { display: 'flex', gap: 14, justifyContent: 'center',
    padding: '10px 0' },
  brush: { fontFamily: 'var(--font-brush)', fontSize: 32,
    color: 'var(--crimson-500)' },
};

window.Sidebar = Sidebar;
