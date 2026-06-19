import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KNOWN_BLADES, KNOWN_RATCHETS, KNOWN_BITS, TYPE_BG } from '../data/beyblades';

const LISTING_TYPES = ['Trade', 'Sell', 'Buy'];

function PostModal({ onPost, onClose }) {
  const [type, setType] = useState('Trade');
  const [bladeId, setBladeId] = useState('');
  const [ratchetId, setRatchetId] = useState('');
  const [bitId, setBitId] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!bladeId) return;
    const blade = KNOWN_BLADES.find(b => b.id === bladeId);
    const ratchet = KNOWN_RATCHETS.find(r => r.id === ratchetId);
    const bit = KNOWN_BITS.find(b => b.id === bitId);
    onPost({
      id: Date.now().toString(),
      type,
      bladeName: blade?.name ?? bladeId,
      bladeType: blade?.type,
      ratchetName: ratchet?.name,
      bitName: bit?.name,
      price: price || null,
      contact,
      note,
      postedAt: new Date().toISOString(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-t-2xl w-full p-6 pb-8 border-t border-gray-700 max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Post Listing</h2>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">Type</label>
            <div className="flex gap-2">
              {LISTING_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${
                    type === t ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Blade *</label>
            <select
              value={bladeId}
              onChange={e => setBladeId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500"
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
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Ratchet</label>
              <select
                value={ratchetId}
                onChange={e => setRatchetId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500"
              >
                <option value="">Any</option>
                {KNOWN_RATCHETS.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Bit</label>
              <select
                value={bitId}
                onChange={e => setBitId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500"
              >
                <option value="">Any</option>
                {KNOWN_BITS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          {type === 'Sell' && (
            <div>
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Price</label>
              <input
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. $15 or best offer"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Contact</label>
            <input
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="Discord, Instagram, email…"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Note</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Condition, what you're looking for in trade…"
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-colors"
          >
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
}

const TYPE_LABEL = {
  Trade: { bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '🔄' },
  Sell: { bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', icon: '💰' },
  Buy: { bg: 'bg-green-500/20 text-green-300 border-green-500/30', icon: '🛒' },
};

function ListingCard({ listing, onDelete, isOwn }) {
  const typeStyle = TYPE_LABEL[listing.type] ?? TYPE_LABEL.Trade;
  const bladeTypeBadge = listing.bladeType ? TYPE_BG[listing.bladeType] : '';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${typeStyle.bg}`}>
            {typeStyle.icon} {listing.type}
          </span>
          {listing.bladeType && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${bladeTypeBadge}`}>
              {listing.bladeType}
            </span>
          )}
        </div>
        {listing.price && (
          <span className="text-yellow-400 font-bold text-sm">{listing.price}</span>
        )}
      </div>

      <h3 className="font-bold text-white text-base mt-2">{listing.bladeName}</h3>
      {(listing.ratchetName || listing.bitName) && (
        <p className="text-gray-400 text-sm mt-0.5">
          {[listing.ratchetName, listing.bitName].filter(Boolean).join(' · ')}
        </p>
      )}

      {listing.note && (
        <p className="text-gray-500 text-sm mt-2 italic">"{listing.note}"</p>
      )}

      {listing.contact && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">Contact:</span>
          <span className="text-xs text-blue-400 font-medium">{listing.contact}</span>
        </div>
      )}

      {isOwn && (
        <button
          onClick={() => onDelete(listing.id)}
          className="mt-3 text-xs text-gray-600 hover:text-red-400 transition-colors"
        >
          Remove listing
        </button>
      )}
    </div>
  );
}

export default function Marketplace() {
  const [listings, setListings] = useLocalStorage('beybase_listings', []);
  const [showPost, setShowPost] = useState(false);
  const [filterType, setFilterType] = useState('All');

  function handlePost(listing) {
    setListings(prev => [listing, ...prev]);
  }

  function handleDelete(id) {
    setListings(prev => prev.filter(l => l.id !== id));
  }

  const filtered = filterType === 'All'
    ? listings
    : listings.filter(l => l.type === filterType);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-white">Marketplace</h1>
            <p className="text-yellow-400 text-sm">{listings.length} listing{listings.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setShowPost(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            + Post
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {['All', ...LISTING_TYPES].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filterType === f
                  ? 'bg-yellow-500 text-black'
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
            <div className="text-5xl mb-3">🏪</div>
            <p className="text-gray-500 text-sm">
              {listings.length === 0
                ? 'No listings yet.\nPost something to trade or sell!'
                : 'No listings match this filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onDelete={handleDelete}
                isOwn
              />
            ))}
          </div>
        )}
      </div>

      {showPost && (
        <PostModal onPost={handlePost} onClose={() => setShowPost(false)} />
      )}
    </div>
  );
}
