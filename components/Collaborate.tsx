
import React, { useState } from 'react';
import { mockPeople } from '../data/mockData';
import { generateAncestralImage, editFamilyPhoto, analyzeHeritagePhoto, narrateSaga } from '../services/geminiService';

export const Collaborate: React.FC = () => {
  const [activeSub, setActiveSub] = useState<'secure' | 'sagas' | 'studio' | 'admin'>('secure');
  
  // State for Studio
  const [genPrompt, setGenPrompt] = useState('');
  const [genSize, setGenSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  
  // State for Sagas
  const [ttsText, setTtsText] = useState('Jón Sigurðsson var leiðtogi sjálfstæðisbaráttu Íslendinga.');
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isNarrating, setIsNarrating] = useState(false);

  // State for Analysis
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerate = async () => {
      setIsGenerating(true);
      try {
          const img = await generateAncestralImage(genPrompt, genSize);
          setGeneratedImage(img);
      } catch (e) {
          alert("Gat ekki búið til mynd.");
      }
      setIsGenerating(false);
  };

  const handleNarrate = async () => {
      setIsNarrating(true);
      try {
          const audio = await narrateSaga(ttsText);
          setAudioSrc(audio);
      } catch (e) {
          alert("Gat ekki lesið upp sögu.");
      }
      setIsNarrating(false);
  };

  const handleAnalyze = async () => {
      setIsAnalyzing(true);
      try {
          // Simulating an image upload by using a static image URL converted to base64 (mock logic for demo)
          // In a real app, we would read the file input
          const mockBase64 = "base64_placeholder_string"; 
          // Since we can't easily fetch and convert CORS images here without a proxy, 
          // we will simulate the delay and result for the UI demo.
          await new Promise(r => setTimeout(r, 2000));
          setAnalysisResult("AI Greining (Gemini Pro Vision): Myndin sýnir hóp fólks í Reykjavík um 1920. Fatnaðurinn bendir til sunnudags klæðnaðar. Stemningin er hátíðleg.");
      } catch (e) {
          console.error(e);
      }
      setIsAnalyzing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-5xl font-black text-gradient uppercase tracking-tighter italic">Family Lab Pro<span className="text-white">.</span></h2>
        <p className="text-gray-400 max-w-xl text-lg font-medium">Advanced collaborative tools for the new generation of saga keepers.</p>
        
        <div className="flex flex-wrap justify-center p-1 bg-white/5 rounded-2xl border border-white/10 gap-1 mt-6">
          {(['secure', 'sagas', 'studio', 'admin'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSub(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeSub === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab === 'secure' && 'Öryggi'}
              {tab === 'sagas' && 'Sögur & Rödd'}
              {tab === 'studio' && 'Myndvinnslustofa'}
              {tab === 'admin' && 'Stjórnun'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeSub === 'secure' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Örugg</span>
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black">QR Kóði Uppfærslur</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Skannaðu QR kóða til að uppfæra fjölskylduupplýsingar með tveggja-þrepa SMS staðfestingu.</p>
               </div>
               <button className="w-full py-4 bg-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all">Sækja QR Kóða</button>
            </div>
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  </div>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Tvöfalt Öryggi</span>
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black">SMS með Tvískipt Staðfestingu</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Sendu uppfærslur með textaskilaboðum með öruggri tveggja-þrepa staðfestingu.</p>
               </div>
               <div className="bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-[10px] text-blue-400">
                  +354 800-TREE > STAT: Sjá breytingar í bið
               </div>
            </div>
          </div>
        )}

        {activeSub === 'sagas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Audio Transcription */}
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-red-500/10 rounded-2xl text-red-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </div>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Gemini 3 Flash</span>
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black">Raddupptökur</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Taktu upp fjölskyldasögur með sjálfvirkri umritun á íslensku.</p>
               </div>
               <button className="w-full py-4 bg-red-600/20 border border-red-500/50 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all text-red-400">Byrja Upptöku</button>
            </div>

            {/* TTS Generation */}
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-pink-500/10 rounded-2xl text-pink-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  </div>
                  <span className="bg-pink-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Gemini 2.5 TTS</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black">Lesa upp sögu</h3>
                  <textarea 
                    value={ttsText}
                    onChange={(e) => setTtsText(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-pink-500"
                    rows={3}
                  />
                  <button 
                    onClick={handleNarrate}
                    disabled={isNarrating}
                    className="w-full py-4 bg-pink-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-500 transition-all disabled:opacity-50"
                  >
                    {isNarrating ? 'Bý til hljóð...' : 'Búa til tal'}
                  </button>
                  {audioSrc && (
                    <div className="bg-white/5 p-4 rounded-xl">
                      <audio controls src={audioSrc} className="w-full h-8" />
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeSub === 'studio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Generation */}
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Nano Banana Pro</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black">Endurskapa Arfleifð</h3>
                  <p className="text-xs text-gray-400">Notaðu Gemini 3 Pro til að búa til myndir af sögulegum atburðum.</p>
                  
                  <textarea 
                    value={genPrompt}
                    onChange={(e) => setGenPrompt(e.target.value)}
                    placeholder="Lýstu atburði, t.d. 'Jón Sigurðsson að tala í Kaupmannahöfn, olíumálverk'"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-yellow-500"
                    rows={3}
                  />
                  
                  <div className="flex gap-2">
                     {['1K', '2K', '4K'].map(size => (
                        <button 
                          key={size}
                          onClick={() => setGenSize(size as any)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${genSize === size ? 'bg-yellow-500 text-black' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                           {size}
                        </button>
                     ))}
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !genPrompt}
                    className="w-full py-4 bg-yellow-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-500 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? 'Teikna...' : 'Búa til mynd'}
                  </button>

                  {generatedImage && (
                     <div className="mt-4 rounded-2xl overflow-hidden border border-white/10">
                        <img src={generatedImage} alt="Generated" className="w-full" />
                     </div>
                  )}
               </div>
            </div>

            {/* Image Editing / Analysis */}
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-green-500/10 rounded-2xl text-green-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Gemini 3 Pro Vision</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black">Greina & Breyta</h3>
                  <div className="w-full aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-dashed border-white/20 cursor-pointer hover:bg-white/10 transition-all">
                     <span className="text-xs font-bold text-gray-500">Hladdu upp mynd</span>
                  </div>
                  
                  <div className="flex gap-2">
                     <button onClick={handleAnalyze} disabled={isAnalyzing} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase hover:bg-white/10 transition-all">
                        {isAnalyzing ? 'Greini...' : 'Greina Mynd'}
                     </button>
                     <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase hover:bg-white/10 transition-all">
                        Breyta (Nano)
                     </button>
                  </div>

                  {analysisResult && (
                      <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                          <p className="text-xs text-green-300">{analysisResult}</p>
                      </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeSub === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Rauntími</span>
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black">Samtíma Breytingar</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Sjáðu hverjir eru að vinna í rauntíma og komdu í veg fyrir árekstra með sjálfvirkri sameiningu.</p>
               </div>
               <div className="flex -space-x-3 overflow-hidden mt-4">
                  {[1,2,3].map(i => <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-black" src={`https://picsum.photos/seed/${i}/32/32`} alt="" />)}
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-black">+4</div>
               </div>
            </div>

            <div className="glass-card p-8 rounded-[40px] space-y-6">
               <div className="flex justify-between items-start">
                  <div className="p-4 bg-gray-500/10 rounded-2xl text-gray-400">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">GDPR</span>
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black">Aukin Persónuvernd</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Nákvæm aðgangsstjórn með GDPR samræmi og hlutverkatengdum heimildum (RBAC).</p>
               </div>
               <button className="w-full py-4 glass hover:bg-white/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all mt-4">Sækja Persónuupplýsingar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
