import { useEffect } from 'react';
import { ChatSession } from '@/types/chat';
import { STORAGE_CONSTANTS } from '@/constants';

function useChatPersistence(sessions: ChatSession[]) {
  useEffect(() => {
    localStorage.setItem(STORAGE_CONSTANTS.STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
  }, [sessions]);
}

export default useChatPersistence;
