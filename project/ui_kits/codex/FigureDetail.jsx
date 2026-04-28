// FigureDetail.jsx — tiroir de détail d'un beat
const GENRE_COLORS = {
  Trap: '#a3161f', Drill: '#7c1d6f', SexyDrill: '#c0185e',
  BB: '#1a5c3a', 'R&B': '#1a3a6b', Afrobeat: '#7a4a00', Kompa: '#0a4a6b',
};

const FigureDetail = ({ figure: beat, onClose, setPlaying }) => {
  if (!beat) return null;

  return (
    <aside style={fdStyles.wrap}>
      <div style={fdStyles.topbar}>
        <span style={fdStyles.eye}>◈ beat · détail</span>
        <button onClick={onClose} style={fdStyles.x}>fermer ✕</button>
      </div>

      <div style={fdStyles.imgWrap}>
        <img src={beat.img} style={fdStyles.portrait} alt="" />
        <span style={{ ...fdStyles.genrePill, background: GENRE_COLORS[beat.genre] || '#a3161f' }}>
          {beat.genre}
        </span>
      </div>

      <div style={fdStyles.no}>beat no. {beat.id}</div>
      <h2 style={fdStyles.name}>{beat.title}</h2>

      <div style={fdStyles.chips}>
        <span style={fdStyles.chipHot}>{beat.bpm} BPM</span>
        <span style={fdStyles.chipGold}>{beat.key}</span>
        <span style={fdStyles.chipDim}>{beat.duration}</span>
      </div>

      <div style={fdStyles.rule} />

      <p style={fdStyles.desc}>{beat.description}</p>

      <div style={fdStyles.rule} />

      <dl style={fdStyles.dl}>
        <dt style={fdStyles.dt}>genre</dt>      <dd style={fdStyles.dd}>{beat.genre}</dd>
        <dt style={fdStyles.dt}>bpm</dt>        <dd style={fdStyles.dd}>{beat.bpm}</dd>
        <dt style={fdStyles.dt}>tonalité</dt>   <dd style={fdStyles.dd}>{beat.key}</dd>
        <dt style={fdStyles.dt}>durée</dt>      <dd style={fdStyles.dd}>{beat.duration}</dd>
        <dt style={fdStyles.dt}>licence</dt>    <dd style={fdStyles.dd}>{beat.price} €</dd>
        <dt style={fdStyles.dt}>gratuit</dt>    <dd style={fdStyles.dd}>{beat.isFree ? 'version taguée disponible' : '—'}</dd>
      </dl>

      <div style={fdStyles.rule} />

      <div style={fdStyles.btnGroup}>
        <button onClick={() => setPlaying(beat)} style={fdStyles.btnPlay}>
          ▶ Écouter
        </button>
        {beat.isFree && (
          <button style={fdStyles.btnFree} disabled={!beat.audio} title={beat.audio ? '' : 'Bientôt disponible'}>
            ⬇ Gratuit
          </button>
        )}
        <button style={fdStyles.btnBuy}>
          Acheter · {beat.price} €
        </button>
      </div>
    </aside>
  );
};

const fdStyles = {
  wrap: { width: 340, padding: '24px', background: 'var(--ink-850)', borderLeft: '1px solid var(--border)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 90 },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em', color: 'var(--ember-400)', textTransform: 'uppercase' },
  x: { background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em', color: 'var(--fg-3)', textTransform: 'uppercase', cursor: 'pointer' },
  imgWrap: { position: 'relative' },
  portrait: { width: '100%', aspectRatio: '9/12', objectFit: 'cover', borderRadius: 12, border: '4px double #000', display: 'block', boxShadow: 'var(--glow-crimson-md)' },
  genrePill: { position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, color: '#fff' },
  no: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em', color: 'var(--ember-400)', textTransform: 'uppercase', marginTop: 6 },
  name: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, letterSpacing: '.08em', textTransform: 'uppercase', margin: '4px 0', color: 'var(--fg-1)' },
  chips: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  chipHot: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', padding: '3px 10px', borderRadius: 999, color: 'var(--crimson-400)', border: '1px solid var(--border-hot)', background: 'rgba(163,22,31,.12)', textTransform: 'uppercase' },
  chipGold: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', padding: '3px 10px', borderRadius: 999, color: 'var(--ember-400)', border: '1px solid var(--ember-700)', background: 'rgba(224,150,32,.08)', textTransform: 'uppercase' },
  chipDim: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', padding: '3px 10px', borderRadius: 999, color: 'var(--fg-3)', border: '1px solid var(--border)', textTransform: 'uppercase' },
  rule: { height: 1, background: 'var(--border)', margin: '8px 0' },
  desc: { fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 },
  dl: { display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 16, rowGap: 7, margin: 0 },
  dt: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--fg-3)', textTransform: 'uppercase' },
  dd: { margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-1)' },
  btnGroup: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 },
  btnPlay: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', padding: '13px 20px', borderRadius: 4, background: 'var(--ink-800)', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', cursor: 'pointer' },
  btnFree: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '11px 20px', borderRadius: 4, background: 'transparent', color: 'var(--fg-2)', border: '1px solid var(--border)', cursor: 'pointer' },
  btnBuy: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', padding: '13px 20px', borderRadius: 4, background: 'var(--crimson-600)', color: 'var(--bone-50)', border: '1px solid var(--crimson-700)', boxShadow: 'var(--glow-crimson-md)', cursor: 'pointer' },
};

window.FigureDetail = FigureDetail;
