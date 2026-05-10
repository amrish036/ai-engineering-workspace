import { UI_CONSTANTS } from '@/constants';

type SidebarProps = {
  clearChat: () => void;
};

function Sidebar({ clearChat }: SidebarProps) {
  return (
    <div className="w-72 border-r border-white/10 bg-[#161B22] flex flex-col h-screen">
      {/* Top */}
      <div className="p-4 border-b border-white/10">
        <h1 className="font-bold text-lg">{UI_CONSTANTS.SIDEBAR_HEADER}</h1>

        <button
          className="mt-4 w-full bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-500 transition"
          onClick={clearChat}
        >
          {UI_CONSTANTS.NEW_CHAT_BUTTON}
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="bg-[#21262D] border border-white/10 rounded-xl p-3 cursor-pointer hover:bg-[#30363D] transition">
          <p className="text-sm font-medium truncate">Current Repository Chat</p>

          <p className="text-xs text-gray-500 mt-1">{UI_CONSTANTS.ACTIVE_SESSION}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 h-[73px] flex items-center px-4 text-xs text-gray-500">
        {UI_CONSTANTS.APP_NAME}
      </div>
    </div>
  );
}

export default Sidebar;
