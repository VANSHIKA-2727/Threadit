import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";

const heroTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

const bentoContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const bentoCard = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardShadow = "0 2px 12px rgba(31, 41, 51, 0.06)";
const cardShadowHover = "0 14px 44px -12px rgba(31, 41, 51, 0.14)";

const BENTO_ITEMS = [
  {
    key: "explore",
    title: "Explore Communities",
    body: "Search and browse topics people care about right now.",
    action: () => "/explore",
  },
  {
    key: "trending",
    title: "Trending Discussions",
    body: "See what the community is reading and upvoting today.",
    action: () => "/popular",
  },
  {
    key: "create",
    title: "Create Post",
    body: "Share a thought, question, or link in a few calm steps.",
    action: () => "/submit",
  },
  {
    key: "join",
    title: "Join Conversations",
    body: "Comment, vote, and follow threads without the noise.",
    action: () => "/register",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto w-full px-4 md:px-6 flex items-center justify-between py-6 md:py-8"
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-sm">
            <HiSparkles size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold tracking-[0.02em]">Threadit</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 sm:px-4"
          >
            Register
          </button>
        </div>
      </motion.nav>

      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
          className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-16 md:pt-10 md:pb-20 text-center"
        >
          <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.02em] leading-[1.12] text-foreground">
            <span className="block">The calmer home for</span>
            <span className="block mt-1 sm:mt-2">community discussion</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Threadit is a light, editorial space for threads and replies—built for focus, not feeds that shout.
          </p>
          <div className="mt-9 md:mt-10">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm"
            >
              Get started
            </button>
          </div>
        </motion.section>

        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={bentoContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {BENTO_ITEMS.map((item) => (
              <motion.button
                key={item.key}
                type="button"
                variants={bentoCard}
                onClick={() => navigate(item.action())}
                whileHover={{
                  y: -3,
                  boxShadow: cardShadowHover,
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.995 }}
                style={{ boxShadow: cardShadow }}
                className="text-left rounded-xl border border-border bg-surface dark:bg-zinc-900 dark:border-zinc-800 p-5 transition-[box-shadow] duration-200"
              >
                <h2 className="text-lg font-semibold text-foreground dark:text-zinc-100 tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">{item.body}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="py-10 md:py-12 border-t border-border">
        <p className="text-center text-sm text-muted">
          © {year} Threadit. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
