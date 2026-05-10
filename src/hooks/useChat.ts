import { useEffect, useState } from 'react';
import { Message } from '@/types/chat';
import { STORAGE } from '@/constants';

export function useChat() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE.STORAGE_KEYS.CHAT_MESSAGES);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  async function askQuestion() {
    if (!question.trim()) return;

    setLoading(true);

    const userQuestion = question;

    setQuestion('');

    setMessages((prev) => [
      ...prev,

      {
        id: crypto.randomUUID(),
        role: 'user',
        content: userQuestion,
      },

      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
      },
    ]);

    try {
      const response = await fetch(`/api/repo-chat?question=${encodeURIComponent(userQuestion)}`);

      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const result = await reader?.read();

        done = result?.done || false;

        const chunk = decoder.decode(result?.value);

        if (chunk) {
          setMessages((prev) => {
            const updated = [...prev];

            const lastIndex = updated.length - 1;

            updated[lastIndex] = {
              ...updated[lastIndex],

              content: updated[lastIndex].content + chunk,
            };

            return updated;
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    localStorage.removeItem(STORAGE.STORAGE_KEYS.CHAT_MESSAGES);
    setMessages([]);
  }

  return {
    question,
    setQuestion,
    loading,
    messages,
    askQuestion,
    clearChat,
  };
}

export default useChat;
