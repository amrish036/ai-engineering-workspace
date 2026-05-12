export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  sources?: { file: string }[];
};

export type ChatSession = {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
};
