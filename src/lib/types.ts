export type Persona =
  | 'dashboard'
  | 'stock-analysis'
  | 'option-strategy'
  | 'market-news';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: React.ReactNode;
  timestamp: string;
}
