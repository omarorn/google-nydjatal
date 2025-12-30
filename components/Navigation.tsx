
import React from 'react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'feed', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Heim' },
    { id: 'tree', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z', label: 'Tré' },
    { id: 'lab', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.283a4 4 0 01-1.48.331c-.308 0-.599-.044-.891-.126a1 1 0 01-.812-1.018l.125-2.023a1 1 0 01.378-.718l2.368-1.9a1 1 0 01.996-.06l2.31 1.055a2 2 0 001.366.11l2.427-.582a2 2 0 001.44-1.154', label: 'Lab' },
    { id: 'search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Leita' },
    { id: 'profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Ég' }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] glass px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-lg shadow-purple-500/20 rotate-3">mF</div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none uppercase">myFamily<span className="text-blue-500">.</span></h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">myx.is Ecosystem</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all ${activeTab === 'settings' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
            title="Stillingar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold transition-all border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            12 Rauntíma
          </button>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-orange-400 p-[1px]">
             <div className="w-full h-full rounded-[15px] overflow-hidden bg-[#050505]">
                <img src="https://picsum.photos/seed/user/100" alt="Profile" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </header>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] glass px-6 py-4 md:hidden border-t border-white/10 pb-8">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                activeTab === tab.id ? 'text-blue-400 scale-110' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={tab.icon} />
              </svg>
            </button>
          ))}
        </div>
      </nav>

      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 flex-col items-center pt-32 pb-12 gap-10 glass z-50 border-r border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-3xl transition-all relative group ${
                activeTab === tab.id ? 'bg-blue-600/10 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.1)] border border-blue-500/20' : 'text-gray-500 hover:text-white'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
              </svg>
              <span className="absolute left-full ml-4 px-3 py-1 bg-white text-black text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          ))}
          <div className="mt-auto flex flex-col items-center gap-6">
             <button 
               onClick={() => setActiveTab('settings')}
               className={`transition-colors ${activeTab === 'settings' ? 'text-white' : 'text-gray-600 hover:text-white'}`}
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             </button>
          </div>
      </nav>
    </>
  );
};
