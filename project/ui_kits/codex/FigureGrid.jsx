// FigureGrid.jsx
const FigureGrid = ({ clan, selected, setSelected }) => {
  const figures = window.CODEX_FIGURES.filter(f =>
    clan === 'All' || f.clan === clan
  );
  return (
    <main style={fgStyles.wrap}>
      <header style={fgStyles.head}>
        <div>
          <div style={fgStyles.eye}>⛩ chapter i · figure index</div>
          <h1 style={fgStyles.h1}>The Eleven.</h1>
          <div style={fgStyles.sub}>
            {figures.length} of {window.CODEX_FIGURES.length} figures ·
            clan: <span style={fgStyles.subHot}>{clan.toLowerCase()}</span>
          </div>
        </div>
        <div style={fgStyles.tools}>
          <button style={fgStyles.tbtn}>⊞ grid</button>
          <button style={fgStyles.tbtnGhost}>☰ list</button>
          <button style={fgStyles.tbtnGhost}>⟳ sort</button>
        </div>
      </header>
      <div style={fgStyles.grid}>
        {figures.map(f => {
          const on = selected?.no === f.no;
          return (
            <article key={f.no}
              onClick={() => setSelected(f)}
              style={{ ...fgStyles.card, ...(on ? fgStyles.cardOn : {}) }}>
              <div style={fgStyles.imgWrap}>
                <img src={f.img} style={fgStyles.img} alt="" />
                <div style={fgStyles.kanaOver}>{f.kana}</div>
              </div>
              <div style={fgStyles.no}>no. {f.no}</div>
              <div style={fgStyles.name}>{f.name}</div>
              <div style={fgStyles.meta}>
                <span style={fgStyles.clan}>· {f.clan}</span>
                <span style={fgStyles.rune}>{f.rune}</span>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

const fgStyles = {
  wrap: { flex: 1, padding: '32px 36px', overflowY: 'auto',
    background: 'var(--ink-900)' },
  head: { display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-end', marginBottom: 28 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.28em',
    color: 'var(--ember-400)', textTransform: 'uppercase' },
  h1: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56,
    letterSpacing: '.08em', textTransform: 'uppercase', margin: '10px 0 6px',
    color: 'var(--fg-1)' },
  sub: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em',
    color: 'var(--fg-3)', textTransform: 'uppercase' },
  subHot: { color: 'var(--crimson-400)' },
  tools: { display: 'flex', gap: 8 },
  tbtn: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em',
    textTransform: 'uppercase', padding: '8px 14px', borderRadius: 4,
    background: 'var(--crimson-900)', color: 'var(--ember-400)',
    border: '1px solid var(--border-hot)', cursor: 'pointer' },
  tbtnGhost: { fontFamily: 'var(--font-mono)', fontSize: 10,
    letterSpacing: '.2em', textTransform: 'uppercase', padding: '8px 14px',
    borderRadius: 4, background: 'transparent', color: 'var(--fg-2)',
    border: '1px solid var(--border)', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  card: { background: 'var(--bg-panel)', border: '1px solid var(--border)',
    borderRadius: 16, padding: 14, cursor: 'pointer',
    transition: 'all .2s', position: 'relative' },
  cardOn: { borderColor: 'var(--border-hot)',
    boxShadow: 'var(--glow-crimson-md), var(--shadow-inset)' },
  imgWrap: { position: 'relative', marginBottom: 12 },
  img: { width: '100%', aspectRatio: '9/12', objectFit: 'cover',
    borderRadius: 10, border: '2px double #000', display: 'block' },
  kanaOver: { position: 'absolute', top: 10, right: 10,
    fontFamily: 'var(--font-brush)', fontSize: 28,
    color: 'var(--crimson-400)',
    textShadow: '0 2px 12px rgba(0,0,0,.9), var(--glow-crimson-sm)' },
  no: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em',
    color: 'var(--ember-400)', textTransform: 'uppercase' },
  name: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
    letterSpacing: '.06em', color: 'var(--fg-1)', textTransform: 'uppercase',
    marginTop: 4 },
  meta: { display: 'flex', justifyContent: 'space-between', marginTop: 6,
    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em' },
  clan: { color: 'var(--fg-3)' },
  rune: { color: 'var(--ember-400)' },
};

window.FigureGrid = FigureGrid;
