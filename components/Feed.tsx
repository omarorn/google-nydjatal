
import React, { useState } from 'react';
import { mockFeed, mockPeople } from '../data/mockData';
import { exploreLocation } from '../services/geminiService';

export const Feed: React.FC = () => {
  const [mapQuery, setMapQuery] = useState('');
  const [mapResult, setMapResult] = useState<string | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  const handleMapSearch = async () => {
      if(!mapQuery) return;
      setLoadingMap(true);
      try {
          // This calls Gemini 2.5 Flash with Google Maps tool
          const response = await exploreLocation(mapQuery);
          // Simple extraction of text for demo. In a real app we'd parse groundingChunks.
          setMapResult(response.text || "Engar upplýsingar fundust.");
      } catch (e) {
          setMapResult("Villa við að sækja kortaupplýsingar.");
      }
      setLoadingMap(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto pb-32">
      <div className="lg:col-span-8 space-y-10">
        
        {/* Velkomin Dashboard */}
        <div className="glass-card rounded-[40px] p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
           
           <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Velkomin í Endurbætta Ættartrésforritið</h2>
           <p className="text-gray-400 mb-8 max-w-lg">Uppgotvaðu ættarsögur þínar með nýjustu tækni: AI myndagreining, rödd-leiðsögn og tveggja-þrepa SMS öryggi.</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="text-2xl mb-1">🇮🇸</div>
                 <div className="text-2xl font-black">1000+</div>
                 <div className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Ár af Arfleifð</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
                 <div className="text-2xl font-black">12</div>
                 <div className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Virkir Meðlimir</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="text-2xl mb-1">🤖</div>
                 <div className="text-2xl font-black">95%</div>
                 <div className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">AI Nákvæmni</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="text-2xl mb-1">🔒</div>
                 <div className="text-2xl font-black">100%</div>
                 <div className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">GDPR Samræmi</div>
              </div>
           </div>
           
           <div className="flex gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-white">Skoða Ættartré</button>
              <button className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Hratt uppfærsla</button>
           </div>
        </div>

        {/* Search/Post Header */}
        <div className="glass-card p-6 rounded-[40px] border-none shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-black">
                <img src="https://picsum.photos/seed/user/100" className="w-full h-full object-cover" />
              </div>
            </div>
            <input 
              type="text" 
              placeholder="Hvað er nýtt í þinni ætt?"
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 focus:border-blue-500/50 rounded-2xl px-6 py-3 text-sm font-medium transition-all focus:outline-none"
            />
        </div>

        {mockFeed.map((item) => {
          const person = mockPeople.find(p => p.id === item.personId);
          return (
            <div key={item.id} className="glass-card rounded-[48px] overflow-hidden group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                      <img src={person?.avatar} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h4 className="font-extrabold flex items-center gap-2 tracking-tight">
                        {person?.name}
                        {person?.famous && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                          </div>
                        )}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.timestamp.toLocaleDateString('is-IS')}</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-100 leading-snug font-medium mb-6">{item.content}</p>
              </div>
              {item.type === 'memory' && (
                <div className="px-8 pb-4">
                  <div className="rounded-[32px] overflow-hidden aspect-video">
                    <img src={`https://picsum.photos/seed/${item.id}/1200/800`} className="w-full h-full object-cover" alt="" />
                  </div>
                </div>
              )}
              <div className="px-8 pb-8 pt-4 flex items-center justify-between border-t border-white/5">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> <span className="text-xs">{item.likes}</span></button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> <span className="text-xs">{item.comments}</span></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar: Icelandic Context */}
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card p-8 rounded-[40px] space-y-8 sticky top-32">
           <h3 className="text-xl font-black italic tracking-tighter uppercase">Menningarleg Arfleifð</h3>
           
           {/* Patronymic Tool */}
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <span className="text-lg">🧬</span>
                 <h4 className="font-black text-sm uppercase">Föðurnafn Kerfi með AI</h4>
              </div>
              <p className="text-[11px] text-gray-400">Fylgdu íslenskum nafnahefðum með sjálfvirkri stafsetningaraðstoð.</p>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                 <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Dæmi</p>
                 <p className="text-xs font-medium">Ómar Örn <span className="text-blue-400 font-bold">Magnússon</span> → Elísabet <span className="text-pink-400 font-bold">Ómarsdóttir</span></p>
              </div>
              <button className="w-full py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Staðfesta nafn</button>
           </div>

           {/* Places with GPS - Updated with AI Grounding */}
           <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex items-center gap-2">
                 <span className="text-lg">🗺️</span>
                 <h4 className="font-black text-sm uppercase">Íslenskir Staðir (Smart Map)</h4>
              </div>
              
              <div className="space-y-3">
                  <div className="relative">
                      <input 
                        type="text" 
                        value={mapQuery}
                        onChange={(e) => setMapQuery(e.target.value)}
                        placeholder="Leita að stað eða sögu..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500"
                      />
                      <button 
                         onClick={handleMapSearch}
                         disabled={loadingMap}
                         className="absolute right-2 top-2 p-1 text-gray-400 hover:text-white"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </button>
                  </div>

                  {mapResult && (
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-xs text-blue-200">
                          {mapResult}
                      </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                     {['Reykjavík', 'Akureyri', 'Hafnarfjörður'].map(place => (
                       <button 
                         key={place} 
                         onClick={() => setMapQuery(place)}
                         className="bg-white/5 px-3 py-2 rounded-xl text-[10px] font-bold hover:bg-white/10 transition-all text-left truncate"
                       >
                         📍 {place}
                       </button>
                     ))}
                  </div>
              </div>
           </div>

           {/* Live Calendar */}
           <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex items-center gap-2">
                 <span className="text-lg">📅</span>
                 <h4 className="font-black text-sm uppercase">Íslenska Dagatalið Live</h4>
              </div>
              <div className="space-y-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
                 <div>
                    <p className="text-[9px] text-gray-500 uppercase font-black">Í dag</p>
                    <p className="text-xs font-bold">30. desember 2025</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-gray-500 uppercase font-black">Nafnadagar</p>
                    <p className="text-xs font-bold">Enginn nafnadagur í dag</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-pink-500 uppercase font-black">Næsti hátíðardagur</p>
                    <p className="text-xs font-bold">Nýársdagur (1. Jan)</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
