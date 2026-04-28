// Sidebar.jsx — filtre par genre avec sous-menu Drill
const Sidebar = ({ genre, setGenre, beats = [] }) => {
  const counts = {};
  beats.forEach(b => { counts[b.genre] = (counts[b.genre] || 0) + 1; });

  const topGenres = ['All', 'Trap', 'Drill', 'BB', 'R&B', 'Afrobeat', 'Kompa'];

  return (
    <aside style={sbStyles.wrap}>
      <div style={sbStyles.eye}>◈ filter · genre</div>

      <div style={sbStyles.list}>
        {topGenres.map(g => {
          const total = g === 'All' ? beats.length : (counts[g] || 0);
          const on = g === genre;
          return (
            <React.Fragment key={g}>
              <div onClick={() => setGenre(g)} style={{ ...sbStyles.item, ...(on ? sbStyles.itemOn : {}) }}>
                <span>{g === 'BB' ? 'Boom Bap' : g}</span>
                <span style={on ? sbStyles.countOn : sbStyles.count}>{total}</span>
              </div>

              {/* Sous-menu SexyDrill sous Drill */}
              {g === 'Drill' && (
                <div onClick={() => setGenre('SexyDrill')} style={{
                  ...sbStyles.item,
                  ...sbStyles.subItem,
                  ...(genre === 'SexyDrill' ? sbStyles.itemOn : {}),
                }}>
                  <span style={sbStyles.subLabel}>↳ SexyDrill</span>
                  <span style={genre === 'SexyDrill' ? sbStyles.countOn : sbStyles.count}>{counts['SexyDrill'] || 0}</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={sbStyles.rule} />

      <div style={sbStyles.eye}>◈ catalogue</div>
      <div style={sbStyles.log}>
        <div><span style={sbStyles.dot} /> {beats.length} beats disponibles</div>
        <div><span style={sbStyles.dot} /> {beats.filter(b => b.isFree).length} versions gratuites</div>
        <div><span style={sbStyles.dot} /> maj · {new Date().toLocaleDateString('fr-FR')}</div>
      </div>

      <div style={sbStyles.rule} />

    </aside>
  );
};

const sbStyles = {
  wrap: { width: 260, padding: '28px 20px', background: 'var(--ink-850)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' },
  eye: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.24em', color: 'var(--ember-400)', textTransform: 'uppercase' },
  list: { display: 'flex', flexDirection: 'column', gap: 2 },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderRadius: 6, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', cursor: 'pointer', transition: 'all .14s' },
  itemOn: { background: 'var(--crimson-900)', color: 'var(--fg-1)', boxShadow: 'inset 3px 0 0 var(--crimson-500)' },
  subItem: { marginLeft: 16, paddingLeft: 10, borderLeft: '1px solid var(--border)' },
  subLabel: { fontSize: 12, color: 'var(--fg-3)' },
  count: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' },
  countOn: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ember-400)' },
  rule: { height: 1, background: 'var(--border)', margin: '8px 0' },
  log: { display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', letterSpacing: '.04em' },
  dot: { display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--ember-500)', marginRight: 8, boxShadow: 'var(--glow-ember-sm)' },
  brushRow: { display: 'flex', gap: 14, justifyContent: 'center', padding: '10px 0' },
  brush: { fontFamily: 'var(--font-brush)', fontSize: 32, color: 'var(--crimson-500)' },
};

window.Sidebar = Sidebar;
