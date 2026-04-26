// FigureRail.jsx — below-the-fold scrolling rail of all figures
const FIGURES = [
  { no: '01', name: 'The Oracle', clan: 'Sibyl', img: '../../assets/images/1.png', kana: '巫' },
  { no: '02', name: 'The Headdress', clan: 'Oni', img: '../../assets/images/2.png', kana: '鬼' },
  { no: '03', name: 'The Glyph Monk', clan: 'Shinobi', img: '../../assets/images/3.jpg', kana: '忍' },
  { no: '04', name: 'Ember Mendicant', clan: 'Mystic', img: '../../assets/images/4.png', kana: '火' },
  { no: '05', name: 'The Wrapped One', clan: 'Revenant', img: '../../assets/images/5.jpg', kana: '霊' },
  { no: '06', name: 'Bone Shinobi', clan: 'Shinobi', img: '../../assets/images/6.jpg', kana: '骨' },
  { no: '07', name: 'Paper Hat Ronin', clan: 'Ronin', img: '../../assets/images/7.jpg', kana: '浪' },
  { no: '08', name: 'Split Mask', clan: 'Oni', img: '../../assets/images/8.jpg', kana: '仮' },
  { no: '09', name: 'The Rune Knight', clan: 'Shinobi', img: '../../assets/images/9.jpg', kana: '符' },
  { no: '10', name: 'The Vigil', clan: 'Sentinel', img: '../../assets/images/10.jpg', kana: '守' },
  { no: '11', name: 'The Seer', clan: 'Sibyl', img: '../../assets/images/11.jpg', kana: '見' },
];

const FigureRail = () => {
  const [selected, setSelected] = React.useState(3);
  return (
    <section style={railStyles.wrap}>
      <div style={railStyles.head}>
        <div style={railStyles.eye}>◈ the eleven · figure index</div>
        <h2 style={railStyles.h2}>Each Turn, a Name.</h2>
      </div>
      <div style={railStyles.rail}>
        {FIGURES.map((f, i) => (
          <div key={f.no} style={{
            ...railStyles.tile,
            ...(i === selected ? railStyles.tileOn : {}),
          }} onClick={() => setSelected(i)}>
            <img src={f.img} style={railStyles.img} alt="" />
            <div style={railStyles.kana}>{f.kana}</div>
            <div style={railStyles.no}>no. {f.no}</div>
            <div style={railStyles.name}>{f.name}</div>
            <div style={railStyles.clan}>· {f.clan}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const railStyles = {
  wrap: { padding: '96px 56px', background: 'var(--ink-900)' },
  head: { marginBottom: 40, maxWidth: 640 },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.28em',
    color: 'var(--ember-400)', textTransform: 'uppercase', marginBottom: 10 },
  h2: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48,
    letterSpacing: '.08em', textTransform: 'uppercase', margin: 0,
    color: 'var(--fg-1)' },
  rail: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 },
  tile: {
    background: 'var(--bg-panel)', border: '1px solid var(--border)',
    borderRadius: 16, padding: 14, cursor: 'pointer',
    transition: 'all .2s var(--ease-out)', position: 'relative', overflow: 'hidden',
  },
  tileOn: { borderColor: 'var(--border-hot)',
    boxShadow: 'var(--glow-crimson-md), var(--shadow-inset)' },
  img: { width: '100%', aspectRatio: '9/14', objectFit: 'cover',
    borderRadius: 10, border: '2px double #000', display: 'block',
    marginBottom: 12 },
  kana: { position: 'absolute', top: 16, right: 16,
    fontFamily: 'var(--font-brush)', fontSize: 22,
    color: 'var(--crimson-400)', textShadow: 'var(--glow-crimson-sm)' },
  no: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em',
    color: 'var(--ember-400)', textTransform: 'uppercase' },
  name: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
    letterSpacing: '.08em', color: 'var(--fg-1)', textTransform: 'uppercase',
    marginTop: 4 },
  clan: { fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-3)',
    marginTop: 2 },
};

window.FigureRail = FigureRail;
