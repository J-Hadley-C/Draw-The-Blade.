// AudioPlayer.jsx — lecteur audio persistant, barre fixe en bas de page
const AudioPlayer = ({ beat, onClose, onBuy }) => {
  const audioRef = React.useRef(null);
  const trackedRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [vol, setVol] = React.useState(0.8);
  const [plays, setPlays] = React.useState(0);
  const [likesUp, setLikesUp] = React.useState(0);
  const [likesDown, setLikesDown] = React.useState(0);

  React.useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setPlays(beat ? (beat.playCount || 0) : 0);
    setLikesUp(beat ? (beat.likesUp || 0) : 0);
    setLikesDown(beat ? (beat.likesDown || 0) : 0);
    trackedRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      if (beat && beat.audio) {
        audioRef.current.src = beat.audio;
        audioRef.current.volume = vol;
      }
    }
  }, [beat]);

  const toggle = () => {
    if (!audioRef.current || !beat || !beat.audio) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
      if (trackedRef.current !== beat.id) {
        trackedRef.current = beat.id;
        fetch(`${window.APP_CONFIG.API_BASE}/api/beats/${beat.id}/play`, { method: 'POST' })
          .then(r => r.json())
          .then(d => setPlays(d.playCount))
          .catch(() => {});
      }
    }
  };

  const handleLike = (type) => {
    if (!beat) return;
    fetch(`${window.APP_CONFIG.API_BASE}/api/beats/${beat.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    })
      .then(r => r.json())
      .then(d => { setLikesUp(d.likesUp); setLikesDown(d.likesDown); })
      .catch(() => {});
    if (type === 'up') setLikesUp(n => n + 1);
    else setLikesDown(n => n + 1);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current || !audioRef.current.duration) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const onEnded = () => { setPlaying(false); setProgress(0); };

  const seek = (e) => {
    if (!audioRef.current || !beat || !beat.audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
  };

  const changeVol = (e) => {
    const v = parseFloat(e.target.value);
    setVol(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const hasAudio = beat && !!beat.audio;

  // Toujours visible — affiche un état "aucun beat" si rien n'est sélectionné
  if (!beat) return (
    <div style={{ ...apStyles.wrap, justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
        ♪ double-clic sur un beat pour l'écouter
      </span>
    </div>
  );

  const genreColor = {
    Trap: '#a3161f', Drill: '#7c1d6f', SexyDrill: '#c0185e',
    BB: '#1a5c3a', 'R&B': '#1a3a6b', Afrobeat: '#7a4a00', Kompa: '#0a4a6b',
  };

  return (
    <div style={apStyles.wrap}>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} />

      <img src={beat.img} style={apStyles.cover} alt="" />

      <div style={apStyles.info}>
        <div style={apStyles.title}>{beat.title}</div>
        <div style={apStyles.metaRow}>
          <span style={{ ...apStyles.genre, background: genreColor[beat.genre] || '#a3161f' }}>{beat.genre}</span>
          <span style={apStyles.dim}>{beat.bpm} BPM · {beat.key} · {beat.duration}</span>
          <span style={apStyles.plays}>▶ {plays}</span>
        </div>
      </div>

      <div style={apStyles.controls}>
        <button onClick={toggle} style={{ ...apStyles.playBtn, opacity: hasAudio ? 1 : 0.35 }} title={hasAudio ? '' : 'Audio non disponible'}>
          {playing ? '⏸' : '▶'}
        </button>
        <div style={apStyles.seekWrap} onClick={seek}>
          <div style={apStyles.seekBg}>
            <div style={{ ...apStyles.seekFill, width: `${progress}%` }} />
            <div style={{ ...apStyles.seekThumb, left: `${progress}%` }} />
          </div>
        </div>
        <div style={apStyles.volWrap}>
          <span style={apStyles.volIcon}>🔊</span>
          <input type="range" min="0" max="1" step="0.05" value={vol} onChange={changeVol} style={apStyles.volSlider} aria-label="Volume" />
        </div>
      </div>

      <div style={apStyles.likes}>
        <button onClick={() => handleLike('up')} style={apStyles.likeBtn} title="J'aime">
          👍 <span style={apStyles.likeCount}>{likesUp}</span>
        </button>
        <button onClick={() => handleLike('down')} style={apStyles.likeBtn} title="J'aime pas">
          👎 <span style={apStyles.likeCount}>{likesDown}</span>
        </button>
      </div>

      <div style={apStyles.actions}>
        {beat.isFree && (
          <button style={{ ...apStyles.btnGhost, opacity: hasAudio ? 1 : 0.4 }} disabled={!hasAudio} title={hasAudio ? 'Télécharger version taguée' : 'Bientôt disponible'}>
            ⬇ Gratuit
          </button>
        )}
        <button onClick={() => onBuy && onBuy(beat)} style={apStyles.btnPrimary}>
          Acheter · {beat.price} €
        </button>
      </div>

      <button onClick={onClose} style={apStyles.close}>✕</button>
    </div>
  );
};

(function injectPlayerCSS() {
  if (document.getElementById('audio-player-css')) return;
  const s = document.createElement('style');
  s.id = 'audio-player-css';
  s.textContent = `
    input[type=range].kf-vol { -webkit-appearance: none; appearance: none; height: 3px; background: var(--border); border-radius: 99px; outline: none; }
    input[type=range].kf-vol::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: var(--ember-400); cursor: pointer; }
  `;
  document.head.appendChild(s);
})();

const apStyles = {
  wrap: {
    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '10px 24px',
    background: 'linear-gradient(180deg, rgba(7,5,6,0.92), var(--ink-950))',
    borderTop: '1px solid var(--ember-700)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 -4px 32px rgba(0,0,0,0.7)',
  },
  cover: { width: 44, height: 44, borderRadius: 8, objectFit: 'cover', border: '2px double #000', flexShrink: 0 },
  info: { minWidth: 160, flexShrink: 0 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 },
  metaRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 },
  genre: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 999, color: '#fff' },
  dim: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', textTransform: 'uppercase' },
  controls: { flex: 1, display: 'flex', alignItems: 'center', gap: 12 },
  playBtn: { width: 36, height: 36, borderRadius: '50%', background: 'var(--crimson-600)', border: '1px solid var(--crimson-700)', color: '#fff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-crimson-sm)', flexShrink: 0 },
  seekWrap: { flex: 1, cursor: 'pointer', padding: '8px 0' },
  seekBg: { height: 3, background: 'var(--ink-700)', borderRadius: 99, position: 'relative' },
  seekFill: { height: '100%', background: 'var(--crimson-500)', borderRadius: 99, transition: 'width .1s linear' },
  seekThumb: { position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', width: 10, height: 10, borderRadius: '50%', background: 'var(--ember-400)', marginLeft: 0 },
  volWrap: { display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 },
  volIcon: { fontSize: 12 },
  volSlider: { width: 70, cursor: 'pointer' },
  plays: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', color: 'var(--ember-400)', marginLeft: 4 },
  likes: { display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' },
  likeBtn: { background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--fg-2)', fontSize: 12, padding: '5px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'border-color .2s' },
  likeCount: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)' },
  actions: { display: 'flex', gap: 8, flexShrink: 0 },
  btnGhost: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', padding: '8px 14px', borderRadius: 4, background: 'transparent', color: 'var(--fg-2)', border: '1px solid var(--border)', cursor: 'pointer' },
  btnPrimary: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: 4, background: 'var(--crimson-600)', color: 'var(--bone-50)', border: '1px solid var(--crimson-700)', boxShadow: 'var(--glow-crimson-sm)', cursor: 'pointer' },
  close: { background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 10px', cursor: 'pointer', flexShrink: 0 },
};

window.AudioPlayer = AudioPlayer;
