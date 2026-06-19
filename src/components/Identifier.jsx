import { useState } from 'react';
import { KNOWN_BLADES, KNOWN_RATCHETS, KNOWN_BITS, TYPE_BG } from '../data/beyblades';

function searchBeyblades(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const bladeMatches = KNOWN_BLADES.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.type.toLowerCase().includes(q) ||
    b.series.toLowerCase().includes(q)
  );

  const bitMatches = KNOWN_BITS.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.type.toLowerCase().includes(q) ||
    b.description.toLowerCase().includes(q)
  );

  const ratchetMatches = KNOWN_RATCHETS.filter(r =>
    r.name.toLowerCase().includes(q)
  );

  return { bladeMatches, bitMatches, ratchetMatches };
}

const PART_TIPS = [
  { icon: '🔵', label: 'Blade', tip: 'The spinning disc — has the Beyblade name on it (e.g. "Dranzer", "Phoenix Wing")' },
  { icon: '⚙️', label: 'Ratchet', tip: 'Shows two numbers like "3-60" or "5-80". First is prong count, second is height.' },
  { icon: '📍', label: 'Bit', tip: 'The bottom point — look for names like "Flat", "Ball", "Needle", or "Point".' },
];

function ResultSection({ title, items, renderItem, color }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}>{title}</h3>
      <div className="space-y-2">
        {items.map(renderItem)}
      </div>
    </div>
  );
}

export default function Identifier() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const results = submitted ? searchBeyblades(submitted) : null;
  const hasResults = results && (
    results.bladeMatches.length > 0 ||
    results.bitMatches.length > 0 ||
    results.ratchetMatches.length > 0
  );

  function handleSearch(e) {
    e.preventDefault();
    setSubmitted(query.trim());
  }

  function handleClear() {
    setQuery('');
    setSubmitted('');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-black text-white mb-1">Identifier</h1>
        <p className="text-gray-500 text-sm mb-4">Identify parts by name, type, or description</p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='e.g. "flat" or "dranzer" or "attack"'
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
          />
          {submitted ? (
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-800 text-gray-300 font-bold px-4 py-3 rounded-xl text-sm transition-colors"
            >
              Clear
            </button>
          ) : (
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-3 rounded-xl text-sm transition-colors"
            >
              Search
            </button>
          )}
        </form>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {!submitted && (
          <>
            <div className="bg-gray-900 border border-red-500/20 rounded-2xl p-4">
              <h3 className="text-red-400 font-bold text-sm mb-3">How to identify parts</h3>
              <div className="space-y-3">
                {PART_TIPS.map(tip => (
                  <div key={tip.label} className="flex gap-3">
                    <span className="text-xl">{tip.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{tip.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <h3 className="text-gray-300 font-bold text-sm mb-3">Search by type</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Attack', 'Defense', 'Stamina', 'Balance'].map(type => (
                  <button
                    key={type}
                    onClick={() => { setQuery(type); setSubmitted(type); }}
                    className={`py-2.5 rounded-xl font-semibold text-sm border transition-colors ${TYPE_BG[type]}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {submitted && !hasResults && (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-400 text-sm font-medium">No results for "{submitted}"</p>
            <p className="text-gray-600 text-xs mt-1">Try a blade name, type, or part description</p>
          </div>
        )}

        {hasResults && (
          <>
            <p className="text-gray-500 text-xs">
              Results for <span className="text-white font-medium">"{submitted}"</span>
            </p>

            <ResultSection
              title="Blades"
              items={results.bladeMatches}
              color="text-red-400"
              renderItem={blade => (
                <div key={blade.id} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{blade.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Series {blade.series}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${TYPE_BG[blade.type]}`}>
                      {blade.type}
                    </span>
                  </div>
                </div>
              )}
            />

            <ResultSection
              title="Ratchets"
              items={results.ratchetMatches}
              color="text-orange-400"
              renderItem={ratchet => (
                <div key={ratchet.id} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-white">{ratchet.name}</p>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-lg">
                      Height {ratchet.height}
                    </span>
                  </div>
                </div>
              )}
            />

            <ResultSection
              title="Bits"
              items={results.bitMatches}
              color="text-pink-400"
              renderItem={bit => (
                <div key={bit.id} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-white">{bit.name}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${TYPE_BG[bit.type]}`}>
                      {bit.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{bit.description}</p>
                </div>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
