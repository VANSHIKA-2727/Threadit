import { motion } from "framer-motion";
import { formatNumber } from "../../utils/Formatnumber";

const AVATAR_BGS = [
  "bg-violet-100 dark:bg-violet-900/35",
  "bg-amber-100 dark:bg-amber-900/35",
  "bg-sky-100 dark:bg-sky-900/35",
  "bg-emerald-100 dark:bg-emerald-900/35",
  "bg-rose-100 dark:bg-rose-900/35",
  "bg-indigo-100 dark:bg-indigo-900/35",
];

export default function CommunityCard({ community, index = 0, joined, onJoinToggle }) {
  const bg = AVATAR_BGS[index % AVATAR_BGS.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a]"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${bg}`}
        aria-hidden
      >
        {community.avatar}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-gray-900 dark:text-gray-100">{community.name}</h3>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{formatNumber(community.members)} members</p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{community.description}</p>
      </div>

      <div className="shrink-0 self-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onJoinToggle?.(community.name)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
            joined
              ? "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-[#2a2a2a]"
              : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          }`}
        >
          {joined ? "Joined" : "Join"}
        </motion.button>
      </div>
    </motion.article>
  );
}
