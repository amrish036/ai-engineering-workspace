'use client';

import { useState } from 'react';

import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { hopscotch } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatPage() {
  const [question, setQuestion] = useState('');

  const [answer, setAnswer] = useState('');

  const [loading, setLoading] = useState(false);

  async function askQuestion() {
    setLoading(true);

    setAnswer('');

    const response = await fetch(
      `/api/repo-chat?question=${encodeURIComponent(question)}`
    );

    const reader = response.body?.getReader();

    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const result = await reader?.read();

      done = result?.done || false;

      const chunk = decoder.decode(result?.value);

      setAnswer((prev) => prev + chunk);
    }

    setLoading(false);
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Engineering Workspace</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-3 rounded w-full"
          placeholder="Ask about your repository..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askQuestion}
          className="bg-black text-white px-4 rounded"
        >
          Ask
        </button>
      </div>

      {loading && <p>Thinking...</p>}

      {answer && (
        <div className="border rounded p-4 overflow-auto">
          <ReactMarkdown
            components={{
              code(props) {
                const {
                  children,

                  className,
                } = props;

                const match = /language-(\w+)/.exec(className || '');

                return match ? (
                  <SyntaxHighlighter
                    style={hopscotch}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-200 px-1 rounded">{children}</code>
                );
              },
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      )}
    </main>
  );
}
