import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ChatMessagesProps = {
  role: 'user' | 'assistant';

  content: string;

  isStreaming?: boolean;
};

export default function ChatMessages({ role, content, isStreaming }: ChatMessagesProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-5 py-4 max-w-3xl shadow-sm ${
          role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-[#21262D] text-gray-100 border border-white/5'
        }`}
      >
        <div>
          <ReactMarkdown
            components={{
              code(props) {
                const { children, className } = props;

                const match = /language-(\w+)/.exec(className || '');

                return match ? (
                  <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-black/30 px-1 py-0.5 rounded text-sm">{children}</code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>

          {isStreaming && <span className="cursor">▋</span>}
        </div>
      </div>
    </div>
  );
}
