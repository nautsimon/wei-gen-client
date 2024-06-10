export interface Message {
    role: 'user' | 'system' | 'assistant';
    content: string;
  }
  
export interface ParentProps {
    updateSession: (session: any) => void;
  }

