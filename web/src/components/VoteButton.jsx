import { motion } from "framer-motion";
import { HiArrowUp, HiArrowDown } from "react-icons/hi2";
import { formatNumber } from "../utils/Formatnumber";

export function VoteButton({ score, direction, onUpvote, onDownvote, compact = false }) {
  return (
    <div
      className={`flex ${compact ? "flex-row items-center gap-0.5" : "flex-col items-center gap-0.5"} rounded-lg border border-gray-200 bg-gray-100 p-0.5 dark:border-gray-800 dark:bg-[#2a2a2a]`}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUpvote}
        className={`rounded-md p-1.5 transition-colors ${
          direction === 1
            ? "bg-accent-soft text-accent dark:bg-accent/25"
            : "text-gray-500 hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#3a3a3a] dark:hover:text-gray-100"
        }`}
      >
        <HiArrowUp size={compact ? 16 : 18} />
      </motion.button>

      <span
        className={`min-w-[2rem] px-1 text-center text-xs font-semibold tabular-nums ${
          direction !== 0 ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {formatNumber(score)}
      </span>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onDownvote}
        className={`rounded-md p-1.5 transition-colors ${
          direction === -1
            ? "bg-accent-soft text-accent dark:bg-accent/25"
            : "text-gray-500 hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#3a3a3a] dark:hover:text-gray-100"
        }`}
      >
        <HiArrowDown size={compact ? 16 : 18} />
      </motion.button>
    </div>
  );
}
