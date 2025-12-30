import { Person } from "../types";

// In development, this might point to localhost:8787. In prod, your worker domain.
// Assuming relative path for same-domain proxy or configured base URL.
const API_BASE = (import.meta as any).env.VITE_API_URL || '/api';

// Helper to handle API calls
async function apiCall(endpoint: string, body: any) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    throw error;
  }
}

// --- Text & Reasoning ---

export const getFamilyInsight = async (person: Person, relatives: Person[]) => {
  // Simplified for demo: Re-using relationship logic or creating a specific endpoint
  // For now, we'll keep the relationship logic mostly centralized
  return "Insight generation moving to backend..."; 
};

export const calculateRelationshipAI = async (p1: Person, p2: Person) => {
    try {
      const data = await apiCall('/relationship', { p1, p2 });
      return data.text;
    } catch (error) {
      return "Unable to trace the exact lineage path at this moment.";
    }
};

// --- Images ---

export const generateAncestralImage = async (prompt: string, size: '1K' | '2K' | '4K' = '1K') => {
  try {
    const data = await apiCall('/generate-image', { prompt, size });
    return data.image;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const editFamilyPhoto = async (base64Image: string, prompt: string) => {
  // Placeholder: connect to a specific edit-photo endpoint in worker if implemented
  // For the demo scope, we focused on Generation.
  console.log("Edit requested via API"); 
  return null;
};

export const analyzeHeritagePhoto = async (base64Image: string) => {
  try {
    const data = await apiCall('/analyze-photo', { 
        image: base64Image,
        prompt: "Analyze this historical family photo. Identify the approximate era (clothing/setting), potential location in Iceland, and the mood of the subjects." 
    });
    return data.text;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

// --- Audio & Speech ---

export const transcribeSaga = async (base64Audio: string) => {
    // Placeholder for audio upload endpoint
    return "Transcription service connected to backend.";
};

export const narrateSaga = async (text: string) => {
    try {
        const data = await apiCall('/narrate', { text });
        return data.audio;
    } catch (error) {
        console.error("TTS Error:", error);
        throw error;
    }
};

// --- Maps Grounding ---

export const exploreLocation = async (locationQuery: string) => {
    try {
        const data = await apiCall('/explore-location', { query: locationQuery });
        return data; // formatted as { text: "..." }
    } catch (error) {
        console.error("Maps Error:", error);
        throw error;
    }
};