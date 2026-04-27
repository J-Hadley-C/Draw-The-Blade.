// Hero.jsx — section héro Khen Fu avec carousel 3D
const GENRES = ['Trap', 'Drill', 'SexyDrill', 'BB', 'R&B', 'Afrobeat', 'Kompa'];

const Hero = ({ setPlaying, beats = [] }) => {
  const [paused, setPaused] = React.useState(false);

  return (
    <section style={heroStyles.wrap}>
      <div style={heroStyles.bgBack} aria-hidden="true"></div>
      <div style={heroStyles.vignette} aria-hidden="true"></div>

      <div style={heroStyles.stage}>
        <Carousel3D paused={paused} setPlaying={setPlaying} beats={beats} />
      </div>

      <div style={heroStyles.copy}>
        <div style={heroStyles.eye}>♪ khen fu · beatmaker</div>
        <h1 style={heroStyles.title}>Beats.<br />Forgés<br />en silence.</h1>
        <div style={heroStyles.kana}>音楽 · 刃</div>
        <p style={heroStyles.body}>
          Dix productions circulent. Survole pour les détails.
          Double-clic pour lancer l'écoute. Hover pause la rotation.
        </p>

        {/* Filtres genre */}
        <div style={heroStyles.genreRow}>
          {GENRES.map(g => (
            <span key={g} style={heroStyles.genreTag}>{g}</span>
          ))}
        </div>

        <div style={heroStyles.ctaRow}>
          <button style={heroStyles.primary}>Voir le catalogue</button>
          <button style={heroStyles.ghost} onClick={() => setPaused(p => !p)}>
            {paused ? '▶ Reprendre' : '⏸ Pause'}
          </button>
        </div>

        <div style={heroStyles.meta}>
          <span>{beats.length || '…'} beats</span><span>·</span>
          <span>22s rotation</span><span>·</span>
          <span>crimson · ember · bone</span>
        </div>
      </div>
    </section>
  );
};

const heroStyles = {
  wrap: { position: 'relative', padding: '80px 56px 120px', background: 'var(--ink-950)', minHeight: 820, overflow: 'hidden' },
  bgBack: { position: 'absolute', inset: 0, backgroundImage: 'url(../../assets/images/dojosabre.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 },
  vignette: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 50%, rgba(13,10,11,0.35) 0%, rgba(13,10,11,0.75) 50%, rgba(13,10,11,0.95) 85%)', zIndex: 1 },
  stage: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 2, pointerEvents: 'auto' },
  copy: { position: 'absolute', left: 56, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 460, zIndex: 5 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.28em', color: 'var(--ember-400)', textTransform: 'uppercase', textShadow: 'var(--glow-ember-sm)' },
  title: { fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 80, letterSpacing: '.08em', lineHeight: 0.95, margin: 0, textTransform: 'uppercase', color: 'var(--fg-1)', textShadow: '0 4px 24px rgba(0,0,0,.9)' },
  kana: { fontFamily: 'var(--font-brush)', fontSize: 26, color: 'var(--crimson-500)', letterSpacing: '.2em', marginTop: -4 },
  body: { fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0, maxWidth: 420 },
  genreRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  genreTag: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, border: '1px solid var(--border-strong)', color: 'var(--fg-3)', cursor: 'pointer' },
  ctaRow: { display: 'flex', gap: 12, marginTop: 4 },
  primary: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', padding: '14px 26px', borderRadius: 4, background: 'var(--crimson-600)', color: 'var(--bone-50)', border: '1px solid var(--crimson-700)', boxShadow: 'var(--glow-crimson-md)', cursor: 'pointer' },
  ghost: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', padding: '14px 26px', borderRadius: 4, background: 'transparent', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', cursor: 'pointer' },
  meta: { display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--fg-3)', textTransform: 'uppercase' },
};

window.Hero = Hero;
