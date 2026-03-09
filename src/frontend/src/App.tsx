import { useCallback, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatView } from "./components/ChatView";
import { HomeScreen } from "./components/HomeScreen";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider } from "./components/ThemeProvider";
import { useCreateSession } from "./hooks/useQueries";
import type { LocalMessage, LocalSession } from "./types/chat";
import { getStaticResponse } from "./utils/staticResponses";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function AppContent() {
  const [sessions, setSessions] = useState<LocalSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const createSessionMutation = useCreateSession();

  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null;

  const handleNewChat = useCallback(() => {
    setActiveSessionId(null);
  }, []);

  const handleSelectSession = useCallback((id: string) => {
    setActiveSessionId(id);
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      const userMsg: LocalMessage = {
        id: generateId(),
        content,
        role: "user",
        timestamp: Date.now(),
      };

      let currentSessionId = activeSessionId;

      if (!currentSessionId) {
        // Create new session
        const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
        const newSessionId = generateId();
        const newSession: LocalSession = {
          id: newSessionId,
          title,
          created: Date.now(),
          messages: [userMsg],
        };
        setSessions((prev) => [newSession, ...prev]);
        setActiveSessionId(newSessionId);
        currentSessionId = newSessionId;

        // Try to persist to backend (fire-and-forget)
        createSessionMutation.mutate(title);
      } else {
        // Add message to existing session
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? { ...s, messages: [...s.messages, userMsg] }
              : s,
          ),
        );
      }

      // Show typing indicator
      setIsTyping(true);

      // Simulate response delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const responseContent = getStaticResponse(content);
      const assistantMsg: LocalMessage = {
        id: generateId(),
        content: responseContent,
        role: "assistant",
        timestamp: Date.now(),
      };

      setIsTyping(false);
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? { ...s, messages: [...s.messages, assistantMsg] }
            : s,
        ),
      );
    },
    [activeSessionId, createSessionMutation],
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {activeSession ? (
          <ChatView
            messages={activeSession.messages}
            isTyping={isTyping}
            onSend={handleSendMessage}
          />
        ) : (
          <div className="flex flex-col h-full">
            <HomeScreen onPromptSelect={handleSendMessage} />
            <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm shrink-0">
              <ChatInput
                onSend={handleSendMessage}
                disabled={isTyping}
                placeholder="Ask Gemini anything..."
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
