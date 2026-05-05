import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
        placeholder="Szukaj w Gazecie Polskiej..."
        className="flex-1 border-2 border-gray-800 px-4 py-2 text-sm bg-white/80 focus:bg-white transition-colors outline-none"
        style={{ fontFamily: "'Times New Roman', serif" }}
      />
      <button className="bg-gray-800 text-white px-6 py-2 text-sm tracking-widest hover:bg-red-800 transition-colors">
        SZUKAJ
      </button>
    </div>
  );
}
