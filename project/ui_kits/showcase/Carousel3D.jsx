// Carousel3D.jsx — the signature 3D rotating image cylinder.
// Faithful recreation of ROTATION_3D/style.css.
const CAROUSEL_IMAGES = [
  '../../assets/images/12.jpg',
  '../../assets/images/11.jpg',
  '../../assets/images/8.jpg',
  '../../assets/images/7.jpg',
  '../../assets/images/2.png',
  '../../assets/images/4.png',
  '../../assets/images/10.jpg',
  '../../assets/images/9.jpg',
  '../../assets/images/6.jpg',
  '../../assets/images/5.jpg',
];

const Carousel3D = ({ paused = false }) => {
  return (
    <div className={"carousel-stage" + (paused ? ' paused' : '')}>
      <div className="carousel">
        {CAROUSEL_IMAGES.map((src, i) => (
          <span key={i} className="c-panel" style={{ '--i': i + 1 }}>
            <img src={src} alt="" />
          </span>
        ))}
        {/* Katana billboard — sits at z=0 (axis of rotation), does NOT spin
            with the carousel. Panels with +Z render in FRONT of it,
            panels with −Z render BEHIND it: natural depth occlusion. */}
        <div className="c-katana" aria-hidden="true"></div>
      </div>
    </div>
  );
};

// Hook styles onto the document once
(function injectCarouselCSS() {
  if (document.getElementById('carousel-3d-css')) return;
  const style = document.createElement('style');
  style.id = 'carousel-3d-css';
  style.textContent = `
    .carousel-stage { display: grid; place-items: center; min-height: 560px; perspective: 1400px; perspective-origin: 50% 30%; }
    .carousel {
      position: relative; width: 200px; height: 300px;
      transform-style: preserve-3d;
      /* Slight downward tilt — camera dives onto the katana */
      transform: rotateX(-12deg);
      animation: carousel-spin 22s linear infinite;
    }
    .carousel-stage:hover .carousel, .carousel-stage.paused .carousel { animation-play-state: paused; }
    @keyframes carousel-spin {
      0% { transform: rotateX(-12deg) rotateY(0deg); }
      100% { transform: rotateX(-12deg) rotateY(360deg); }
    }
    .carousel .c-panel {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      transform-origin: center; transform-style: preserve-3d;
      transform: rotateY(calc(var(--i) * 36deg)) translateZ(420px);
      -webkit-box-reflect: below 2px linear-gradient(transparent, transparent, rgba(4,4,4,0.35));
    }
    .carousel .c-panel img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      border-radius: 15px; border: 4px double #000; object-fit: cover;
      transition: box-shadow .3s;
    }
    .carousel .c-panel:hover img { box-shadow: var(--glow-crimson-md); }

    /* Katana billboard — sampled from the hero image at the blade column,
       placed at the carousel axis (z = 0), not rotating with the cylinder.
       Counter-rotates Y so it always faces the camera (billboard). */
    .carousel .c-katana {
      position: absolute;
      top: -120px;            /* extend above the panel height */
      left: 50%;
      width: 120px;           /* narrow column */
      height: 540px;          /* tall blade */
      margin-left: -60px;     /* re-center */
      transform-style: preserve-3d;
      transform: translateZ(0);   /* ON the axis */
      background-image: url(../../assets/images/dojosabre.jpg);
      background-size: auto 100%;      /* scale to blade height */
      /* the katana in dojosabre.jpg (736x1472) is centered horizontally,
         so we shift by -308% of our 120px element (= 736/2 - 60) to expose
         only that vertical slice */
      background-position: 50% 50%;
      background-repeat: no-repeat;
      /* Crop source to just the blade column via a matching mask */
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 18%, #000 38%, #000 62%, transparent 82%, transparent 100%);
              mask-image: linear-gradient(90deg, transparent 0%, transparent 18%, #000 38%, #000 62%, transparent 82%, transparent 100%);
      pointer-events: none;
      filter: contrast(1.1) brightness(0.95);
    }
  `;
  document.head.appendChild(style);
})();

window.Carousel3D = Carousel3D;
