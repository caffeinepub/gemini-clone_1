import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SquarePen,
  Sun,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { LocalSession } from "../types/chat";
import { useTheme } from "./ThemeProvider";

interface SidebarProps {
  sessions: LocalSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.aside
      data-ocid="sidebar.panel"
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border shrink-0 overflow-hidden",
        "sidebar-collapse-transition",
      )}
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2 h-14 shrink-0">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              className="flex items-center gap-2 flex-1 min-w-0"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400 shrink-0">
                <img
                  src="/assets/generated/gemini-logo-transparent.dim_200x200.png"
                  alt="Gemini"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-semibold text-base gemini-gradient-text truncate">
                Gemini
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <Button
          data-ocid="sidebar.toggle"
          variant="ghost"
          size="icon"
          className={cn(
            "w-8 h-8 shrink-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "mx-auto",
          )}
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </Button>
      </div>

      {/* New Chat */}
      <div
        className={cn("px-3 mb-3 shrink-0", collapsed && "flex justify-center")}
      >
        <Button
          data-ocid="sidebar.new_chat_button"
          onClick={onNewChat}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2.5 text-sm font-medium rounded-xl",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "w-9 h-9 p-0 justify-center",
          )}
          title="New chat"
        >
          <SquarePen size={17} className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden whitespace-nowrap"
              >
                New chat
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <Separator className="bg-sidebar-border/60 mx-3 w-auto" />

      {/* Chat History */}
      <ScrollArea className="flex-1 mt-2">
        <div className="px-2 pb-2 space-y-0.5">
          {!collapsed && sessions.length > 0 && (
            <p className="text-xs font-medium text-sidebar-foreground/40 uppercase tracking-wider px-2 py-1.5 mb-1">
              Recent
            </p>
          )}

          {sessions.length === 0 && !collapsed ? (
            <div
              data-ocid="sidebar.sessions.empty_state"
              className="flex flex-col items-center justify-center py-8 gap-2 text-center"
            >
              <MessageSquare size={24} className="text-sidebar-foreground/30" />
              <p className="text-xs text-sidebar-foreground/40">
                No conversations yet
              </p>
            </div>
          ) : (
            sessions.map((session, i) => {
              const ocid = `sidebar.session.item.${i + 1}`;
              const isActive = session.id === activeSessionId;
              return (
                <button
                  type="button"
                  key={session.id}
                  data-ocid={ocid}
                  onClick={() => onSelectSession(session.id)}
                  title={session.title}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-left transition-colors text-sm",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <MessageSquare size={16} className="shrink-0 opacity-60" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="truncate flex-1"
                      >
                        {session.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>

      <Separator className="bg-sidebar-border/60 mx-3 w-auto" />

      {/* Footer: Theme toggle */}
      <div className={cn("p-3 shrink-0", collapsed && "flex justify-center")}>
        <Button
          data-ocid="theme.toggle"
          variant="ghost"
          onClick={toggleTheme}
          className={cn(
            "w-full justify-start gap-2.5 text-sm rounded-xl",
            "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "w-9 h-9 p-0 justify-center",
          )}
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <Sun size={16} className="shrink-0" />
          ) : (
            <Moon size={16} className="shrink-0" />
          )}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.aside>
  );
}
