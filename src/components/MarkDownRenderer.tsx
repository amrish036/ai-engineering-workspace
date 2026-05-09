import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type MarkdownRendererProps = {
  content: string;
};

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
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
  );
}

export default MarkdownRenderer;
