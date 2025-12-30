
import React, { useState, useEffect } from 'react';
import { mockPeople } from '../data/mockData';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing recent searches", e);
      }
    }
  }, []);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    // Prepend new term, remove duplicates, keep top 8
    const newHistory = [term, ...recentSearches.filter(s => s !== term)].slice(0, 8);
    setRecentSearches(newHistory);
    localStorage.setItem('recent_searches', JSON.stringify(newHistory));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveSearch(query);
    }
  };

  const handleSearchClick = () => {
    saveSearch(query);
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    saveSearch(term);
  };

  const filteredPeople = mockPeople.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black uppercase tracking-tighter italic">Search the nation<span className="text-blue-500">.</span></h2>
        <p className="text-gray-400 font-medium">Find relatives across 1,000 years of history.</p>
      </div>

      <div className="relative z-20">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a name, location, or birth year..."
          className="w-full bg-white/5 border border-white/10 rounded-[32px] pl-16 pr-8 py-8 text-xl font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-700 shadow-2xl"
        />
        <div className="absolute right-4 top-4 flex gap-2">
           <button 
             onClick={handleSearchClick}
             className="px-4 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
           >
             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
           </button>
        </div>
      </div>

      {/* Recent Searches (Visible when query is empty) */}
      {!query && recentSearches.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <div className="flex justify-between items-end px-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Nýlegar leitir
               </h3>
               <button onClick={clearHistory} className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-widest transition-colors">Hreinsa</button>
           </div>
           <div className="flex flex-wrap gap-3">
              {recentSearches.map(term => (
                  <button 
                    key={term}
                    onClick={() => handleRecentClick(term)}
                    className="group px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
                  >
                    <span className="text-gray-400 group-hover:text-blue-400">"{term}"</span>
                  </button>
              ))}
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPeople.map(person => (
          <div key={person.id} className="glass-card p-6 rounded-[32px] flex items-center gap-6 group cursor-pointer hover:bg-white/10">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 group-hover:scale-110 transition-transform">
              <img src={person.avatar} className="w-full h-full object-cover" alt={person.name} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-black">{person.name}</h4>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Born {person.birthDate.split('-')[0]} • {person.location}</p>
              <div className="flex gap-2 mt-3">
                 <span className="px-2 py-1 bg-white/5 rounded-md text-[8px] font-black uppercase tracking-widest text-gray-500">Direct Line</span>
                 <span className="px-2 py-1 bg-blue-500/10 rounded-md text-[8px] font-black uppercase tracking-widest text-blue-400">Verified</span>
              </div>
            </div>
            <div className="text-gray-700 group-hover:text-blue-500 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
