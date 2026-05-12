import { MarkDownRenderer } from '@/components';
import { CHAT_CONSTANTS } from '@/constants';

type ChatMessagesProps = {
  role:
    | typeof CHAT_CONSTANTS.ROLE.USER
    | typeof CHAT_CONSTANTS.ROLE.ASSISTANT
    | typeof CHAT_CONSTANTS.ROLE.AI;
  content: string;
  isStreaming?: boolean;
  sources?: { file: string }[];
};

export default function ChatMessages({ role, content, isStreaming, sources }: ChatMessagesProps) {
  return (
    <div className={`flex ${role === CHAT_CONSTANTS.ROLE.USER ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-5 py-4 max-w-3xl shadow-sm ${
          role === CHAT_CONSTANTS.ROLE.USER
            ? 'bg-blue-600 text-white'
            : 'bg-[#21262D] text-gray-100 border border-white/5'
        }`}
      >
        <div>
          <MarkDownRenderer content={content} />
          {role === 'assistant' && sources?.length ? (
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-xs text-gray-400 mb-2">Retrieved Files</p>

              <div className="flex flex-wrap gap-2">
                {sources.map((source, index) => (
                  <div
                    key={index}
                    className="text-xs bg-[#161B22] border border-white/10 px-2 py-1 rounded-lg text-gray-300"
                  >
                    {source.file}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {isStreaming && <span className="cursor">▋</span>}
        </div>
      </div>
    </div>
  );
}
