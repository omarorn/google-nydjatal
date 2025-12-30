
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Feed } from './components/Feed';
import { FamilyTree } from './components/FamilyTree';
import { RelationshipCalc } from './components/RelationshipCalc';
import { Collaborate } from './components/Collaborate';
import { Search } from './components/Search';
import { Settings } from './components/Settings';
import { mockPeople } from './data/mockData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const user = mockPeople.find(p => p.id === '7') || mockPeople[0]; // Ómar Örn

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-32 px-6 md:pl-32 md:pr-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'feed' && <Feed />}
          {activeTab === 'tree' && <FamilyTree />}
          {activeTab === 'calc' && <RelationshipCalc />}
          {activeTab === 'lab' && <Collaborate />}
          {activeTab === 'search' && <Search />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'profile' && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-10">
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    <div className="relative w-48 h-48 p-1 bg-gradient-to-tr from-blue-500 to-pink-500 rounded-full">
                       <div className="w-full h-full rounded-full overflow-hidden bg-black border-4 border-black">
                         <img src={user.avatar} className="w-full h-full object-cover" alt="" />
                       </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-5xl font-black uppercase tracking-tighter">{user.name}</h2>
                    <p className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs">Viking ID #{Math.floor(Math.random() * 900000) + 100000} • {user.famousTitle || 'Member'}</p>
                </div>
                <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
                    <div className="glass-card px-8 py-8 rounded-[40px] text-center border-none">
                        <p className="text-4xl font-black tracking-tighter">5</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Kynslóðir</p>
                    </div>
                    <div className="glass-card px-8 py-8 rounded-[40px] text-center border-none">
                        <p className="text-4xl font-black tracking-tighter text-blue-400">18</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Ættingjar</p>
                    </div>
                    <div className="glass-card px-8 py-8 rounded-[40px] text-center border-none">
                        <p className="text-4xl font-black tracking-tighter text-pink-500">1</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Stjórnandi</p>
                    </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-white text-black px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all">Export GEDCOM</button>
                  <button className="glass-card px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-white/5 transition-all">Edit Registry</button>
                </div>
            </div>
          )}
        </div>
      </main>

      {/* Persistent Backdrop Shimmer */}
      <div className="fixed inset-0 -z-50 pointer-events-none opacity-20 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[160px] -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default App;
