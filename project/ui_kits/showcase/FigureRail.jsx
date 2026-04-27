// FigureRail.jsx — rail de beats sous le carousel
const GENRE_COLORS = {
  Trap: '#a3161f', Drill: '#7c1d6f', SexyDrill: '#c0185e',
  BB: '#1a5c3a', 'R&B': '#1a3a6b', Afrobeat: '#7a4a00', Kompa: '#0a4a6b',
};

const FigureRail = ({ setPlaying, beats = [] }) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <section style={railStyles.wrap}>
      <div style={railStyles.head}>
        <div style={railStyles.eye}>◈ khen fu · tous les beats</div>
        <h2 style={railStyles.h2}>Le Catalogue.</h2>
        <div style={railStyles.sub}>Double-clic sur un beat pour l'écouter.</div>
      </div>
      <div style={railStyles.rail}>
        {beats.map((beat, i) => (
          <div
            key={beat.id}
            style={{ ...railStyles.tile, ...(i === selected ? railStyles.tileOn : {}) }}
            onClick={() => setSelected(i)}
            onDoubleClick={() => setPlaying(beat)}
            title="Double-clic pour écouter"
          >
            <div style={railStyles.imgWrap}>
              <img src={beat.img} style={railStyles.img} alt={beat.title} />
              <span style={{ ...railStyles.genreDot, background: GENRE_COLORS[beat.genre] || '#a3161f' }} />
            </div>
            <div style={railStyles.no}>no. {beat.id}</div>
            <div style={railStyles.name}>{beat.title}</div>
            <div style={railStyles.meta}>{beat.bpm} BPM · {beat.key}</div>
            <div style={railStyles.genre}>{beat.genre}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const railStyles = {
  wrap: { padding: '96px 56px 140px', background: 'var(--ink-900)' },
  head: { marginBottom: 40, maxWidth: 640 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.28em', color: 'var(--ember-400)', textTransform: 'uppercase', marginBottom: 10 },
  h2: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, letterSpacing: '.08em', textTransform: 'uppercase', margin: '0 0 8px', color: 'var(--fg-1)' },
  sub: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', color: 'var(--fg-3)', textTransform: 'uppercase' },
  rail: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 },
  tile: { background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 16, padding: 12, cursor: 'pointer', transition: 'all .2s', userSelect: 'none' },
  tileOn: { borderColor: 'var(--border-hot)', boxShadow: 'var(--glow-crimson-md), var(--shadow-inset)' },
  imgWrap: { position: 'relative', marginBottom: 10 },
  img: { width: '100%', aspectRatio: '9/14', objectFit: 'cover', borderRadius: 10, border: '2px double #000', display: 'block' },
  genreDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', display: 'block' },
  no: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', color: 'var(--ember-400)', textTransform: 'uppercase' },
  name: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '.08em', color: 'var(--fg-1)', textTransform: 'uppercase', marginTop: 3 },
  meta: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', marginTop: 3, letterSpacing: '.08em' },
  genre: { fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--crimson-400)', marginTop: 2, letterSpacing: '.12em', textTransform: 'uppercase' },
};

window.FigureRail = FigureRail;
