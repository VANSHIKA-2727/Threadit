import { useEffect, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, MessagesSquare } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const contentMotion = {
  initial: { opacity: 0, x: 14 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.22, ease },
};

const ChatPanel = forwardRef(function ChatPanel({ open, onClose, buttonRef }, ref) {
  const [chatView, setChatView] = useState("empty");
  const [usernames, setUsernames] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const t = e.target;
      if (ref?.current?.contains(t)) return;
      if (buttonRef?.current?.contains(t)) return;
      onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose, ref, buttonRef]);

  if (typeof document === "undefined") return null;

  const canCreate = usernames.trim().length > 0;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="chat-overlay"
            type="button"
            aria-label="Close chat panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-[99] bg-black/30 dark:bg-black/50"
            onClick={onClose}
          />
          <motion.aside
            key="chat-panel"
            ref={ref}
            role="dialog"
            aria-label="Chats"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease }}
            className="fixed bottom-6 right-6 z-[100] flex h-[500px] w-[550px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#1a1a1a]"
           
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 px-3 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Chat</span>
              <div className="flex items-center gap-0.5">
                
                <motion.button
                  type="button"
                  aria-label="Expand"
                  title="Expand"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100"
                >
                  <Maximize2 size={18} strokeWidth={1.75} />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Close"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100"
                >
                  <X size={20} strokeWidth={1.75} />
                </motion.button>
              </div>
            </header>

            <div className="flex min-h-0 flex-1">
              <nav className="flex w-[100px] shrink-0 flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-[#141414] sm:w-[118px]">
                <p className="border-b border-gray-200 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  Chats
                </p>
                <div className="p-1">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setChatView("messages")}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-medium transition-colors duration-200 ${
                      chatView !== "empty"
                        ? "bg-white text-gray-900 shadow-sm dark:bg-[#1a1a1a] dark:text-gray-100"
                        : "text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <MessagesSquare size={14} className="shrink-0 opacity-70" aria-hidden />
                    <span className="truncate">Threads</span>
                  </motion.button>
                </div>
              </nav>

              <div className="relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-[#1a1a1a]">
                <AnimatePresence mode="wait">
                  {chatView === "empty" && (
                    <motion.div
                      key="empty"
                      {...contentMotion}
                      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                    >
                      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        You don&apos;t have any threads yet
                      </h2>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        When you do, they&apos;ll show up here.
                      </p>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setChatView("messages")}
                        className="mt-6 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                      >
                        Go to messages
                      </motion.button>
                    </motion.div>
                  )}

                  {chatView === "messages" && (
                    <motion.div
                      key="messages"
                      {...contentMotion}
                      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                    >
                      <MessagesSquare
                        size={40}
                        strokeWidth={1.25}
                        className="mb-4 text-gray-300 dark:text-gray-600"
                        aria-hidden
                      />
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Welcome to chat!</p>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        Start a direct or group chat with other users.
                      </p>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setChatView("create")}
                        className="mt-6 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                      >
                        Start new chat
                      </motion.button>
                    </motion.div>
                  )}

                  {chatView === "create" && (
                    <motion.div
                      key="create"
                      {...contentMotion}
                      className="absolute inset-0 flex flex-col px-5 py-6"
                    >
                      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Create Chat</h2>
                      <label htmlFor="chat-usernames" className="sr-only">
                        Usernames
                      </label>
                      <input
                        id="chat-usernames"
                        value={usernames}
                        onChange={(e) => setUsernames(e.target.value)}
                        placeholder="Type username(s)"
                        className="mt-4 w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:placeholder:text-gray-500"
                      />
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Search for people by username to chat with them.
                      </p>
                      <div className="mt-auto flex justify-end gap-2 pt-8">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setChatView("messages")}
                          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="button"
                          disabled={!canCreate}
                          whileHover={canCreate ? { scale: 1.03 } : {}}
                          whileTap={canCreate ? { scale: 0.98 } : {}}
                          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Create
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
});

ChatPanel.displayName = "ChatPanel";

export default ChatPanel;
