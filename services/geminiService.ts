import { GoogleGenAI, Type } from "@google/genai";
import { StyleSettings, FontFamily } from "../types";
import { FONT_OPTIONS, DEFAULT_SETTINGS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function suggestStyles(text: string): Promise<Partial<StyleSettings>> {
  if (!text || text.trim().length === 0) return {};

  const fontNames = FONT_OPTIONS.map(f => f.name).join(', ');

  const prompt = `
    Analyze the following text sample (which may be English, Chinese, or mixed).
    Determine the sentiment, genre (e.g., technical, poetic, novel, news), and language dominance.
    
    Based on this analysis, suggest the optimal CSS typography settings to maximize readability and aesthetic appeal matching the content's mood.
    
    Available Fonts: ${fontNames}.
    
    Return a JSON object matching the following schema rules:
    - fontFamily: Must be one of the values corresponding to the Available Fonts names provided.
    - color: A hex color string for the text (ensure high contrast with background).
    - backgroundColor: A hex color string for the background.
    - fontSize: Number (14 to 24).
    - lineHeight: Number (1.4 to 2.2).
    - letterSpacing: Number (-1 to 3).
    - paragraphSpacing: Number (1 to 3, represents em).
    - paddingHorizontal: Number (20 to 120).
    - paddingVertical: Number (40 to 150).
    - fontWeight: String ("300", "400", "600", "700").

    Text Sample:
    "${text.substring(0, 1000)}..."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fontFamily: { type: Type.STRING },
            color: { type: Type.STRING },
            backgroundColor: { type: Type.STRING },
            fontSize: { type: Type.NUMBER },
            lineHeight: { type: Type.NUMBER },
            letterSpacing: { type: Type.NUMBER },
            paragraphSpacing: { type: Type.NUMBER },
            paddingHorizontal: { type: Type.NUMBER },
            paddingVertical: { type: Type.NUMBER },
            fontWeight: { type: Type.STRING },
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // Map the font name back to the actual font-family value string if possible
    let suggestedFontValue = DEFAULT_SETTINGS.fontFamily;
    if (result.fontFamily) {
        // AI might return the name "Inter (Sans)", we need the value
        const match = FONT_OPTIONS.find(f => f.name.includes(result.fontFamily) || result.fontFamily.includes(f.name));
        if (match) {
            suggestedFontValue = match.value;
        }
    }

    return {
      ...result,
      fontFamily: suggestedFontValue,
    };

  } catch (error) {
    console.error("Gemini optimization failed:", error);
    throw error;
  }
}