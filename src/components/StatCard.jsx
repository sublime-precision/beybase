import { createPortal } from 'react-dom';

const TYPE_THEME = {
  Attack:  { color: '#ef4444' },
  Defense: { color: '#3b82f6' },
  Stamina: { color: '#22c55e' },
  Balance: { color: '#eab308' },
};

const STAT_DEFS = [
  { label: 'Attack Power', key: 'attack' },
  { label: 'Defense',      key: 'defense' },
  { label: 'Stamina',      key: 'stamina' },
  { label: 'Burst Resist', key: 'burstResistance' },
  { label: 'Spin Speed',   key: 'spinSpeed' },
];

export function StatCard({ blade, item, ratchet, bit }) {
  const type   = blade?.type  ?? 'Balance';
  const stats  = blade?.stats ?? { attack: 5, defense: 5, stamina: 5, burstResistance: 5, spinSpeed: 5 };
  const rating = blade?.rating ?? 50;
  const photo  = blade?.photos?.[0] ?? item?.photoUrl ?? null;
  const name   = item?.nickname || blade?.name || 'Unknown';
  const theme  = TYPE_THEME[type] ?? TYPE_THEME.Balance;
  const c      = theme.color;

  return (
    <div
      style={{
        background: `linear-gradient(175deg, ${c}14 0%, #07070d 30%, #07070d 100%)`,
        border: `1px solid ${c}28`,
        boxShadow: `0 0 50px ${c}18, 0 0 1px ${c}40, 0 30px 80px rgba(0,0,0,0.85)`,
      }}
      className="w-full rounded-3xl overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: `1px solid ${c}20` }}
      >
        <span className="font-black text-[11px] tracking-[0.22em] uppercase text-white">BeyBase</span>
        <span className="font-black text-[10px] tracking-[0.28em] uppercase" style={{ color: c }}>
          Series X
        </span>
      </div>

      {/* Photo */}
      <div className="relative h-52 overflow-hidden">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-7xl"
            style={{ background: `${c}08` }}
          >
            🌀
          </div>
        )}
        {/* Fade photo into card */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 35%, #07070d 100%)' }}
        />
        {/* Type badge over photo */}
        <div className="absolute bottom-3 right-4">
          <span
            className="text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest"
            style={{
              background: `${c}22`,
              color: c,
              border: `1px solid ${c}50`,
              backdropFilter: 'blur(6px)',
            }}
          >
            {type}
          </span>
        </div>
      </div>

      {/* Name + combo */}
      <div className="px-5 pt-3 pb-2">
        <h2
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: '1.65rem' }}
        >
          {name}
        </h2>
        {(ratchet || bit) && (
          <p className="text-[11px] font-semibold mt-1.5" style={{ color: `${c}70` }}>
            {[ratchet?.name, bit?.name].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 my-3" style={{ height: 1, background: `${c}18` }} />

      {/* Stats */}
      <div className="px-5 pb-4 space-y-3.5">
        {STAT_DEFS.map(({ label, key }) => {
          const val = stats[key] ?? 0;
          return (
            <div key={key} className="flex items-center gap-3">
              <span
                className="font-black uppercase tracking-wide flex-shrink-0"
                style={{ color: `${c}b0`, fontSize: '10px', width: 84 }}
              >
                {label}
              </span>
              <div
                className="flex-1 rounded-full overflow-hidden"
                style={{ height: 7, background: `${c}15` }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(val / 10) * 100}%`,
                    background: c,
                    boxShadow: `0 0 8px ${c}, 0 0 16px ${c}55`,
                  }}
                />
              </div>
              <span
                className="text-white font-black tabular-nums text-right"
                style={{ fontSize: '0.875rem', width: 14 }}
              >
                {val}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rating */}
      <div
        className="mx-5 mb-5 rounded-2xl px-5 py-4 flex items-center justify-between"
        style={{ background: `${c}0c`, border: `1px solid ${c}28` }}
      >
        <div>
          <p
            className="font-black uppercase"
            style={{ color: c, fontSize: '10px', letterSpacing: '0.18em' }}
          >
            BeyBase Rating
          </p>
          <p
            className="text-gray-600 uppercase mt-0.5"
            style={{ fontSize: '10px', letterSpacing: '0.12em' }}
          >
            Overall Performance
          </p>
        </div>
        <div className="flex items-end gap-1">
          <span
            className="font-black tabular-nums leading-none"
            style={{
              color: c,
              fontSize: '3.25rem',
              lineHeight: 1,
              textShadow: `0 0 30px ${c}, 0 0 60px ${c}50`,
            }}
          >
            {rating}
          </span>
          <span className="text-gray-600 font-bold text-sm mb-1">/100</span>
        </div>
      </div>
    </div>
  );
}

export function StatCardModal({ blade, item, ratchet, bit, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999]" style={{ background: 'rgba(0,0,0,0.96)' }}>
      <button className="absolute inset-0 w-full h-full" onClick={onClose} aria-label="Close" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
        style={{ background: 'rgba(255,255,255,0.1)' }}
        aria-label="Close"
      >
        ✕
      </button>
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center px-4 pt-16 pb-8">
          <div className="w-full max-w-sm relative z-[1]">
            <StatCard blade={blade} item={item} ratchet={ratchet} bit={bit} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
