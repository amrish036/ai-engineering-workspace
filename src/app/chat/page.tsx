'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatPage() {
  const [question, setQuestion] = useState('');

  const [messages, setMessages] = useState<
    {
      role: 'user' | 'assistant';
      content: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  async function askQuestion() {
    if (!question.trim()) return;

    setLoading(true);

    const userQuestion = question;

    setQuestion('');

    // Add user + assistant placeholder together
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userQuestion,
      },
      {
        role: 'assistant',
        content: '',
      },
    ]);

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

    setLoading(false);
  }

  return (
    <main className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">AI Engineering Workspace</h1>

        <p className="text-sm text-gray-500 mt-1">Repository-aware AI assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-5 py-4 max-w-3xl shadow-sm ${
                  message.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black'
                }`}
              >
                <ReactMarkdown
                  components={{
                    code(props) {
                      const { children, className } = props;

                      const match = /language-(\w+)/.exec(className || '');

                      return match ? (
                        <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div">
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">{children}</code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            placeholder="Ask about your repository..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                askQuestion();
              }
            }}
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="bg-black text-white px-6 rounded-xl hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </div>
    </main>
  );
}
