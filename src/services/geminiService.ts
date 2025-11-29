import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const getStagingTip = async (roomDescription: string): Promise<string> => {
  try {
    const ai = getAiClient();

    const prompt = `
      You are an expert in accessible Home Staging...
      The user described: "${roomDescription}".
      Provide one practical, budget-friendly tip...
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { maxOutputTokens: 150, temperature: 0.7 }
    });

    return response.text || "Fallback tip...";
  } catch (error) {
    console.error("Error fetching staging tip:", error);
    return "Fallback tip if API fails...";
  }
};

export const testGeminiKey = async () => {
  try {
    const ai = getAiClient();
    console.log("API key configurada?", !!import.meta.env.VITE_GEMINI_API_KEY);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Say 'Hello World!' in one sentence.",
      config: { maxOutputTokens: 10 }
    });

    console.log("Resposta de teste do Gemini:", response.text);
  } catch (error) {
    console.error("Erro no teste do Gemini:", error);
  }
};
