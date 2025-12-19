import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set securely.
const ai = new GoogleGenAI({ apiKey });

export const generateBackupPlan = async (currentLocation: string, weatherCondition: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Unable to generate plan.";
  }

  try {
    const modelId = 'gemini-3-flash-preview'; 
    const prompt = `
      I am currently in Osaka, Japan at or near ${currentLocation}.
      The weather today is ${weatherCondition}.
      My original plan might be affected or I just need an alternative.
      Please suggest 3 specific alternative activities (indoor if raining) nearby.
      Format the response as a simple bulleted list with estimated travel time.
      Keep it concise (under 200 words).
      Reply in Traditional Chinese (Taiwan).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "無法產生備選方案，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線錯誤，無法取得 AI 建議。";
  }
};

export const askTravelAssistant = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured.";
  }

  try {
    const modelId = 'gemini-3-flash-preview';
    const systemInstruction = "You are a helpful travel guide for a group of friends visiting Osaka in January 2026. Keep answers short, practical, and fun. Reply in Traditional Chinese.";
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: question,
      config: {
        systemInstruction: systemInstruction
      }
    });

    return response.text || "我現在有點忙，請稍後再問我！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "發生錯誤，請稍後再試。";
  }
};
