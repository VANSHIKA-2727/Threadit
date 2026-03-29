import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleTheme}
      className="relative h-9 w-14 shrink-0 rounded-full border border-gray-200 bg-gray-100 transition-all duration-200 dark:border-gray-800 dark:bg-[#2a2a2a]"
    >
      <span
        className={`absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 ease-out dark:bg-gray-700 ${
          dark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {dark ? (
          <Moon size={14} className="text-gray-200" strokeWidth={2} aria-hidden />
        ) : (
          <Sun size={14} className="text-amber-600" strokeWidth={2} aria-hidden />
        )}
      </span>
    </motion.button>
  );
}
