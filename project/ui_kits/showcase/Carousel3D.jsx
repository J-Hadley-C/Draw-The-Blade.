// Carousel3D.jsx — cylindre rotatif avec hover info + double-clic pour jouer
const Carousel3D = ({ paused = false, setPlaying = () => {}, beats = [] }) => {
  const [hoveredBeat, setHoveredBeat] = React.useState(null);

  const carouselBeats = beats.filter(b => b.inCarousel);

  return (
    <div style={{ position: 'relative' }}>
      <div className={'carousel-stage' + (paused ? ' paused' : '')}>
        <div className="carousel">
          {carouselBeats.map((beat, i) => (
            <span
              key={beat.id}
              className="c-panel"
              style={{ '--i': i + 1, '--count': carouselBeats.length }}
              onMouseEnter={() => setHoveredBeat(beat)}
              onMouseLeave={() => setHoveredBeat(null)}
              onDoubleClick={() => setPlaying(beat)}
              title="Double-clic pour écouter"
            >
              <img src={beat.img} alt={beat.title} />
            </span>
          ))}
          <div className="c-katana" aria-hidden="true"></div>
        </div>
      </div>

      {/* Tooltip beat au survol */}
      {hoveredBeat && (
        <div style={tipStyles.wrap}>
          <div style={tipStyles.genre}>{hoveredBeat.genre}</div>
          <div style={tipStyles.title}>{hoveredBeat.title}</div>
          <div style={tipStyles.meta}>{hoveredBeat.bpm} BPM · {hoveredBeat.key} · {hoveredBeat.duration}</div>
          <div style={tipStyles.hint}>↵ double-clic pour écouter</div>
        </div>
      )}
    </div>
  );
};

const tipStyles = {
  wrap: { position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(7,5,6,0.88)', border: '1px solid var(--border-hot)', borderRadius: 8, padding: '10px 16px', textAlign: 'center', backdropFilter: 'blur(8px)', minWidth: 200, boxShadow: 'var(--glow-crimson-sm)', zIndex: 10, pointerEvents: 'none' },
  genre: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--crimson-400)', marginBottom: 4 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-1)' },
  meta: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--fg-3)', marginTop: 4 },
  hint: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ember-400)', marginTop: 6 },
};

// CSS du carousel injecté une seule fois
(function injectCarouselCSS() {
  if (document.getElementById('carousel-3d-css')) return;
  const style = document.createElement('style');
  style.id = 'carousel-3d-css';
  style.textContent = `
    .carousel-stage { display: grid; place-items: center; min-height: 560px; perspective: 1400px; perspective-origin: 50% 30%; }
    .carousel {
      position: relative; width: 200px; height: 300px;
      transform-style: preserve-3d;
      transform: rotateX(-12deg);
      animation: carousel-spin 22s linear infinite;
    }
    .carousel-stage:hover .carousel, .carousel-stage.paused .carousel { animation-play-state: paused; }
    @keyframes carousel-spin {
      0%   { transform: rotateX(-12deg) rotateY(0deg); }
      100% { transform: rotateX(-12deg) rotateY(360deg); }
    }
    .carousel .c-panel {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      transform-origin: center; transform-style: preserve-3d;
      transform: rotateY(calc(var(--i) * (360deg / var(--count, 10)))) translateZ(420px);
      -webkit-box-reflect: below 2px linear-gradient(transparent, transparent, rgba(4,4,4,0.35));
      cursor: pointer;
    }
    .carousel .c-panel img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      border-radius: 15px; border: 4px double #000; object-fit: cover;
      transition: box-shadow .3s;
    }
    .carousel .c-panel:hover img { box-shadow: var(--glow-crimson-md); }
    .carousel .c-katana {
      position: absolute; top: -120px; left: 50%; width: 120px; height: 540px; margin-left: -60px;
      transform-style: preserve-3d; transform: translateZ(0);
      background-image: url(../../assets/images/dojosabre.jpg);
      background-size: auto 100%; background-position: 50% 50%; background-repeat: no-repeat;
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 18%, #000 38%, #000 62%, transparent 82%, transparent 100%);
              mask-image: linear-gradient(90deg, transparent 0%, transparent 18%, #000 38%, #000 62%, transparent 82%, transparent 100%);
      pointer-events: none; filter: contrast(1.1) brightness(0.95);
    }
  `;
  document.head.appendChild(style);
})();

window.Carousel3D = Carousel3D;
