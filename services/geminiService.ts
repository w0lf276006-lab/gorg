import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateYaldaStory = async (topic: string): Promise<string> => {
  try {
    const client = getClient();
    const prompt = `
      Write a short, engaging, and cute story in Persian (Farsi) for children about "Yalda Night".
      characters: 
      1. Saba: A kind little girl.
      2. Sepand: A cute beige robot who needs electricity to function.
      
      Topic: ${topic}
      
      The story should emphasize friendship, the warmth of family, and a subtle lesson about saving energy (electricity) so Sepand doesn't run out of battery during the long night.
      Keep it under 300 words. Use emojis suitable for kids.
      Format: Plain text.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "متاسفانه نتوانستم داستان را بنویسم. لطفا دوباره تلاش کنید.";
  } catch (error) {
    console.error("Story generation error:", error);
    return "خطا در ارتباط با هوش مصنوعی. لطفا اینترنت خود را بررسی کنید.";
  }
};

export const generateFalHafez = async (): Promise<string> => {
  try {
    const client = getClient();
    const prompt = `
      Act as a wise, kind Persian elder reading Hafez on Yalda night.
      1. Provide one random couplet (Sher) from Hafez.
      2. Provide a playful but wise "Interpretation" (Tabir) tailored for a family setting.
      3. Connect the interpretation playfully to "Light", "Energy", or "Warmth" (referencing Sepand the robot or energy saving).
      
      Output format in Persian (Farsi) JSON:
      {
        "poem": "The poem text...",
        "interpretation": "The interpretation..."
      }
      Return ONLY valid JSON.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Fal generation error:", error);
    return JSON.stringify({ poem: "خطا در دریافت فال", interpretation: "لطفا دوباره نیت کنید." });
  }
};

export const getSepandComment = async (action: string): Promise<string> => {
  try {
    const client = getClient();
    const prompt = `
      You are Sepand, a cute robot. A user just completed this energy-saving task: "${action}".
      Give a very short (one sentence), funny, and happy reaction in Persian thanking them for saving energy (which is your food!).
      Use emojis.
    `;
     const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "ممنون! انرژی من زیاد شد! ⚡";
  } catch (e) {
    return "آخ جون! باتری پر شد! ⚡";
  }
}
