// FigureGrid.jsx — grille de beats avec hover info + double-clic pour jouer
const GENRE_COLORS = {
  Trap: '#a3161f', Drill: '#7c1d6f', SexyDrill: '#c0185e',
  BB: '#1a5c3a', 'R&B': '#1a3a6b', Afrobeat: '#7a4a00', Kompa: '#0a4a6b',
};

const BeatCard = ({ beat, selected, onSelect, onPlay }) => {
  const [hovered, setHovered] = React.useState(false);
  const on = selected?.id === beat.id;

  return (
    <article
      onClick={() => onSelect(beat)}
      onDoubleClick={() => onPlay(beat)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...fgStyles.card, ...(on ? fgStyles.cardOn : {}), ...(hovered ? fgStyles.cardHover : {}) }}
      title="Double-clic pour écouter"
    >
      <div style={fgStyles.imgWrap}>
        <img src={beat.img} style={fgStyles.img} alt="" />
        <span style={{ ...fgStyles.genreBadge, background: GENRE_COLORS[beat.genre] || '#a3161f' }}>
          {beat.genre}
        </span>
        {/* Overlay hover avec description */}
        {hovered && (
          <div style={fgStyles.hoverOverlay}>
            <div style={fgStyles.hoverDesc}>{beat.description}</div>
            <div style={fgStyles.hoverHint}>↵ double-clic pour écouter</div>
          </div>
        )}
      </div>
      <div style={fgStyles.no}>no. {beat.id}</div>
      <div style={fgStyles.name}>{beat.title}</div>
      <div style={fgStyles.meta}>
        <span style={fgStyles.bpm}>{beat.bpm} BPM · {beat.key}</span>
        <span style={fgStyles.dur}>{beat.duration}</span>
      </div>
      <div style={fgStyles.price}>{beat.price} € {beat.isFree && <span style={fgStyles.free}>· gratuit ⬇</span>}</div>
    </article>
  );
};

const FigureGrid = ({ beats = [], selected, setSelected, setPlaying }) => {
  return (
    <main style={fgStyles.wrap}>
      <header style={fgStyles.head}>
        <div>
          <div style={fgStyles.eye}>♪ khen fu · catalogue</div>
          <h1 style={fgStyles.h1}>Les Beats.</h1>
          <div style={fgStyles.sub}>
            {beats.length} beats disponibles
          </div>
        </div>
        <div style={fgStyles.tools}>
          <button style={fgStyles.tbtn}>⊞ grille</button>
          <button style={fgStyles.tbtnGhost}>☰ liste</button>
        </div>
      </header>
      <div style={fgStyles.grid}>
        {beats.map(b => (
          <BeatCard
            key={b.id}
            beat={b}
            selected={selected}
            onSelect={setSelected}
            onPlay={setPlaying}
          />
        ))}
      </div>
    </main>
  );
};

const fgStyles = {
  wrap: { flex: 1, padding: '32px 36px', overflowY: 'auto', background: 'var(--ink-900)', paddingBottom: 90 },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.28em', color: 'var(--ember-400)', textTransform: 'uppercase' },
  h1: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, letterSpacing: '.08em', textTransform: 'uppercase', margin: '10px 0 6px', color: 'var(--fg-1)' },
  sub: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--fg-3)', textTransform: 'uppercase' },
  subHot: { color: 'var(--crimson-400)' },
  tools: { display: 'flex', gap: 8 },
  tbtn: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', padding: '8px 14px', borderRadius: 4, background: 'var(--crimson-900)', color: 'var(--ember-400)', border: '1px solid var(--border-hot)', cursor: 'pointer' },
  tbtnGhost: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', padding: '8px 14px', borderRadius: 4, background: 'transparent', color: 'var(--fg-2)', border: '1px solid var(--border)', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  card: { background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 16, padding: 14, cursor: 'pointer', transition: 'all .18s', position: 'relative', userSelect: 'none' },
  cardHover: { borderColor: 'var(--border-strong)', transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' },
  cardOn: { borderColor: 'var(--border-hot)', boxShadow: 'var(--glow-crimson-md), var(--shadow-inset)' },
  imgWrap: { position: 'relative', marginBottom: 12, overflow: 'hidden', borderRadius: 10 },
  img: { width: '100%', aspectRatio: '9/12', objectFit: 'cover', borderRadius: 10, border: '2px double #000', display: 'block' },
  genreBadge: { position: 'absolute', top: 8, right: 8, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, color: '#fff' },
  hoverOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(7,5,6,0.93))', padding: '32px 10px 10px', borderRadius: '0 0 10px 10px' },
  hoverDesc: { fontFamily: 'var(--font-serif)', fontSize: 11, lineHeight: 1.5, color: 'var(--fg-2)', marginBottom: 4 },
  hoverHint: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ember-400)' },
  no: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', color: 'var(--ember-400)', textTransform: 'uppercase' },
  name: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '.06em', color: 'var(--fg-1)', textTransform: 'uppercase', marginTop: 3 },
  meta: { display: 'flex', justifyContent: 'space-between', marginTop: 5, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em' },
  bpm: { color: 'var(--fg-3)' },
  dur: { color: 'var(--ember-400)' },
  price: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: 'var(--fg-1)', marginTop: 6 },
  free: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember-400)', letterSpacing: '.1em' },
};

window.FigureGrid = FigureGrid;
