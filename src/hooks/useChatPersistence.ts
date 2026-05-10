import { useEffect } from 'react';
import { Message } from '@/types/chat';
import { STORAGE } from '@/constants';

function useChatPersistence(messages: Message[]) {
  useEffect(() => {
    localStorage.setItem(STORAGE.STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages));
  }, [messages]);
}

export default useChatPersistence;
