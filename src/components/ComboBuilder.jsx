import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KNOWN_BLADES, KNOWN_RATCHETS, KNOWN_BITS, TYPE_BG } from '../data/beyblades';

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}/10</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

function computeStats(blade, ratchet, bit) {
  if (!blade || !ratchet || !bit) return null;

  const baseStats = {
    Attack: { attack: 7, defense: 3, stamina: 4, burst: 6 },
    Defense: { attack: 3, defense: 8, stamina: 5, burst: 3 },
    Stamina: { attack: 2, defense: 6, stamina: 9, burst: 2 },
    Balance: { attack: 5, defense: 5, stamina: 6, burst: 5 },
  };

  const bitBonus = {
    Attack: { attack: 2, stamina: -1 },
    Defense: { defense: 2, attack: -1 },
    Stamina: { stamina: 2, attack: -1 },
    Balance: {},
  };

  const base = { ...baseStats[blade.type] };
  const bonus = bitBonus[bit.type] || {};
  const heightMod = ratchet.height >= 80 ? 1 : 0;

  return {
    attack: Math.min(10, Math.max(1, base.attack + (bonus.attack || 0))),
    defense: Math.min(10, Math.max(1, base.defense + (bonus.defense || 0) + heightMod)),
    stamina: Math.min(10, Math.max(1, base.stamina + (bonus.stamina || 0))),
    burst: Math.min(10, Math.max(1, base.burst - heightMod)),
  };
}

export default function ComboBuilder() {
  const [savedCombos, setSavedCombos] = useLocalStorage('beybase_combos', []);
  const [bladeId, setBladeId] = useState('');
  const [ratchetId, setRatchetId] = useState('');
  const [bitId, setBitId] = useState('');
  const [comboName, setComboName] = useState('');
  const [view, setView] = useState('build'); // 'build' | 'saved'

  const blade = KNOWN_BLADES.find(b => b.id === bladeId);
  const ratchet = KNOWN_RATCHETS.find(r => r.id === ratchetId);
  const bit = KNOWN_BITS.find(b => b.id === bitId);
  const stats = computeStats(blade, ratchet, bit);

  function handleSave() {
    if (!bladeId || !ratchetId || !bitId) return;
    setSavedCombos(prev => [{
      id: Date.now().toString(),
      name: comboName || `${blade?.name} ${ratchet?.name} ${bit?.name}`,
      bladeId, ratchetId, bitId,
      savedAt: new Date().toISOString(),
    }, ...prev]);
    setComboName('');
  }

  function handleDelete(id) {
    setSavedCombos(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-black text-white mb-1">Combo Builder</h1>
        <div className="flex gap-2 mt-3">
          {['build', 'saved'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                view === v ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              {v === 'build' ? 'Builder' : `Saved (${savedCombos.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {view === 'build' ? (
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Blade</label>
                <div className="grid grid-cols-2 gap-2">
                  {KNOWN_BLADES.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBladeId(b.id)}
                      className={`text-left px-3 py-2 rounded-xl border text-sm transition-colors ${
                        bladeId === b.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                          : 'bg-gray-800 border-gray-700 text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{b.name}</div>
                      <div className={`text-xs mt-0.5 font-semibold ${
                        b.type === 'Attack' ? 'text-red-400' :
                        b.type === 'Defense' ? 'text-blue-400' :
                        b.type === 'Stamina' ? 'text-green-400' : 'text-yellow-400'
                      }`}>{b.type}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Ratchet</label>
                <div className="grid grid-cols-3 gap-2">
                  {KNOWN_RATCHETS.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setRatchetId(r.id)}
                      className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
                        ratchetId === r.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                          : 'bg-gray-800 border-gray-700 text-gray-300'
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Bit</label>
                <div className="grid grid-cols-2 gap-2">
                  {KNOWN_BITS.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBitId(b.id)}
                      className={`text-left px-3 py-2 rounded-xl border text-sm transition-colors ${
                        bitId === b.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                          : 'bg-gray-800 border-gray-700 text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{b.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {stats && (
              <div className="bg-gray-900 border border-blue-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-sm">Combo Stats</h3>
                  {blade && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${TYPE_BG[blade.type]}`}>
                      {blade.type}
                    </span>
                  )}
                </div>
                <StatBar label="Attack" value={stats.attack} color="bg-red-500" />
                <StatBar label="Defense" value={stats.defense} color="bg-blue-500" />
                <StatBar label="Stamina" value={stats.stamina} color="bg-green-500" />
                <StatBar label="Burst Resistance" value={stats.burst} color="bg-yellow-500" />

                <div className="pt-2 border-t border-gray-800 space-y-2">
                  <input
                    type="text"
                    value={comboName}
                    onChange={e => setComboName(e.target.value)}
                    placeholder={`${blade?.name} ${ratchet?.name} ${bit?.name}`}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Save Combo
                  </button>
                </div>
              </div>
            )}

            {!blade && !ratchet && !bit && (
              <div className="flex flex-col items-center justify-center h-24 text-center">
                <p className="text-gray-600 text-sm">Select parts above to preview stats</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {savedCombos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="text-5xl mb-3">⚡</div>
                <p className="text-gray-500 text-sm">No saved combos yet.\nBuild one and save it!</p>
              </div>
            ) : (
              savedCombos.map(combo => {
                const b = KNOWN_BLADES.find(x => x.id === combo.bladeId);
                const r = KNOWN_RATCHETS.find(x => x.id === combo.ratchetId);
                const bt = KNOWN_BITS.find(x => x.id === combo.bitId);
                const s = computeStats(b, r, bt);
                return (
                  <div key={combo.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-white">{combo.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{b?.name} · {r?.name} · {bt?.name}</p>
                      </div>
                      {b && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${TYPE_BG[b.type]}`}>
                          {b.type}
                        </span>
                      )}
                    </div>
                    {s && (
                      <div className="space-y-2">
                        <StatBar label="ATK" value={s.attack} color="bg-red-500" />
                        <StatBar label="DEF" value={s.defense} color="bg-blue-500" />
                        <StatBar label="STA" value={s.stamina} color="bg-green-500" />
                      </div>
                    )}
                    <button
                      onClick={() => handleDelete(combo.id)}
                      className="mt-3 text-xs text-gray-600 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
