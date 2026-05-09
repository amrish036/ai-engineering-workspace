'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);

    window.addEventListener('offline', handleOffline);

    // Initial state
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);

      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    <main className="h-screen bg-[#0D1117] text-white flex">
      {/* Header */}
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 bg-[#161B22] flex flex-col h-screen">
        {/* Top */}
        <div className="p-4 border-b border-white/10">
          <h1 className="font-bold text-lg">AI Workspace</h1>

          <button
            className="mt-4 w-full bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-500 transition"
            onClick={() => setMessages([])}
          >
            New Chat
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="bg-[#21262D] border border-white/10 rounded-xl p-3 cursor-pointer hover:bg-[#30363D]">
            <p className="text-sm font-medium truncate">Current Repository Chat</p>

            <p className="text-xs text-gray-500 mt-1">Active session</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 h-[73px] flex items-center px-4 text-xs text-gray-500">
          AI Engineering Workspace
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-[73px] border-b border-white/10 bg-[#161B22] flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-white">Repository Assistant</h1>

            <p className="text-sm text-gray-400">AI-powered codebase understanding</p>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />

            <span className="text-sm text-gray-400">{isOnline ? 'Connected' : 'Offline'}</span>
          </div>
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
                  className={`rounded-2xl px-5 py-4 max-w-3xl shadow-sm ${message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#21262D] text-gray-100 border border-white/5'
                    }`}
                >
                  <div>
                    <ReactMarkdown
                      components={{
                        code(props) {
                          const { children, className } =
                            props;

                          const match =
                            /language-(\w+)/.exec(
                              className || ''
                            );

                          return match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(
                                /\n$/,
                                ''
                              )}
                            </SyntaxHighlighter>
                          ) : (
                            <code className="bg-black/30 px-1 py-0.5 rounded text-sm">
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>

                    {loading &&
                      index === messages.length - 1 &&
                      message.role === 'assistant' && (
                        <span className="cursor">
                          ▋
                        </span>
                      )}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-white/10 h-[73px] bg-[#161B22] flex items-center px-4">
          <div className="w-full max-w-4xl mx-auto flex gap-3">
            <input
              className="flex-1 bg-[#21262D] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-500"
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
              className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-500 disabled:opacity-50 transition"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
