export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface QuizState {
  step: number;
  projectType: 'landing' | 'corp' | 'shop' | 'system' | null;
  pages: number;
  hasDesign: boolean | null;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AiModel {
  Chat = 'gemini-3-pro-preview',
  Analyze = 'gemini-3-pro-preview',
  Edit = 'gemini-2.5-flash-image'
}
