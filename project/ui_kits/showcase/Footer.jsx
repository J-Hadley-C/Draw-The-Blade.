// Footer.jsx — ceremonial footer
const Footer = () => (
  <footer style={footerStyles.wrap}>
    <div style={footerStyles.rule}></div>
    <div style={footerStyles.inner}>
      <div style={footerStyles.col}>
        <div style={footerStyles.word}>DOJO SABRE</div>
        <div style={footerStyles.kana}>道場 剣</div>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.h}>Chapters</div>
        <a style={footerStyles.a}>i · the entrance</a>
        <a style={footerStyles.a}>ii · the reflection</a>
        <a style={footerStyles.a}>iii · the unsheathing</a>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.h}>Codex</div>
        <a style={footerStyles.a}>figure index</a>
        <a style={footerStyles.a}>inscriptions</a>
        <a style={footerStyles.a}>clans</a>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.h}>Forge</div>
        <a style={footerStyles.a}>source · github</a>
        <a style={footerStyles.a}>design notes</a>
        <a style={footerStyles.a}>license</a>
      </div>
    </div>
    <div style={footerStyles.rule}></div>
    <div style={footerStyles.fine}>
      <span>forged in crimson · bound in bone</span>
      <span>© 2026 · 影刃 · all rotations reserved</span>
    </div>
  </footer>
);

const footerStyles = {
  wrap: { background: 'var(--ink-950)', padding: '0 56px 40px' },
  rule: { height: 1, background:
    'linear-gradient(90deg, transparent, var(--ember-700), transparent)' },
  inner: { display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
    gap: 40, padding: '48px 0' },
  col: { display: 'flex', flexDirection: 'column', gap: 8 },
  word: { fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20,
    letterSpacing: '.26em', color: 'var(--fg-1)' },
  kana: { fontFamily: 'var(--font-brush)', fontSize: 16,
    color: 'var(--crimson-500)', letterSpacing: '.18em' },
  h: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em',
    color: 'var(--ember-400)', textTransform: 'uppercase', marginBottom: 6 },
  a: { fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)',
    textDecoration: 'none', cursor: 'pointer' },
  fine: { display: 'flex', justifyContent: 'space-between',
    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em',
    color: 'var(--fg-3)', textTransform: 'uppercase', paddingTop: 16 },
};

window.Footer = Footer;
