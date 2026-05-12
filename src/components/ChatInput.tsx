import { CHAT_CONSTANTS } from '@/constants';

type ChatInputProps = {
  question: string;

  setQuestion: (question: string) => void;

  askQuestion: (question: string, model: string) => void;

  loading: boolean;

  selectedModel: string;
};

export default function ChatInput({
  question,
  setQuestion,
  askQuestion,
  loading,
  selectedModel,
}: ChatInputProps) {
  return (
    <div className="border-t border-white/10 h-[73px] bg-[#161B22] flex items-center px-4">
      <div className="w-full max-w-4xl mx-auto flex gap-3">
        <input
          className="flex-1 bg-[#21262D] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-500"
          placeholder={CHAT_CONSTANTS.CHAT_INPUT_PLACEHOLDER}
          value={question}
          disabled={loading}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              askQuestion(question, selectedModel);
            }
          }}
        />

        <button
          onClick={() => askQuestion(question, selectedModel)}
          disabled={loading || question.trim() === ''}
          className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? CHAT_CONSTANTS.CHAT_BUTTONS.THINKING : CHAT_CONSTANTS.CHAT_BUTTONS.ASK}
        </button>
      </div>
    </div>
  );
}
