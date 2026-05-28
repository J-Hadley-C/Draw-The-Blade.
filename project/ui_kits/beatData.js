// beatData.js — chargement dynamique des beats depuis l'API Symfony
const API_BASE = window.APP_CONFIG.API_BASE;

window.BEATS = [];
window.BEAT_GENRES = ['All', 'Trap', 'Drill', 'SexyDrill', 'BB', 'R&B', 'Afrobeat', 'Kompa'];

window.loadBeats = async function () {
  const res = await fetch(`${API_BASE}/api/beats`);
  const data = await res.json();
  window.BEATS = data.map(b => ({
    ...b,
    key: b.keySignature,
    img: b.imagePath
      ? (/^\d+\.(png|jpg|jpeg)$/i.test(b.imagePath)
          ? `../../assets/images/${b.imagePath}`
          : `${API_BASE}/uploads/beats/${b.imagePath}`)
      : '../../assets/images/1.png',
    audio: b.audioPath ? `${API_BASE}/api/beats/${b.id}/stream` : null,
  }));
  window.dispatchEvent(new CustomEvent('beatsLoaded', { detail: window.BEATS }));
  return window.BEATS;
};
