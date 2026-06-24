import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KNOWN_BLADES, KNOWN_RATCHETS, KNOWN_BITS, BEYBLADE_TYPES, TYPE_BG } from '../data/beyblades';

const FILTERS = ['All', ...BEYBLADE_TYPES];

function resizeImageToDataURL(file, maxPx = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function AddBeyModal({ onAdd, onClose }) {
  const [blade, setBlade] = useState('');
  const [ratchet, setRatchet] = useState('');
  const [bit, setBit] = useState('');
  const [nickname, setNickname] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const fileRef = useRef(null);

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImageToDataURL(file);
      setPhotoUrl(dataUrl);
    } catch {
      // silently skip bad files
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!blade || !ratchet || !bit) return;
    onAdd({
      id: Date.now().toString(),
      bladeId: blade,
      ratchetId: ratchet,
      bitId: bit,
      nickname,
      photoUrl,
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
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Photo (optional)</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            {photoUrl ? (
              <div className="relative">
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => { setPhotoUrl(null); fileRef.current.value = ''; }}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="w-full bg-gray-800 border border-dashed border-gray-600 rounded-xl py-3 text-gray-400 text-sm hover:border-green-500 hover:text-green-400 transition-colors"
              >
                + Add photo
              </button>
            )}
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

const PHOTO_LABELS = ['Side', 'Top'];

function PhotoViewer({ photos, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  return createPortal(
    <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col" onClick={onClose}>
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={photos[idx]}
          alt={PHOTO_LABELS[idx] ?? `Photo ${idx + 1}`}
          className="max-w-full max-h-full rounded-xl object-contain"
          onClick={e => e.stopPropagation()}
        />
      </div>
      {photos.length > 1 && (
        <div className="flex justify-center gap-3 pb-8" onClick={e => e.stopPropagation()}>
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-xl overflow-hidden border-2 transition-colors ${
                i === idx ? 'border-white' : 'border-transparent opacity-50'
              }`}
            >
              <img src={src} alt={PHOTO_LABELS[i] ?? `Photo ${i + 1}`} className="w-16 h-16 object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="text-center text-white/40 text-xs pb-6 pointer-events-none">Tap anywhere to close</p>
    </div>,
    document.body
  );
}

function BeyCard({ item, onDelete }) {
  const [viewerIndex, setViewerIndex] = useState(null);
  const blade = KNOWN_BLADES.find(b => b.id === item.bladeId);
  const ratchet = KNOWN_RATCHETS.find(r => r.id === item.ratchetId);
  const bit = KNOWN_BITS.find(b => b.id === item.bitId);

  const typeBadge = blade ? TYPE_BG[blade.type] : '';

  // blade data photos take priority; fall back to user-uploaded photo
  const photos = blade?.photos?.length
    ? blade.photos
    : item.photoUrl
    ? [item.photoUrl]
    : [];

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {photos.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setViewerIndex(0)}
              className="w-full block"
            >
              <img
                src={photos[0]}
                alt={item.nickname || blade?.name}
                className="w-full h-48 object-cover"
              />
            </button>
            {photos.length > 1 && (
              <div className="absolute bottom-2 right-2 flex gap-1.5">
                {photos.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setViewerIndex(i)}
                    className={`rounded-lg overflow-hidden border-2 transition-colors ${
                      i === 0 ? 'border-white/80' : 'border-white/30'
                    }`}
                  >
                    <img src={src} alt={PHOTO_LABELS[i]} className="w-10 h-10 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="p-4">
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
      </div>
      {viewerIndex !== null && (
        <PhotoViewer
          photos={photos}
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}

const SEED_ENTRY = {
  id: 'seed_knight_shield',
  bladeId: 'knight_shield',
  ratchetId: '3_60',
  bitId: 'ball',
  addedAt: '2026-06-24T00:00:00.000Z',
};

export default function Collection() {
  const [collection, setCollection] = useLocalStorage('beybase_collection', []);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!localStorage.getItem('beybase_seeded_v1')) {
      localStorage.setItem('beybase_seeded_v1', '1');
      setCollection(prev =>
        prev.some(item => item.id === SEED_ENTRY.id) ? prev : [SEED_ENTRY, ...prev]
      );
    }
  }, []);

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
