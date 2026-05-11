'use client';

import { ChatHeader, ChatInput, Sidebar, ChatMessages, Modal } from '@/components';
import { CHAT_CONSTANTS } from '@/constants';

import { useOnlineStatus, useAutoScroll, useChat, useRepositoryImport } from '@/hooks';
import { useState } from 'react';

export default function ChatPage() {
  const {
    question,
    setQuestion,
    loading,
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createNewChat,
    askQuestion,
  } = useChat();

  const messagesEndRef = useAutoScroll(activeSession?.messages);
  const isOnline = useOnlineStatus();

  const [showImportModal, setShowImportModal] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');

  const { importingRepo, handleImportRepository } = useRepositoryImport({
    onSuccess() {
      setShowImportModal(false);

      setRepoUrl('');
    },
  });

  return (
    <main className="h-screen bg-[#0D1117] text-white flex">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        setActiveSessionId={setActiveSessionId}
        createNewChat={createNewChat}
        openImportModal={() => setShowImportModal(true)}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader isOnline={isOnline} />

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {activeSession?.messages.map((message, index) => (
              <ChatMessages
                key={message.id}
                role={message.role}
                content={message.content}
                isStreaming={
                  loading &&
                  index === activeSession.messages.length - 1 &&
                  message.role === 'assistant'
                }
              />
            ))}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput
          question={question}
          setQuestion={setQuestion}
          askQuestion={askQuestion}
          loading={loading}
        />
      </div>
      <Modal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        title={CHAT_CONSTANTS.CHAT_BUTTONS.IMPORT_REPOSITORY}
      >
        <div>
          <label className="block text-sm text-gray-400 mb-2">GitHub Repository URL</label>

          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/vercel/next.js"
            className="w-full bg-[#21262D] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowImportModal(false)}
            className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-[#21262D] transition"
          >
            {CHAT_CONSTANTS.CHAT_BUTTONS.CANCEL}
          </button>

          <button
            onClick={() => handleImportRepository(repoUrl)}
            disabled={importingRepo}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition disabled:opacity-50"
          >
            {importingRepo ? 'Importing...' : 'Import'}
          </button>
        </div>
      </Modal>
    </main>
  );
}
