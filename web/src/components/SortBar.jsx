import { motion } from "framer-motion";

const sorts = [
  { key: "hot", label: "Hot" },
  { key: "new", label: "New" },
  { key: "top", label: "Top" },
];

export default function SortBar({ active, onChange }) {
  return (
    <div className="inline-flex flex-wrap gap-0.5 rounded-lg border border-gray-200 bg-gray-100 p-1 transition-all duration-200 dark:border-gray-800 dark:bg-[#2a2a2a]">
      {sorts.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <motion.button
            key={key}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(key)}
            className={`relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="sortPill"
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-[#3a3a3a]"
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
