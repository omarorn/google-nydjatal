
import React, { useState } from 'react';
import { mockPeople } from '../data/mockData';
import { Person } from '../types';
import { calculateRelationshipAI } from '../services/geminiService';

export const RelationshipCalc: React.FC = () => {
  const [person1, setPerson1] = useState<Person | null>(mockPeople.find(p => p.id === '7') || mockPeople[0]); // Ómar Örn
  const [person2, setPerson2] = useState<Person | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!person1 || !person2) return;
    setLoading(true);
    const aiInsight = await calculateRelationshipAI(person1, person2);
    setInsight(aiInsight);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black tracking-tight text-gradient italic">Are we related?</h2>
        <p className="text-gray-400">Discover the invisible threads that connect you to the nation.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        {/* Person 1 Selection */}
        <div className="glass p-8 rounded-[40px] w-full md:w-72 aspect-square flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-500/50 transition-all">
          {person1 ? (
            <>
              <img src={person1.avatar} className="w-24 h-24 rounded-full border-4 border-blue-600/20 mb-4 group-hover:scale-110 transition-transform" alt="" />
              <h3 className="font-bold text-lg">{person1.name}</h3>
              <p className="text-xs text-blue-500 mt-1 uppercase tracking-widest">You</p>
            </>
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </div>
          )}
        </div>

        <div className="text-4xl font-black text-gray-700 select-none">X</div>

        {/* Person 2 Selection */}
        <div className="glass p-8 rounded-[40px] w-full md:w-72 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
          {person2 ? (
            <>
              <img src={person2.avatar} className="w-24 h-24 rounded-full border-4 border-purple-600/20 mb-4" alt="" />
              <h3 className="font-bold text-lg">{person2.name}</h3>
              <button onClick={() => setPerson2(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </>
          ) : (
            <div className="space-y-4 w-full">
              <p className="text-gray-500 text-sm">Select a relative</p>
              <div className="flex flex-wrap justify-center gap-2">
                {mockPeople.slice(0, 5).map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setPerson2(p)}
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-purple-500 transition-colors overflow-hidden"
                  >
                    <img src={p.avatar} alt={p.name} />
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Search database..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleCalculate}
          disabled={!person1 || !person2 || loading}
          className={`px-12 py-4 rounded-full font-black text-lg transition-all ${
            loading ? 'bg-gray-700 animate-pulse' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105 active:scale-95 shadow-xl shadow-purple-500/20'
          }`}
        >
          {loading ? 'Consulting the Sagas...' : 'Trace Ancestry'}
        </button>
      </div>

      {insight && (
        <div className="glass p-8 rounded-[40px] max-w-2xl mx-auto border-purple-500/20 bg-gradient-to-b from-purple-500/5 to-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h4 className="font-bold text-lg text-purple-300 uppercase tracking-tighter">Lineage Insights</h4>
          </div>
          <p className="text-gray-300 leading-relaxed italic font-light text-lg">"{insight}"</p>
        </div>
      )}
    </div>
  );
};
