type ChatInputProps = {
  question: string;

  setQuestion: (question: string) => void;

  askQuestion: () => void;

  loading: boolean;
};

export default function ChatInput({ question, setQuestion, askQuestion, loading }: ChatInputProps) {
  return (
    <div className="border-t border-white/10 h-[73px] bg-[#161B22] flex items-center px-4">
      <div className="w-full max-w-4xl mx-auto flex gap-3">
        <input
          className="flex-1 bg-[#21262D] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-500"
          placeholder="Ask about your repository..."
          value={question}
          disabled={loading}
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
          className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
    </div>
  );
}
