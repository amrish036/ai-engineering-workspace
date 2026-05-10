import { DESTRUCTION } from 'dns';

export const SUGGESTED_PROMPTS = [
  'Explain project architecture',
  'How does vector search work?',
  'Show embedding pipeline',
  'Explain database setup',
  'How does repo ingestion work?',
];

export const ROLE = {
  USER: 'user',
  AI: 'ai',
  ASSISTANT: 'assistant',
} as const;

export const CHAT_BUTTONS = {
  CLEAR: 'Clear Chat',
  NEW_CHAT: 'New Chat',
  THINKING: 'Thinking...',
  ASK: 'Ask',
};

export const CHAT_HEADER = {
  HEADER: 'Repository Assistant',
  DESCRIPTION: 'AI-powered codebase understanding',
};

export const CHAT_INPUT_PLACEHOLDER = 'Ask a question about the codebase...';

export default {
  SUGGESTED_PROMPTS,
  ROLE,
  CHAT_BUTTONS,
  CHAT_HEADER,
  CHAT_INPUT_PLACEHOLDER,
} as const;
