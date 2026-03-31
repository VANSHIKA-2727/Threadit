import PageTransition from "../components/layout/PageTransition";
import PostFeed from "../components/PostFeed";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { inputBar } from "../utils/uiTheme";
import { useEffect } from "react";

export default function Feed() {
  const listVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  // #region agent log H0
  useEffect(() => {
    fetch("http://127.0.0.1:7919/ingest/0f50aa57-1860-4e52-9d0e-1787b70282fd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "55e717",
      },
      body: JSON.stringify({
        sessionId: "55e717",
        location: "web/src/pages/Feed.jsx:mount",
        hypothesisId: "H0",
        message: "Feed mounted",
        timestamp: Date.now(),
        data: {},
      }),
    }).catch(() => {});
  }, []);
  // #endregion agent log H0

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-3xl space-y-6 transition-all duration-200"
        // #region agent log H1
        onAnimationStart={() => {
          fetch("http://127.0.0.1:7919/ingest/0f50aa57-1860-4e52-9d0e-1787b70282fd", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "55e717",
            },
            body: JSON.stringify({
              sessionId: "55e717",
              location: "web/src/pages/Feed.jsx:onAnimationStart",
              hypothesisId: "H1",
              message: "Main container animation started",
              timestamp: Date.now(),
              data: {},
            }),
          }).catch(() => {});
        }}
        // #endregion agent log H1
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02, y: -3 }}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 dark:border-gray-800 dark:bg-[#1a1a1a]"
        >
          <Link to="/submit" className="min-w-0 flex-1">
            <div
              className={`cursor-text px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 ${inputBar}`}
            >
              What&apos;s on your mind?
            </div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="transition-all duration-200"
          >
            <Link
              to="/submit"
              className="inline-flex shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Post
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="transition-all duration-200"
          // #region agent log H2
          onViewportEnter={() => {
            fetch("http://127.0.0.1:7919/ingest/0f50aa57-1860-4e52-9d0e-1787b70282fd", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "55e717",
              },
              body: JSON.stringify({
                sessionId: "55e717",
                location: "web/src/pages/Feed.jsx:onViewportEnter",
                hypothesisId: "H2",
                message: "List wrapper viewport enter fired",
                timestamp: Date.now(),
                data: {},
              }),
            }).catch(() => {});
          }}
          // #endregion agent log H2
        >
          <PostFeed />
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
