import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

export default function SearchBar({ onSearch, placeholder = "Search Threadit…" }) {
  const [val, setVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.trim()) onSearch(val);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <HiMagnifyingGlass
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-400 transition"
        size={18}
      />
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all"
      />
      <AnimatePresence>
        {val && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => setVal("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-600 hover:text-gray-300 transition"
          >
            <HiXMark size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}