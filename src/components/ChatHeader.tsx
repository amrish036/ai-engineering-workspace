import { useState } from 'react';
import { UI_CONSTANTS, CHAT_CONSTANTS } from '../constants';
import { AI_MODELS } from '@/constants/models';

type ChatHeaderProps = {
  isOnline: boolean;
  selectedModel: string;
  setSelectedModel: (modelId: string) => void;
};

export default function ChatHeader({ isOnline, selectedModel, setSelectedModel }: ChatHeaderProps) {
  return (
    <div className="h-[73px] border-b border-white/10 bg-[#161B22] flex items-center px-6">
      <div className="w-[260px] shrink-0">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
        >
          {AI_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.provider})
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex flex-col items-center text-center">
        <h1 className="text-lg font-semibold text-white">{CHAT_CONSTANTS.CHAT_HEADER.HEADER}</h1>

        <p className="text-sm text-gray-400">{CHAT_CONSTANTS.CHAT_HEADER.DESCRIPTION}</p>
      </div>

      <div className="w-[260px] shrink-0 flex items-center justify-end gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />

        <span className="text-sm text-gray-400">
          {isOnline ? UI_CONSTANTS.ONLINE : UI_CONSTANTS.OFFLINE}
        </span>
      </div>
    </div>
  );
}
