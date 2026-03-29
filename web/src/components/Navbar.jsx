import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MessageCircle, Menu, X } from "lucide-react";
import { HiMagnifyingGlass, HiUser, HiArrowRightOnRectangle, HiSparkles } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import ChatPanel from "./ChatPanel";
import { useSidebarNav } from "../context/SidebarNavContext";

const DUMMY_NOTIFICATIONS = [
  { id: 1, text: "New comment on your post", time: "2m ago" },
  { id: 2, text: "u/morgan replied to your comment", time: "1h ago" },
  { id: 3, text: "Your post reached 100 upvotes", time: "3h ago" },
  { id: 4, text: "Welcome to Threadit — here’s a quick tip", time: "1d ago" },
  { id: 5, text: "Weekly digest is ready", time: "2d ago" },
];

const notifEase = [0.22, 1, 0.36, 1];

function NotificationsDropdown({ open, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="notifications-panel"
          role="dialog"
          aria-label="Notifications"
          initial={{ opacity: 0, scale: 0.97, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -4 }}
          transition={{ duration: 0.2, ease: notifEase }}
          className="absolute right-0 top-full z-50 mt-2 w-[300px] max-w-[calc(100vw-1.5rem)] origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-[#1a1a1a]"
        >
          <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
          </div>
          <ul className="max-h-[min(320px,50vh)] overflow-y-auto py-1">{children}</ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { mobileOpen, setMobileOpen, closeMobile } = useSidebarNav();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPanelKey, setChatPanelKey] = useState(0);

  const notificationsRef = useRef(null);
  const chatBtnRef = useRef(null);
  const chatPanelRef = useRef(null);

  useEffect(() => {
    if (!notificationsOpen) return;
    const onPointerDown = (e) => {
      if (notificationsRef.current?.contains(e.target)) return;
      setNotificationsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [notificationsOpen]);

  useEffect(() => {
    if (!notificationsOpen && !chatOpen && !menuOpen && !mobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setNotificationsOpen(false);
        setChatOpen(false);
        setMenuOpen(false);
        closeMobile();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [notificationsOpen, chatOpen, menuOpen, mobileOpen, closeMobile]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/search?q=${encodeURIComponent(searchVal)}`);
  };

  const iconBtn =
    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100";

  return (
    <header className="sticky top-0 z-50 flex min-h-14 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-3 transition-all duration-200 dark:border-gray-800 dark:bg-[#0f0f0f]">
      <div className="flex shrink-0 items-center gap-1 sm:gap-0">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a2a2a] sm:hidden`}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
        <Link to="/home" className="flex items-center gap-2 select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <HiSparkles size={16} className="text-white" />
          </div>
          <span className="hidden text-base font-semibold tracking-[0.02em] text-gray-900 dark:text-gray-100 sm:block">
            Threadit
          </span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
        <div className="relative w-full max-w-md">
          <HiMagnifyingGlass
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search Threadit…"
            className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 transition-all duration-200 focus:border-accent/35 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>
      </form>

      <div className="flex min-w-[44px] shrink-0 items-center justify-end gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => navigate("/search")}
          className="rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#2a2a2a] md:hidden"
          aria-label="Search"
        >
          <HiMagnifyingGlass size={20} />
        </button>

        <ThemeToggle />

        {user ? (
          <>
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                className={iconBtn}
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                aria-haspopup="dialog"
                onClick={() => {
                  setNotificationsOpen((o) => !o);
                  setChatOpen(false);
                  setMenuOpen(false);
                }}
              >
                <Bell size={20} strokeWidth={2} />
              </button>
              <NotificationsDropdown open={notificationsOpen}>
                {DUMMY_NOTIFICATIONS.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-900 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-[#2a2a2a]"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <span className="block leading-snug">{n.text}</span>
                      <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{n.time}</span>
                    </button>
                  </li>
                ))}
              </NotificationsDropdown>
            </div>

            <div ref={chatBtnRef}>
              <button
                type="button"
                className={iconBtn}
                aria-label="Open chat"
                aria-expanded={chatOpen}
                onClick={() => {
                  setNotificationsOpen(false);
                  setMenuOpen(false);
                  if (chatOpen) setChatOpen(false);
                  else {
                    setChatPanelKey((k) => k + 1);
                    setChatOpen(true);
                  }
                }}
              >
                <MessageCircle size={20} strokeWidth={2} />
              </button>
            </div>

            <ChatPanel
              key={chatPanelKey}
              ref={chatPanelRef}
              open={chatOpen}
              onClose={() => setChatOpen(false)}
              buttonRef={chatBtnRef}
            />

            <div className="relative ml-0.5">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen((o) => !o);
                  setNotificationsOpen(false);
                  setChatOpen(false);
                }}
                className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-accent/25"
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-accent-soft text-sm font-semibold text-accent dark:border-gray-700 dark:bg-accent/20">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
              </button>

              {menuOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-40 cursor-default"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-[#1a1a1a]">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-900 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-[#2a2a2a]"
                    >
                      <HiUser size={16} /> Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full border-t border-gray-200 px-4 py-2.5 text-left text-sm text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-[#2a2a2a]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <HiArrowRightOnRectangle size={16} /> Sign out
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-3 py-1.5 text-sm text-gray-500 transition-all duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Log in
            </button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/register")}
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Register
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
}
