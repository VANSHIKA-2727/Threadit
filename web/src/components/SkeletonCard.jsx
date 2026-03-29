import { motion } from "framer-motion";

function Block({ className }) {
  return (
    <motion.div
      className={`rounded-lg bg-gray-200 dark:bg-[#2a2a2a] ${className}`}
      animate={{ opacity: [0.55, 0.9, 0.55] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
    />
  );
}

export default function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
      <div className="flex items-center gap-3">
        <Block className="h-9 w-9 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Block className="h-3 w-40" />
          <Block className="h-3 w-24" />
        </div>
      </div>
      <Block className="h-4 w-full" />
      <Block className="h-4 w-4/5" />
      <Block className="h-36 w-full" />
      <div className="flex gap-3 pt-2">
        <Block className="h-9 w-28 rounded-lg" />
        <Block className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}
