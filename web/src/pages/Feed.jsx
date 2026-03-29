import PageTransition from "../components/layout/PageTransition";
import PostFeed from "../components/PostFeed";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { inputBar } from "../utils/uiTheme";

export default function Feed() {
  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-colors duration-200 dark:border-gray-800 dark:bg-[#1a1a1a]"
        >
          <Link to="/submit" className="min-w-0 flex-1">
            <div
              className={`cursor-text px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 ${inputBar}`}
            >
              What&apos;s on your mind?
            </div>
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/submit"
              className="inline-flex shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Post
            </Link>
          </motion.div>
        </motion.div>

        <PostFeed />
      </div>
    </PageTransition>
  );
}
