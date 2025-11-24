import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AiModel } from "../types";

// Helper to convert File to Base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

// 1. Chat Bot
export const createChatSession = (systemInstruction?: string) => {
  const ai = getClient();
  return ai.chats.create({
    model: AiModel.Chat,
    config: {
      systemInstruction: systemInstruction || "You are a helpful assistant for a web development agency.",
    },
  });
};

// 2. Image Analysis
export const analyzeImage = async (file: File, prompt: string): Promise<string> => {
  const ai = getClient();
  const imagePart = await fileToGenerativePart(file);
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: AiModel.Analyze,
    contents: {
      parts: [imagePart, { text: prompt }],
    },
  });

  return response.text || "Не удалось проанализировать изображение.";
};

// 3. Image Editing (Generation based on Image + Text)
export const editImage = async (file: File, prompt: string): Promise<{ text: string; imageUrl?: string }> => {
  const ai = getClient();
  const imagePart = await fileToGenerativePart(file);
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: AiModel.Edit,
    contents: {
      parts: [imagePart, { text: prompt }],
    },
  });

  let imageUrl: string | undefined;
  let text = "";

  // Iterate to find parts
  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      } else if (part.text) {
        text += part.text;
      }
    }
  }

  return { text, imageUrl };
};
