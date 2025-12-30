
import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [privacyProfile, setPrivacyProfile] = useState('Allir fjölskyldumeðlimir');
  const [toggles, setToggles] = useState({
    birthDate: true,
    location: false,
    photos: true,
    twoFactor: true,
    loginNotify: true
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-32 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Stillingar og Persónuvernd</h2>
        <p className="text-gray-400 font-medium">Stjórnaðu aðgangi, persónuvernd og öryggisveganir</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Persónuverndartjórn */}
        <div className="glass-card p-8 rounded-[40px] space-y-6">
          <div className="flex items-center gap-3 text-orange-400 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <h3 className="text-xl font-black uppercase tracking-tight">Persónuverndartjórn</h3>
          </div>
          
          <div className="space-y-5">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Hver getur séð mitt prófíl?</label>
              <select 
                value={privacyProfile}
                onChange={(e) => setPrivacyProfile(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-orange-500"
              >
                <option>Allir fjölskyldumeðlimir</option>
                <option>Aðeins fullorðnir</option>
                <option>Aðeins stjórnendur</option>
                <option>Enginn</option>
              </select>
            </div>

            {[
              { id: 'birthDate', label: 'Sýna fæðingardag?' },
              { id: 'location', label: 'Sýna núverandi stað?' },
              { id: 'photos', label: 'Leyfa myndir af mér?' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="font-bold text-sm">{item.label}</span>
                <button 
                  onClick={() => toggle(item.id as keyof typeof toggles)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${toggles[item.id as keyof typeof toggles] ? 'bg-orange-500' : 'bg-gray-700'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${toggles[item.id as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notendahlutverk */}
        <div className="glass-card p-8 rounded-[40px] space-y-6">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <h3 className="text-xl font-black uppercase tracking-tight">Notendahlutverk</h3>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center justify-between">
            <span className="font-bold text-green-400">Þitt hlutverk</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-black uppercase">Stjórnandi</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Elísabet Ómarsdóttir', role: 'Ritstjóri' },
              { name: 'Magnús Ómarsson', role: 'Skoðandi' }
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="font-bold text-sm">{user.name}</span>
                <select defaultValue={user.role} className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold focus:outline-none focus:border-purple-500">
                  <option>Stjórnandi</option>
                  <option>Ritstjóri</option>
                  <option>Skoðandi</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Öryggistillingar */}
        <div className="glass-card p-8 rounded-[40px] space-y-6">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <h3 className="text-xl font-black uppercase tracking-tight">Öryggistillingar</h3>
          </div>

          <div className="space-y-4">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="pr-4">
                   <div className="font-bold text-sm">Tvíáfar auðkenning (2FA)</div>
                   <div className="text-[10px] text-gray-400 mt-1">Krefstu SMS staðfestingar fyrir breytingar</div>
                </div>
                <button 
                  onClick={() => toggle('twoFactor')}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${toggles.twoFactor ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${toggles.twoFactor ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">SMS símanúmer</label>
                <input type="text" defaultValue="+354 555-1234" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold tracking-widest focus:outline-none focus:border-blue-500" />
             </div>

             <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="font-bold text-sm">Tilkynningar um innskráningu</div>
                <button 
                  onClick={() => toggle('loginNotify')}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${toggles.loginNotify ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${toggles.loginNotify ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
             </div>
          </div>
        </div>

        {/* GDPR og Gögn */}
        <div className="glass-card p-8 rounded-[40px] space-y-6">
          <div className="flex items-center gap-3 text-pink-400 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h3 className="text-xl font-black uppercase tracking-tight">GDPR og Gögn</h3>
          </div>

          <p className="text-sm text-gray-400">Þú hefur rétt til að stjórna þínum gögnum samkvæmt persónuverndarlögum.</p>

          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center gap-2 transition-all">
               <span className="text-lg">📥</span>
               <span className="text-[10px] font-bold uppercase">Niðurhala gögnum</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center gap-2 transition-all">
               <span className="text-lg">✏️</span>
               <span className="text-[10px] font-bold uppercase">Leiðrétta gögn</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group">
               <span className="text-lg group-hover:scale-110 transition-transform">🗑️</span>
               <span className="text-[10px] font-bold uppercase text-gray-300 group-hover:text-red-400">Eyða mínum gögnum</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex flex-col items-center gap-2 transition-all">
               <span className="text-lg">📊</span>
               <span className="text-[10px] font-bold uppercase">Skoða breytingaskrá</span>
            </button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-center space-y-2">
             <p className="text-xs text-gray-300">Samþykki gefið: <span className="font-bold text-white">30. ágúst 2024</span></p>
             <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors">Endurskoða samþykki</button>
          </div>
        </div>

      </div>
    </div>
  );
};
