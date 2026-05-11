import { CHAT_CONSTANTS } from '@/constants';
import { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-[#161B22] border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">{title}</h2>

          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            {CHAT_CONSTANTS.CHAT_BUTTONS.CLOSE}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
