
import React, { useRef, useState } from 'react';
import { mockPeople } from '../data/mockData';

export const FamilyTree: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState({
    birthDates: true,
    deathDates: true,
    occupations: false,
    photos: true
  });

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to find person by ID
  const p = (id: string) => mockPeople.find(person => person.id === id) || mockPeople[0];

  return (
    <div className="w-full min-h-[85vh] relative overflow-hidden flex flex-col" ref={containerRef}>
      
      {/* Top Controls Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-2 pb-8 space-y-6 z-20">
         
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
               <h2 className="text-3xl font-black uppercase tracking-tighter">Gagnvirkt Ættartré</h2>
               <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <p className="text-xs font-bold text-green-400 uppercase tracking-widest">2 aðrir notendur skoða trésins</p>
               </div>
            </div>

            <div className="flex flex-wrap gap-2">
               <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                  Endurstilla
               </button>
               <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                  Víkka allt
               </button>
               <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 text-white shadow-lg shadow-blue-500/20">
                  GEDCOM
               </button>
            </div>
         </div>

         {/* View Options Panel */}
         <div className="glass-card p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
             <div className="flex items-center gap-6">
                <span className="text-xs font-black uppercase text-gray-500">Sýna:</span>
                {[
                  { id: 'birthDates', label: 'Fæðingardagar' },
                  { id: 'deathDates', label: 'Dánardagar' },
                  { id: 'photos', label: 'Prófílmyndir' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                     <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${options[opt.id as keyof typeof options] ? 'bg-blue-500 border-blue-500' : 'border-gray-600 group-hover:border-gray-400'}`}>
                        {options[opt.id as keyof typeof options] && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                     </div>
                     <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{opt.label}</span>
                     <input type="checkbox" className="hidden" checked={options[opt.id as keyof typeof options]} onChange={() => toggleOption(opt.id as keyof typeof options)} />
                  </label>
                ))}
             </div>
             
             <div className="flex items-center gap-3">
                 <span className="text-xs font-black uppercase text-gray-500">Dýpt trés:</span>
                 <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold focus:outline-none focus:border-blue-500">
                    <option>5 kynslóðir</option>
                 </select>
             </div>
         </div>
      </div>

      <div className="flex-1 relative overflow-x-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.08),transparent)] pointer-events-none"></div>
        
        <div className="flex flex-col items-center gap-16 relative py-12 min-w-[1000px]">
          {/* Generation 1: Steingrímur & Halldóra */}
          <div className="relative flex gap-12">
            <Node person={p('1')} options={options} />
            <div className="self-center h-[2px] w-12 bg-white/20"></div>
            <Node person={p('2')} options={options} />
            <Line className="h-16 top-full left-1/2 -translate-x-6" /> {/* Offset line */}
          </div>

          {/* Generation 2: Anna Sigurlína + Siblings */}
          <div className="relative">
             <LineHorizontal className="w-[800px] absolute top-0 -translate-y-8 left-1/2 -translate-x-1/2" />
             <div className="flex gap-4 justify-center">
                 <div className="relative flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity">
                    <Line className="h-8 bottom-full" />
                    <Node person={p('4')} options={options} /> {/* Guðrún */}
                 </div>
                 <div className="relative flex flex-col items-center">
                    <Line className="h-8 bottom-full" />
                    <Node person={p('3')} active options={options} /> {/* Anna Sigurlína */}
                    <Line className="h-16 top-full" />
                 </div>
                 <div className="relative flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity">
                    <Line className="h-8 bottom-full" />
                    <Node person={p('5')} options={options} /> {/* Ólína */}
                 </div>
                 <div className="relative flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity">
                    <Line className="h-8 bottom-full" />
                    <Node person={p('15')} options={options} /> {/* Þröstur */}
                 </div>
             </div>
          </div>

          {/* Generation 3: Magnús Örn */}
          <div className="relative">
             <Node person={p('6')} options={options} />
             <Line className="h-16 top-full" />
          </div>

          {/* Generation 4: Ómar Örn + Siblings */}
          <div className="relative">
             <LineHorizontal className="w-[400px] absolute top-0 -translate-y-8 left-1/2 -translate-x-1/2" />
             <div className="flex gap-8 justify-center">
                <div className="relative flex flex-col items-center">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('7')} active options={options} /> {/* Ómar */}
                   <Line className="h-16 top-full" />
                </div>
                <div className="relative flex flex-col items-center opacity-70">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('8')} options={options} /> {/* Anna Kristín */}
                </div>
                <div className="relative flex flex-col items-center opacity-70">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('9')} options={options} /> {/* Guðmundur */}
                </div>
             </div>
          </div>

           {/* Generation 5: Children of Ómar */}
           <div className="relative">
             <LineHorizontal className="w-[300px] absolute top-0 -translate-y-8 left-1/2 -translate-x-1/2" />
             <div className="flex gap-4 justify-center">
                <div className="relative flex flex-col items-center">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('10')} options={options} />
                </div>
                <div className="relative flex flex-col items-center">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('17')} options={options} />
                </div>
                <div className="relative flex flex-col items-center">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('18')} options={options} />
                </div>
                <div className="relative flex flex-col items-center">
                   <Line className="h-8 bottom-full" />
                   <Node person={p('11')} options={options} />
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Node = ({ person, active, options }: { person: any, active?: boolean, options: any }) => (
  <div className={`relative z-10 p-4 rounded-3xl glass-card text-center w-40 hover:scale-110 transition-all cursor-pointer group ${active ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-blue-600/10' : 'bg-black/20'}`}>
    {options.photos && (
      <div className="relative inline-block">
        <img src={person.avatar} className="w-14 h-14 rounded-2xl mx-auto mb-3 border border-white/10 group-hover:rotate-3 transition-transform object-cover" alt="" />
        {active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>}
      </div>
    )}
    <h4 className="font-black text-xs truncate px-1">{person.name}</h4>
    {options.birthDates && <p className="text-[9px] text-gray-500 mt-1 font-bold">f. {person.birthDate.split('-')[0]}</p>}
    {options.deathDates && person.deathDate && <p className="text-[9px] text-gray-600 font-bold">d. {person.deathDate.split('-')[0]}</p>}
  </div>
);

const Line = ({ className }: { className: string }) => (
  <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 ${className}`}></div>
);

const LineHorizontal = ({ className }: { className: string }) => (
  <div className={`h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 ${className}`}></div>
);
