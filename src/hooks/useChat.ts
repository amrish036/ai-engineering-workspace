import { useEffect, useState } from 'react';
import { ChatSession, Message } from '@/types/chat';

import { CHAT_CONSTANTS, STORAGE_CONSTANTS } from '@/constants';
import { useChatPersistence } from '.';

export function useChat() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('llama-3.3-70b-versatile');

  // Load sessions
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_CONSTANTS.STORAGE_KEYS.CHAT_SESSIONS);

    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) {
        setActiveSessionId(parsed[0].id);
      }
      return;
    }

    const firstSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };

    setSessions([firstSession]);

    setActiveSessionId(firstSession.id);
  }, []);

  // Persist sessions
  useChatPersistence(sessions);

  const activeSession = sessions.find((session) => session.id === activeSessionId);

  function createNewChat() {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: CHAT_CONSTANTS.CHAT_BUTTONS.NEW_CHAT,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    setSessions((prev) => [newSession, ...prev]);

    setActiveSessionId(newSession.id);
  }

  async function askQuestion(question: string, model: string) {
    if (!question.trim() || !activeSessionId) {
      return;
    }

    setLoading(true);

    const userQuestion = question;

    setQuestion('');

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: CHAT_CONSTANTS.ROLE.USER,
      content: userQuestion,
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: CHAT_CONSTANTS.ROLE.ASSISTANT,
      content: '',
    };

    // Add initial messages
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== activeSessionId) {
          return session;
        }

        return {
          ...session,
          title: session.messages.length === 0 ? userQuestion.slice(0, 30) : session.title,
          messages: [...session.messages, userMessage, assistantMessage],
        };
      })
    );

    try {
      const response = await fetch(
        `/api/repo-chat?question=${encodeURIComponent(userQuestion)}&model=${encodeURIComponent(model)}`
      );

      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const result = await reader?.read();

        done = result?.done || false;

        const chunk = decoder.decode(result?.value);

        if (chunk) {
          setSessions((prev) =>
            prev.map((session) => {
              if (session.id !== activeSessionId) {
                return session;
              }

              const updatedMessages = [...session.messages];

              const lastIndex = updatedMessages.length - 1;

              updatedMessages[lastIndex] = {
                ...updatedMessages[lastIndex],
                content: updatedMessages[lastIndex].content + chunk,
              };

              return {
                ...session,
                messages: updatedMessages,
              };
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    question,
    setQuestion,
    loading,
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createNewChat,
    askQuestion,
    selectedModel,
    setSelectedModel,
  };
}

export default useChat;
