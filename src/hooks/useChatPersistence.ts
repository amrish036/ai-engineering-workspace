import { useEffect } from 'react';
import { Message } from '@/types/chat';

function useChatPersistence(messages: Message[]) {
  useEffect(() => {
    localStorage.setItem('ai-chat-messages', JSON.stringify(messages));
  }, [messages]);
}

export default useChatPersistence;
