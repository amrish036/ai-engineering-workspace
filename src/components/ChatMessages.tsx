import { MarkDownRenderer } from '@/components';

type ChatMessagesProps = {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
};

export default function ChatMessages({ role, content, isStreaming }: ChatMessagesProps) {
    return (
        <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`rounded-2xl px-5 py-4 max-w-3xl shadow-sm ${role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#21262D] text-gray-100 border border-white/5'
                    }`}
            >
                <div>
                    <MarkDownRenderer content={content} />

                    {isStreaming && <span className="cursor">▋</span>}
                </div>
            </div>
        </div>
    );
}
