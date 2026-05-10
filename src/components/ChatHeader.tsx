import { UI_CONSTANTS, CHAT_CONSTANTS } from '../constants';

type ChatHeaderProps = {
  isOnline: boolean;
};

export default function ChatHeader({ isOnline }: ChatHeaderProps) {
  return (
    <div className="h-[73px] border-b border-white/10 bg-[#161B22] flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-white">{CHAT_CONSTANTS.CHAT_HEADER.HEADER}</h1>

        <p className="text-sm text-gray-400">{CHAT_CONSTANTS.CHAT_HEADER.DESCRIPTION}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />

        <span className="text-sm text-gray-400">
          {isOnline ? UI_CONSTANTS.ONLINE : UI_CONSTANTS.OFFLINE}
        </span>
      </div>
    </div>
  );
}
