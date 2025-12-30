
import { GoogleGenAI, Modality } from "@google/genai";

// In production, these headers should be more restrictive
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const ai = new GoogleGenAI({ apiKey: env.API_KEY });

    try {
      // 1. ANCESTRAL IMAGE GENERATION
      if (url.pathname === "/api/generate-image" && request.method === "POST") {
        const { prompt, size } = await request.json();
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: `Historical reconstruction, photorealistic, Icelandic heritage style: ${prompt}` }],
          },
          config: {
            imageConfig: { aspectRatio: "1:1", imageSize: size || "1K" }
          },
        });

        // Extract base64
        let imageBase64 = null;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                imageBase64 = `data:image/png;base64,${part.inlineData.data}`;
                break;
            }
        }

        return new Response(JSON.stringify({ image: imageBase64 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 2. IMAGE ANALYSIS
      if (url.pathname === "/api/analyze-photo" && request.method === "POST") {
        const { image, prompt } = await request.json();
        // Remove data URL prefix if present for the SDK
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
                    { text: prompt || "Analyze this historical family photo." }
                ],
            },
        });

        return new Response(JSON.stringify({ text: response.text }), {
             headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 3. TTS / NARRATION
      if (url.pathname === "/api/narrate" && request.method === "POST") {
        const { text } = await request.json();
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return new Response(JSON.stringify({ 
            audio: base64Audio ? `data:audio/wav;base64,${base64Audio}` : null 
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 4. MAPS GROUNDING
      if (url.pathname === "/api/explore-location" && request.method === "POST") {
        const { query } = await request.json();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Tell me about the historical significance of ${query} in Iceland for a genealogy app.`,
            config: { tools: [{ googleMaps: {} }] },
        });

        return new Response(JSON.stringify({ text: response.text }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 5. RELATIONSHIP CALCULATION
      if (url.pathname === "/api/relationship" && request.method === "POST") {
        const { p1, p2 } = await request.json();
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: `Explain how ${p1.name} (born ${p1.birthDate}) and ${p2.name} (born ${p2.birthDate}) might be related in the context of Icelandic history.`,
            config: { thinkingConfig: { thinkingBudget: 1024 } }
        });
        
        return new Response(JSON.stringify({ text: response.text }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
  }
};
