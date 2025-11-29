import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    // Safely access process.env to avoid ReferenceError in some browser environments
    const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

/**
 * Generates a quick, accessible home staging tip based on a room description.
 * Uses Gemini Flash for speed and conciseness.
 */
export const getStagingTip = async (roomDescription: string): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // We check for API key indirectly or handle the failure
    // Note: The SDK might not expose the key back, but if the call fails, we catch it.
    
    const prompt = `
      You are an expert in accessible Home Staging, focused on helping everyday people sell their homes.
      The user described the following room or problem: "${roomDescription}".
      
      Provide one (1) practical, budget-friendly, and welcoming tip to improve this environment for sale.
      The tip should be at most 3 sentences long. The tone should be empathetic, reassuring, and professional, without sounding elitist.
      Focus on lighting, decluttering, or neutral colors.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        temperature: 0.7,
      }
    });

    return response.text || "Try removing personal items like photos and collections so buyers can imagine themselves living in the space.";
  } catch (error) {
    console.error("Error fetching staging tip:", error);
    // Fallback message if API fails or key is missing
    return "To brighten the room, try adding a large mirror on the wall opposite the window. This reflects natural light and makes the space feel larger and more welcoming instantly.";
  }
};