import { createElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  TrendingUp,
  Newspaper,
  Compass,
  UsersRound,
  ListPlus,
  Settings,
  Info,
  CircleHelp,
} from "lucide-react";
import CreateCustomFeedModal from "./CreateCustomFeedModal";
import CreateCommunityModal from "./CreateCommunityModal";
import { useSidebarNav } from "../context/SidebarNavContext";

function SectionLabel({ children }) {
  return (
    <p className="px-3 pt-4 pb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
      {children}
    </p>
  );
}

function NavRow({ to, icon, label, onNavigate }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={() => onNavigate?.()}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-gray-200 text-gray-900 dark:bg-[#2a2a2a] dark:text-gray-100"
          : "text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1a1a1a]"
      }`}
    >
      {createElement(icon, {
        size: 20,
        strokeWidth: 1.75,
        className: "shrink-0 text-gray-500 dark:text-gray-400",
        "aria-hidden": true,
      })}
      <span className="leading-tight">{label}</span>
    </Link>
  );
}

function NavButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1a1a1a]"
    >
      {createElement(icon, {
        size: 20,
        strokeWidth: 1.75,
        className: "shrink-0 text-gray-500 dark:text-gray-400",
        "aria-hidden": true,
      })}
      <span className="leading-tight">{label}</span>
    </button>
  );
}

export default function SideBar({ isOpen = true }) {
  const location = useLocation();
  const exploreActive = location.pathname === "/explore";
  const { mobileOpen, closeMobile } = useSidebarNav();
  const [customFeedOpen, setCustomFeedOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!isOpen) return null;

  const nav = (
    <nav className="space-y-0.5 px-2 pb-2 pt-14 sm:pt-3">
      <SectionLabel>Main</SectionLabel>
      <NavRow to="/home" icon={Home} label="Home" onNavigate={closeMobile} />
      <NavRow to="/popular" icon={TrendingUp} label="Popular" onNavigate={closeMobile} />
      <NavRow to="/news" icon={Newspaper} label="News" onNavigate={closeMobile} />
      <Link
        to="/explore"
        onClick={closeMobile}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          exploreActive
            ? "bg-gray-200 text-gray-900 dark:bg-[#2a2a2a] dark:text-gray-100"
            : "text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1a1a1a]"
        }`}
      >
        <Compass size={20} strokeWidth={1.75} className="shrink-0 text-gray-500 dark:text-gray-400" aria-hidden />
        <span className="leading-tight">Explore</span>
      </Link>
      <NavButton
        icon={UsersRound}
        label="Start a community"
        onClick={() => {
          setCommunityOpen(true);
          closeMobile();
        }}
      />

      <div className="mx-3 my-3 h-px bg-gray-200 dark:bg-gray-700" />

      <SectionLabel>Custom feeds</SectionLabel>
      <NavButton
        icon={ListPlus}
        label="Create Custom Feed"
        onClick={() => {
          setCustomFeedOpen(true);
          closeMobile();
        }}
      />

      <SectionLabel>Communities</SectionLabel>
      <NavRow to="/communities" icon={Settings} label="Manage Communities" onNavigate={closeMobile} />

      <SectionLabel>Resources</SectionLabel>
      <NavRow to="/about" icon={Info} label="About" onNavigate={closeMobile} />
      <NavRow to="/help" icon={CircleHelp} label="Help" onNavigate={closeMobile} />

      <div className="mt-4 border-t border-gray-200 pt-3 dark:border-gray-700">
        <Link
          to="/submit"
          onClick={closeMobile}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-[#1a1a1a]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-lg leading-none text-white">
            +
          </span>
          Create Post
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            key="sidebar-backdrop"
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[38] bg-black/40 sm:hidden dark:bg-black/55"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed bottom-0 left-0 top-0 z-[40] flex h-full w-[min(17.5rem,90vw)] shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 ease-out dark:border-gray-800 dark:bg-[#0f0f0f] sm:relative sm:z-auto sm:w-60 sm:max-w-none sm:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-xl sm:shadow-none" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {nav}
      </aside>

      <CreateCustomFeedModal open={customFeedOpen} onClose={() => setCustomFeedOpen(false)} />
      <CreateCommunityModal open={communityOpen} onClose={() => setCommunityOpen(false)} />
    </>
  );
}
