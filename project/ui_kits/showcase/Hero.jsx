// Hero.jsx — two-column hero with copy left, carousel right
const Hero = () => {
  const [paused, setPaused] = React.useState(false);
  return (
    <section style={heroStyles.wrap}>
      {/* Layered background: torii + red leaves behind carousel */}
      <div style={heroStyles.bgBack} aria-hidden="true"></div>
      <div style={heroStyles.vignette} aria-hidden="true"></div>

      {/* Carousel dead-centered on the hero so its axis aligns with the katana */}
      <div style={heroStyles.stage}>
        <Carousel3D paused={paused} />
      </div>

      {/* Katana silhouette pulled to the foreground — images pass BEHIND it */}
      <div style={heroStyles.bgFront} aria-hidden="true"></div>

      <div style={heroStyles.copy}>
        <div style={heroStyles.eye}>⛩ chapter i · the entrance</div>
        <h1 style={heroStyles.title}>Draw<br />The<br />Blade.</h1>
        <div style={heroStyles.kana}>道場 剣</div>
        <p style={heroStyles.body}>
          Ten figures circle the blade at fifteen seconds of arc. Each panel is shown
          only in passing, only at an angle. Hover to pause. Move away to release.
        </p>
        <div style={heroStyles.ctaRow}>
          <button style={heroStyles.primary}>Enter the Dojo</button>
          <button style={heroStyles.ghost} onClick={() => setPaused(p => !p)}>
            {paused ? '▶ Resume' : '⏸ Pause rotation'}
          </button>
        </div>
        <div style={heroStyles.meta}>
          <span>no. 11 figures</span><span>·</span>
          <span>22s rotation</span><span>·</span>
          <span>crimson · ember · bone</span>
        </div>
      </div>
    </section>
  );
};

const heroStyles = {
  wrap: {
    position: 'relative',
    padding: '80px 56px 120px',
    background: 'var(--ink-950)',
    minHeight: 820,
    overflow: 'hidden',
  },
  // Back layer: full scene with everything — the torii, the leaves, the katana.
  bgBack: {
    position: 'absolute', inset: 0,
    backgroundImage: 'url(../../assets/images/dojosabre.jpg)',
    backgroundSize: 'cover', backgroundPosition: 'center',
    zIndex: 0,
  },
  // Radial dark vignette over the back, so the carousel reads.
  vignette: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 72% 50%, rgba(13,10,11,0.35) 0%, rgba(13,10,11,0.75) 50%, rgba(13,10,11,0.95) 85%)',
    zIndex: 1,
  },
  // Front layer is no longer used — the katana is now rendered as a 3D sibling
  // INSIDE the carousel scene (see Carousel3D.jsx) so browser z-sorting gives
  // real depth: panels in front occlude the blade, panels behind are occluded.
  bgFront: { display: 'none' },
  copy: {
    position: 'absolute',
    left: 56, top: '50%', transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 440,
    zIndex: 5,
  },
  eye: {
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.28em',
    color: 'var(--ember-400)', textTransform: 'uppercase',
    textShadow: 'var(--glow-ember-sm)',
  },
  title: {
    fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 88,
    letterSpacing: '.08em', lineHeight: 0.95, margin: 0,
    textTransform: 'uppercase', color: 'var(--fg-1)',
    textShadow: '0 4px 24px rgba(0,0,0,.9)',
  },
  kana: { fontFamily: 'var(--font-brush)', fontSize: 28,
    color: 'var(--crimson-500)', letterSpacing: '.2em', marginTop: -4 },
  body: { fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 17,
    lineHeight: 1.65, color: 'var(--fg-2)', margin: 0, maxWidth: 440 },
  ctaRow: { display: 'flex', gap: 12, marginTop: 8 },
  primary: {
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
    letterSpacing: '.22em', textTransform: 'uppercase', padding: '14px 26px',
    borderRadius: 4, background: 'var(--crimson-600)', color: 'var(--bone-50)',
    border: '1px solid var(--crimson-700)', boxShadow: 'var(--glow-crimson-md)',
    cursor: 'pointer',
  },
  ghost: {
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
    letterSpacing: '.22em', textTransform: 'uppercase', padding: '14px 26px',
    borderRadius: 4, background: 'transparent', color: 'var(--fg-1)',
    border: '1px solid var(--border-strong)', cursor: 'pointer',
  },
  meta: {
    display: 'flex', gap: 10, marginTop: 24,
    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em',
    color: 'var(--fg-3)', textTransform: 'uppercase',
  },
  stage: {
    position: 'absolute', inset: 0,
    display: 'grid', placeItems: 'center',
    zIndex: 2, pointerEvents: 'auto',
  },
};

window.Hero = Hero;
