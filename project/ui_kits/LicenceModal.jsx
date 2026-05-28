// LicenceModal.jsx — modal de choix de licence pour un beat
const LicenceModal = ({ beat, onClose }) => {
  if (!beat) return null;

  const basePrice   = parseFloat(beat.price) || 29;
  const premiumPrice = Math.round(basePrice * 2.5 / 5) * 5;

  const contactUrl = (licence) =>
    `../contact/index.html?subject=${encodeURIComponent(`Achat licence ${licence} — ${beat.title}`)}`;

  const licences = [
    {
      id: 'basic',
      label: 'Licence Basique',
      price: `${basePrice} €`,
      tag: 'Non commercial',
      features: [
        '1 projet / mixtape',
        '500 copies physiques',
        'Streaming illimité',
        'Crédit obligatoire',
      ],
      featured: false,
      cta: 'Commander',
    },
    {
      id: 'premium',
      label: 'Licence Premium',
      price: `${premiumPrice} €`,
      tag: 'Commercial',
      features: [
        'Projets illimités',
        'Copies illimitées',
        'Streaming illimité',
        'Retrait du crédit possible',
      ],
      featured: true,
      cta: 'Commander',
    },
    {
      id: 'exclu',
      label: 'Exclusivité',
      price: 'Sur devis',
      tag: 'Droits complets',
      features: [
        'Droits exclusifs complets',
        'Retrait de la vente immédiat',
        'Transfert de copyright',
        'Utilisation TV / Cinéma',
      ],
      featured: false,
      cta: 'Contacter',
    },
  ];

  return (
    <div style={lm.overlay} onClick={onClose}>
      <div style={lm.modal} onClick={e => e.stopPropagation()}>

        {/* Header beat */}
        <div style={lm.header}>
          <div style={lm.beatInfo}>
            {beat.img && <img src={beat.img} style={lm.cover} alt="" />}
            <div>
              <div style={lm.eye}>◈ achat de licence</div>
              <div style={lm.beatTitle}>{beat.title}</div>
              <div style={lm.beatMeta}>
                <span style={{ ...lm.genrePill, background: (window.GENRE_COLORS || {})[beat.genre] || '#a3161f' }}>{beat.genre}</span>
                <span style={lm.metaDim}>{beat.bpm} BPM · {beat.key}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={lm.closeBtn}>✕</button>
        </div>

        <div style={lm.rule} />

        {/* Licence cards */}
        <div style={lm.grid}>
          {licences.map(lic => (
            <div key={lic.id} style={{ ...lm.card, ...(lic.featured ? lm.cardFeatured : {}) }}>
              {lic.featured && (
                <div style={lm.badge}>◈ Recommandé</div>
              )}
              <div style={lm.licLabel}>{lic.label}</div>
              <div style={lm.licTag}>{lic.tag}</div>
              <div style={{ ...lm.licPrice, color: lic.featured ? 'var(--crimson-400)' : 'var(--fg-1)' }}>
                {lic.price}
              </div>
              <div style={lm.rule} />
              <div style={lm.features}>
                {lic.features.map((f, i) => (
                  <div key={i} style={lm.feature}>
                    <span style={lm.check}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href={contactUrl(lic.label)}
                style={{ ...lm.cta, ...(lic.featured ? lm.ctaFeatured : {}) }}
              >
                {lic.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={lm.footer}>
          <span style={lm.footerTxt}>
            Toutes les licences incluent un fichier MP3 haute qualité. Paiement sécurisé par virement ou PayPal.
          </span>
        </div>
      </div>
    </div>
  );
};

const lm = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)',
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
    zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px', animation: 'lm-in .18s',
  },
  modal: {
    background: 'var(--ink-900)', border: '1px solid var(--border)',
    borderRadius: 16, width: '100%', maxWidth: 780,
    maxHeight: '90vh', overflowY: 'auto',
    boxShadow: '0 24px 80px rgba(0,0,0,.8)',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 24px',
  },
  beatInfo: { display: 'flex', alignItems: 'center', gap: 14 },
  cover: { width: 56, height: 56, borderRadius: 8, objectFit: 'cover', border: '2px double #000', flexShrink: 0 },
  eye:   { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember-400)', marginBottom: 4 },
  beatTitle: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-1)' },
  beatMeta:  { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 },
  genrePill: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 999, color: '#fff' },
  metaDim:   { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', textTransform: 'uppercase' },
  closeBtn:  { background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 13, padding: '6px 10px', cursor: 'pointer', flexShrink: 0 },
  rule:      { height: 1, background: 'var(--border)', margin: '0' },
  grid:      { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '24px' },
  card:      { background: 'var(--ink-850)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 },
  cardFeatured: { border: '1px solid var(--crimson-600)', boxShadow: 'var(--glow-crimson-sm)' },
  badge:     { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--crimson-400)', background: 'rgba(163,22,31,.15)', border: '1px solid var(--border-hot)', borderRadius: 999, padding: '3px 10px', alignSelf: 'flex-start' },
  licLabel:  { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-1)' },
  licTag:    { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: -4 },
  licPrice:  { fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 28, letterSpacing: '.04em', lineHeight: 1 },
  features:  { display: 'flex', flexDirection: 'column', gap: 7, flex: 1 },
  feature:   { display: 'flex', gap: 8, alignItems: 'flex-start', fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.4 },
  check:     { color: 'var(--ember-400)', fontSize: 11, flexShrink: 0, marginTop: 1 },
  cta:       { display: 'block', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', textAlign: 'center', padding: '11px 16px', borderRadius: 4, background: 'transparent', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', cursor: 'pointer', textDecoration: 'none', marginTop: 4, transition: 'all .14s' },
  ctaFeatured: { background: 'var(--crimson-600)', color: 'var(--bone-50)', border: '1px solid var(--crimson-700)', boxShadow: 'var(--glow-crimson-sm)' },
  footer:    { padding: '14px 24px', borderTop: '1px solid var(--border)' },
  footerTxt: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', textTransform: 'uppercase' },
};

// Injecter l'animation
(function() {
  if (document.getElementById('lm-css')) return;
  const s = document.createElement('style');
  s.id = 'lm-css';
  s.textContent = `@keyframes lm-in { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }`;
  document.head.appendChild(s);
})();

window.LicenceModal = LicenceModal;
