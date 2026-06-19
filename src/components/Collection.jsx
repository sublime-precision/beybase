import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KNOWN_BLADES, KNOWN_RATCHETS, KNOWN_BITS, BEYBLADE_TYPES, TYPE_BG } from '../data/beyblades';

const FILTERS = ['All', ...BEYBLADE_TYPES];

function AddBeyModal({ onAdd, onClose }) {
  const [blade, setBlade] = useState('');
  const [ratchet, setRatchet] = useState('');
  const [bit, setBit] = useState('');
  const [nickname, setNickname] = useState('');

  const selectedBlade = KNOWN_BLADES.find(b => b.id === blade);

  function handleSubmit(e) {
    e.preventDefault();
    if (!blade || !ratchet || !bit) return;
    onAdd({
      id: Date.now().toString(),
      bladeId: blade,
      ratchetId: ratchet,
      bitId: bit,
      nickname,
      addedAt: new Date().toISOString(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-t-2xl w-full p-6 pb-8 border-t border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Add Beyblade</h2>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Blade</label>
            <select
              value={blade}
              onChange={e => setBlade(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Select blade…</option>
              {KNOWN_BLADES.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Ratchet</label>
              <select
                value={ratchet}
                onChange={e => setRatchet(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Select…</option>
                {KNOWN_RATCHETS.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Bit</label>
              <select
                value={bit}
                onChange={e => setBit(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Select…</option>
                {KNOWN_BITS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Nickname (optional)</label>
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="e.g. My battle beast"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-colors"
          >
            Add to Collection
          </button>
        </form>
      </div>
    </div>
  );
}

function BeyCard({ item, onDelete }) {
  const blade = KNOWN_BLADES.find(b => b.id === item.bladeId);
  const ratchet = KNOWN_RATCHETS.find(r => r.id === item.ratchetId);
  const bit = KNOWN_BITS.find(b => b.id === item.bitId);

  const typeBadge = blade ? TYPE_BG[blade.type] : '';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-white text-base leading-tight">
            {item.nickname || blade?.name || 'Unknown'}
          </p>
          {item.nickname && (
            <p className="text-gray-500 text-xs mt-0.5">{blade?.name}</p>
          )}
        </div>
        {blade && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${typeBadge}`}>
            {blade.type}
          </span>
        )}
      </div>
      <div className="flex gap-2 text-xs">
        <span className="bg-gray-800 rounded-lg px-3 py-1.5 text-gray-300">
          {ratchet?.name ?? '—'}
        </span>
        <span className="bg-gray-800 rounded-lg px-3 py-1.5 text-gray-300">
          {bit?.name ?? '—'}
        </span>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="mt-3 text-xs text-gray-600 hover:text-red-400 transition-colors"
      >
        Remove
      </button>
    </div>
  );
}

export default function Collection() {
  const [collection, setCollection] = useLocalStorage('beybase_collection', []);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('All');

  function handleAdd(item) {
    setCollection(prev => [item, ...prev]);
  }

  function handleDelete(id) {
    setCollection(prev => prev.filter(item => item.id !== id));
  }

  const filtered = filter === 'All'
    ? collection
    : collection.filter(item => {
        const blade = KNOWN_BLADES.find(b => b.id === item.bladeId);
        return blade?.type === filter;
      });

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-white">Collection</h1>
            <p className="text-green-400 text-sm">{collection.length} beyblade{collection.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            + Add
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="text-5xl mb-3">🌀</div>
            <p className="text-gray-500 text-sm">
              {collection.length === 0
                ? 'No beyblades yet.\nTap + Add to start your collection.'
                : 'No beyblades match this filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map(item => (
              <BeyCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <AddBeyModal onAdd={handleAdd} onClose={() => setShowAdd(false)} />
      )}
    </div>
  );
}
