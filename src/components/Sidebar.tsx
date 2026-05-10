import { APP_NAME } from '@/constants/ui';
import { ChatSession } from '@/types/chat';

type SidebarProps = {
  sessions: ChatSession[];
  activeSessionId: string | null;
  setActiveSessionId: (id: string) => void;
  createNewChat: () => void;
};

export default function Sidebar({
  sessions,
  activeSessionId,
  setActiveSessionId,
  createNewChat,
}: SidebarProps) {
  return (
    <div className="w-72 border-r border-white/10 bg-[#161B22] flex flex-col h-screen">
      {/* Top */}
      <div className="p-4 border-b border-white/10">
        <h1 className="font-bold text-lg">{APP_NAME}</h1>

        <button
          className="mt-4 w-full bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-500 transition"
          onClick={createNewChat}
        >
          New Chat
        </button>
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => setActiveSessionId(session.id)}
            className={`w-full text-left border rounded-xl p-3 transition ${activeSessionId === session.id
              ? 'bg-[#30363D] border-blue-500'
              : 'bg-[#21262D] border-white/10 hover:bg-[#30363D]'
              }`}
          >
            <p className="text-sm font-medium truncate">{session.title}</p>
            <p className="text-xs text-gray-500 mt-1">{session.messages.length} messages</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(session.createdAt).toLocaleString()}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 h-[73px] flex items-center px-4 text-xs text-gray-500">
        {APP_NAME}
      </div>
    </div>
  );
}
