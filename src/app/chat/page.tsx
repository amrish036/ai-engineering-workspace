'use client';

import { ChatHeader, ChatInput, Sidebar, ChatMessages } from '@/components';

import { useOnlineStatus, useAutoScroll, useChat } from '@/hooks';

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

  return (
    <main className="h-screen bg-[#0D1117] text-white flex">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        setActiveSessionId={setActiveSessionId}
        createNewChat={createNewChat}
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
    </main>
  );
}
