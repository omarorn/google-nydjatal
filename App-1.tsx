
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { familyTreeData } from './data/familyData';
import FamilyTree from './components/FamilyTree';
import { Person } from './types';
import { calculateAge } from './utils/dateUtils';

const App: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isBgLoading, setIsBgLoading] = useState<boolean>(true);
  const [bgError, setBgError] = useState<string | null>(null);

  useEffect(() => {
    const generateTreeBackground = async () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API Key not found.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = "An epic, ancient, sprawling family tree, fantasy style, with glowing branches against a mystical twilight sky. The style should be artistic and beautiful, suitable as a background for a genealogy website. No text or people in the image.";
        
        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
          },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
          const generatedUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
          setBackgroundImage(generatedUrl);
        } else {
          throw new Error("Background image generation failed.");
        }
      } catch (err) {
        console.error("Error generating background:", err);
        setBgError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsBgLoading(false);
      }
    };

    generateTreeBackground();
  }, []);

  const FamilyStatistics: React.FC<{ data: Person }> = ({ data }) => {
    let personCount = 0;
    let totalLifespan = 0;
    let deceasedCount = 0;

    const traverse = (person: Person | undefined) => {
      if (!person) return;
      personCount++;
      if (person.deathDate) {
        const age = calculateAge(person.birthDate, person.deathDate);
        if (age !== null) {
          totalLifespan += age;
          deceasedCount++;
        }
      }
      traverse(person.father);
      traverse(person.mother);
    };

    traverse(data);

    const averageLifespan = deceasedCount > 0 ? (totalLifespan / deceasedCount).toFixed(1) : 'N/A';

    return (
      <div className="absolute top-4 right-4 bg-brand-surface/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg z-30 w-64">
        <h3 className="text-lg font-bold text-brand-primary mb-2">Family Statistics</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-subtle">Ancestors Tracked:</span>
            <span className="font-semibold text-brand-text">{personCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-subtle">Average Lifespan:</span>
            <span className="font-semibold text-brand-text">{averageLifespan} years</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-brand-bg bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-screen bg-black/50 p-4 sm:p-8 overflow-auto">
        {isBgLoading && (
            <div className="absolute inset-0 bg-brand-bg flex flex-col items-center justify-center z-50">
                 <svg className="animate-spin h-10 w-10 text-brand-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-brand-subtle">Generating ancestral background...</p>
            </div>
        )}
        {bgError && (
          <div className="absolute top-4 left-4 bg-red-800/80 text-white p-3 rounded-lg z-50">
            <p>Could not generate background: {bgError}</p>
          </div>
        )}

        <header className="text-center mb-12 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-lg">
            GenoConnect
          </h1>
          <p className="text-brand-subtle mt-2">The Family Tree of Ómar Örn Magnússon</p>
        </header>
        
        <FamilyStatistics data={familyTreeData} />

        <main className="relative flex justify-center items-center w-full min-h-[80vh]">
          <FamilyTree person={familyTreeData} />
        </main>

        <footer className="text-center mt-16 text-brand-subtle text-sm relative z-10">
          <p>A modern genealogy app connecting family history with social presence.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
