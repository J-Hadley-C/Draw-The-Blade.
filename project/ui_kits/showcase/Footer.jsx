// Footer.jsx — pied de page Khen Fu
const Footer = () => (
  <footer style={footerStyles.wrap}>
    <div style={footerStyles.rule}></div>
    <div style={footerStyles.inner}>
      <div style={footerStyles.col}>
        <div style={footerStyles.word}>KHEN FU</div>
        <div style={footerStyles.tagline}>Beats forgés en silence.</div>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.h}>Catalogue</div>
        <a style={footerStyles.a}>Trap & Drill</a>
        <a style={footerStyles.a}>R&B & Afrobeat</a>
        <a style={footerStyles.a}>Boom Bap & Kompa</a>
        <a style={footerStyles.a}>SexyDrill</a>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.h}>Licences</div>
        <a style={footerStyles.a}>Licence basique</a>
        <a style={footerStyles.a}>Licence premium</a>
        <a style={footerStyles.a}>Exclusivité</a>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.h}>Contact</div>
        <a style={footerStyles.a}>Formulaire</a>
        <a style={footerStyles.a}>Collabs</a>
        <a style={footerStyles.a}>GitHub</a>
      </div>
    </div>
    <div style={footerStyles.rule}></div>
    <div style={footerStyles.fine}>
      <span>forgé en crimson · produit en silence</span>
      <span>© 2026 · Khen Fu · tous droits réservés</span>
    </div>
  </footer>
);

const footerStyles = {
  wrap: { background: 'var(--ink-950)', padding: '0 56px 40px' },
  rule: { height: 1, background: 'linear-gradient(90deg, transparent, var(--ember-700), transparent)' },
  inner: { display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, padding: '48px 0' },
  col: { display: 'flex', flexDirection: 'column', gap: 8 },
  word: { fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20, letterSpacing: '.26em', color: 'var(--fg-1)' },
  kana: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--crimson-500)', letterSpacing: '.18em' },
  tagline: { fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--fg-3)', marginTop: 4, fontStyle: 'italic' },
  h: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em', color: 'var(--ember-400)', textTransform: 'uppercase', marginBottom: 6 },
  a: { fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', textDecoration: 'none', cursor: 'pointer' },
  fine: { display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.2em', color: 'var(--fg-3)', textTransform: 'uppercase', paddingTop: 16 },
};

window.Footer = Footer;
