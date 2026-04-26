// Nav.jsx — top navigation bar
const Nav = ({ active = 'showcase' }) => {
  const links = [
    { id: 'showcase', label: '⛩ Showcase' },
    { id: 'codex', label: 'Codex' },
    { id: 'inscriptions', label: 'Inscriptions' },
    { id: 'about', label: 'About' },
  ];
  return (
    <nav style={navStyles.wrap}>
      <div style={navStyles.logo}>
        <div style={navStyles.word}>DOJO SABRE</div>
        <div style={navStyles.kana}>道場 剣</div>
      </div>
      <div style={navStyles.links}>
        {links.map(l => (
          <a key={l.id} href="#"
             style={{ ...navStyles.link, ...(l.id === active ? navStyles.linkOn : {}) }}>
            {l.label}
          </a>
        ))}
      </div>
      <button style={navStyles.cta}>Enter</button>
    </nav>
  );
};

const navStyles = {
  wrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 40px',
    borderTop: '1px solid var(--ember-700)',
    borderBottom: '1px solid var(--ember-700)',
    background: 'linear-gradient(180deg, var(--ink-900), var(--ink-850))',
    position: 'relative', zIndex: 10,
  },
  logo: { display: 'flex', flexDirection: 'column', lineHeight: 1, gap: 3 },
  word: { fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18,
    letterSpacing: '.26em', color: 'var(--fg-1)' },
  kana: { fontFamily: 'var(--font-brush)', fontSize: 12,
    color: 'var(--crimson-500)', letterSpacing: '.18em' },
  links: { display: 'flex', gap: 36 },
  link: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.24em',
    color: 'var(--fg-2)', textDecoration: 'none', textTransform: 'uppercase',
    cursor: 'pointer', transition: 'color .14s' },
  linkOn: { color: 'var(--ember-400)', textShadow: 'var(--glow-ember-sm)' },
  cta: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11,
    letterSpacing: '.2em', textTransform: 'uppercase', padding: '10px 20px',
    borderRadius: 4, background: 'var(--crimson-600)', color: 'var(--bone-50)',
    border: '1px solid var(--crimson-700)', boxShadow: 'var(--glow-crimson-sm)',
    cursor: 'pointer' },
};

window.Nav = Nav;
