import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { dummyReports } from '../data/dummy';
import polinesLogo from '../assets/polines.png';

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.trim()
    ? dummyReports.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.location.toLowerCase().includes(query.toLowerCase()) ||
          r.category.toLowerCase().includes(query.toLowerCase())
      )
    : dummyReports;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div
        className="text-white px-5 py-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(to bottom, #1565C0, #1e88e5)', minHeight: '72px' }}
      >
        <button onClick={() => navigate(-1)} className="p-1 text-white">
          <Icon icon="solar:alt-arrow-left-linear" width={24} />
        </button>
        <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center p-1">
          <img src={polinesLogo} alt="Polines" className="w-full h-full object-contain" />
        </div>
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          alt="Profile"
          className="w-11 h-11 rounded-full border-2 border-white/30 object-cover"
        />
      </div>

      {/* Search Input */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 gap-2 shadow-sm">
          <Icon icon="solar:magnifer-linear" width={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for..."
            className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <Icon icon="solar:close-circle-bold" width={18} />
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 divide-y divide-gray-100">
        {filtered.map((r) => (
          <button
            key={r.id}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors text-left"
            onClick={() => navigate(`/report/${r.id}`)}
          >
            <span className="text-sm font-medium text-gray-900">{r.title}</span>
            <Icon icon="solar:arrow-right-up-linear" width={20} className="text-gray-400 shrink-0" />
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <Icon icon="solar:magnifer-linear" width={40} />
            <p className="text-sm">Tidak ada hasil untuk "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
