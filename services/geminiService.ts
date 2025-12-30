
import { GoogleGenAI, Modality } from "@google/genai";
import { Person } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Text & Reasoning ---

export const getFamilyInsight = async (person: Person, relatives: Person[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, engaging "Fun Fact" or "Lineage Story" for ${person.name}, considering their history and relation to these family members: ${relatives.map(r => r.name).join(', ')}. Keep it under 100 words. Style: Trendy, modern social media vibe.`,
      config: { temperature: 0.7 }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stars are currently aligned for new family discoveries. Stay tuned!";
  }
};

export const calculateRelationshipAI = async (p1: Person, p2: Person) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview", // Upgraded to Pro for complex reasoning
        contents: `Explain how ${p1.name} (born ${p1.birthDate}) and ${p2.name} (born ${p2.birthDate}) might be related in the context of Icelandic history. Provide a creative explanation of their shared heritage.`,
        config: { 
          thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for deeper analysis
        }
      });
      return response.text;
    } catch (error) {
      return "Unable to trace the exact lineage path at this moment.";
    }
};

// --- Images (Nano Banana Series) ---

export const generateAncestralImage = async (prompt: string, size: '1K' | '2K' | '4K' = '1K') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview', // Nano Banana Pro
      contents: {
        parts: [{ text: `Historical reconstruction, photorealistic, Icelandic heritage style: ${prompt}` }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size
        }
      },
    });
    
    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
       if (part.inlineData) {
         return `data:image/png;base64,${part.inlineData.data}`;
       }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const editFamilyPhoto = async (base64Image: string, prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Nano Banana (Flash Image)
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: prompt }
        ],
      },
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
       if (part.inlineData) {
         return `data:image/png;base64,${part.inlineData.data}`;
       }
    }
    return null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};

export const analyzeHeritagePhoto = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Strongest visual reasoning
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Analyze this historical family photo. Identify the approximate era (clothing/setting), potential location in Iceland, and the mood of the subjects." }
        ],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

// --- Audio & Speech ---

export const transcribeSaga = async (base64Audio: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'audio/mp3', data: base64Audio } }, // Assuming mp3/wav
          { text: "Transcribe this Icelandic oral history recording." }
        ],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Transcription Error:", error);
    throw error;
  }
};

export const narrateSaga = async (text: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // Deep, storytelling voice
                    },
                },
            },
        });
        
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            return `data:audio/wav;base64,${base64Audio}`; // Simplified return for browser playback
        }
        return null;
    } catch (error) {
        console.error("TTS Error:", error);
        throw error;
    }
};

// --- Maps Grounding ---

export const exploreLocation = async (locationQuery: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Tell me about the historical significance of ${locationQuery} in Iceland for a genealogy app.`,
            config: {
                tools: [{ googleMaps: {} }],
            },
        });
        return response; // Return full response to extract grounding chunks in UI
    } catch (error) {
        console.error("Maps Error:", error);
        throw error;
    }
};
