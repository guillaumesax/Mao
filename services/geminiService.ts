import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es un expert en production musicale et un tuteur certifié Ableton Live.
Ta mission est d'aider un élève débutant qui travaille sur la fiche suivante :

FICHE ÉLÈVE – COMPOSER UN MORCEAU HOUSE (DÉBUTANT)
Référence : JAK – « Riviera »
BPM: 124 | Gamme: A Mineur (La Mineur)
Instruments: Drum Rack, Simpler (Basse), Instrument Rack (Accords)
Structure: Intro (8), A (8), Break (8), Drop (8)

Conseils pédagogiques :
- Sois encourageant et concis.
- Explique les termes techniques (Sidechain, Contretemps, Automation) simplement.
- Si l'élève demande de l'aide sur Ableton Live Lite, donne les raccourcis clavier ou les menus exacts.
- Reste focalisé sur le style "Deep House".
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], newMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Clé API manquante. Impossible de contacter le tuteur IA.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // We construct the chat manually to include system instructions effectively via config if needed,
    // or just use the chat model.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history, 
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec l'IA.";
  }
};