// FigureDetail.jsx — right-side detail drawer
const FigureDetail = ({ figure, onClose }) => {
  if (!figure) return null;
  return (
    <aside style={fdStyles.wrap}>
      <div style={fdStyles.topbar}>
        <span style={fdStyles.eye}>◈ inscription</span>
        <button onClick={onClose} style={fdStyles.x}>close ✕</button>
      </div>
      <div style={fdStyles.portraitWrap}>
        <img src={figure.img} style={fdStyles.portrait} alt="" />
        <div style={fdStyles.kana}>{figure.kana}</div>
      </div>
      <div style={fdStyles.no}>figure no. {figure.no}</div>
      <h2 style={fdStyles.name}>{figure.name}</h2>
      <div style={fdStyles.chips}>
        <span style={fdStyles.chipHot}>· {figure.clan.toLowerCase()}</span>
        <span style={fdStyles.chipGold}>{figure.rune}</span>
      </div>
      <div style={fdStyles.rule}></div>
      <blockquote style={fdStyles.quote}>
        <span style={fdStyles.qmark}>“</span>
        {figure.inscription}
        <span style={fdStyles.qmark}>”</span>
      </blockquote>
      <div style={fdStyles.rule}></div>
      <dl style={fdStyles.dl}>
        <dt style={fdStyles.dt}>forged</dt><dd style={fdStyles.dd}>{figure.forged}</dd>
        <dt style={fdStyles.dt}>arc position</dt><dd style={fdStyles.dd}>{(parseInt(figure.no, 10) * 36) % 360}°</dd>
        <dt style={fdStyles.dt}>panel</dt><dd style={fdStyles.dd}>9 : 14 · double-border 4px</dd>
        <dt style={fdStyles.dt}>reflection</dt><dd style={fdStyles.dd}>on · 0.267 alpha</dd>
      </dl>
      <button style={fdStyles.primary}>Unsheath →</button>
    </aside>
  );
};

const fdStyles = {
  wrap: { width: 380, padding: '24px 24px', background: 'var(--ink-850)',
    borderLeft: '1px solid var(--border)', overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: 10 },
  topbar: { display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em',
    color: 'var(--ember-400)', textTransform: 'uppercase' },
  x: { background: 'transparent', border: '1px solid var(--border)',
    borderRadius: 4, padding: '4px 8px', fontFamily: 'var(--font-mono)',
    fontSize: 10, letterSpacing: '.16em', color: 'var(--fg-3)',
    textTransform: 'uppercase', cursor: 'pointer' },
  portraitWrap: { position: 'relative' },
  portrait: { width: '100%', aspectRatio: '9/14', objectFit: 'cover',
    borderRadius: 12, border: '4px double #000', display: 'block',
    boxShadow: 'var(--glow-crimson-md)' },
  kana: { position: 'absolute', top: 16, right: 16,
    fontFamily: 'var(--font-brush)', fontSize: 48,
    color: 'var(--crimson-400)',
    textShadow: '0 2px 20px rgba(0,0,0,.9), var(--glow-crimson-md)' },
  no: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em',
    color: 'var(--ember-400)', textTransform: 'uppercase', marginTop: 8 },
  name: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28,
    letterSpacing: '.08em', textTransform: 'uppercase', margin: '4px 0',
    color: 'var(--fg-1)' },
  chips: { display: 'flex', gap: 6 },
  chipHot: { fontFamily: 'var(--font-mono)', fontSize: 10,
    letterSpacing: '.14em', padding: '3px 9px', borderRadius: 999,
    color: 'var(--crimson-400)', border: '1px solid var(--border-hot)',
    background: 'rgba(199,31,41,.1)', textTransform: 'uppercase' },
  chipGold: { fontFamily: 'var(--font-mono)', fontSize: 10,
    letterSpacing: '.14em', padding: '3px 9px', borderRadius: 999,
    color: 'var(--ember-400)', border: '1px solid var(--ember-700)',
    background: 'rgba(224,150,32,.08)', textTransform: 'uppercase' },
  rule: { height: 1, background: 'var(--border)', margin: '10px 0' },
  quote: { fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 18,
    lineHeight: 1.5, color: 'var(--fg-1)', margin: 0, fontStyle: 'italic',
    position: 'relative', paddingLeft: 20 },
  qmark: { color: 'var(--crimson-500)', fontSize: 22,
    fontFamily: 'var(--font-display)', fontWeight: 900, margin: '0 2px' },
  dl: { display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 16,
    rowGap: 8, margin: 0 },
  dt: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em',
    color: 'var(--fg-3)', textTransform: 'uppercase' },
  dd: { margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12,
    color: 'var(--fg-1)' },
  primary: { marginTop: 16, fontFamily: 'var(--font-display)', fontWeight: 600,
    fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase',
    padding: '14px 22px', borderRadius: 4, background: 'var(--crimson-600)',
    color: 'var(--bone-50)', border: '1px solid var(--crimson-700)',
    boxShadow: 'var(--glow-crimson-md)', cursor: 'pointer' },
};

window.FigureDetail = FigureDetail;
