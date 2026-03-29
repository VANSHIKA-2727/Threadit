import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { usePosts } from "../context/Postscontext";
import PostCard from "../components/PostCard";
import PageTransition from "../components/layout/PageTransition";
import SkeletonCard from "../components/SkeletonCard";
import { COMMUNITIES } from "../utils/Formatnumber";
import { inputBar } from "../utils/uiTheme";

const TRENDING = ["TypeScript", "React 19", "AI tools", "self-hosted", "open source", "homelab"];

const chipParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

const gridParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const gridCard = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("q") || "";
  const [query, setQuery] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);
  const [loading, setLoading] = useState(!!initial);
  const [activeCategory, setActiveCategory] = useState(null);
  const { posts } = usePosts();

  const results = submitted
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(submitted.toLowerCase()) ||
          p.content.toLowerCase().includes(submitted.toLowerCase()) ||
          (p.community?.toLowerCase() || "").includes(submitted.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [submitted]);

  const handleSearch = (q) => {
    const val = q ?? query;
    setSubmitted(val);
    setSearchParams(val ? { q: val } : {});
    if (val) setLoading(true);
    else setLoading(false);
  };

  const applyCategory = (label) => {
    setActiveCategory(label);
    setQuery(label);
    handleSearch(label);
  };

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative">
            <HiMagnifyingGlass
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              size={20}
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search posts, communities…"
              className={`w-full py-3.5 pl-12 pr-12 text-base ${inputBar}`}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSubmitted("");
                    setSearchParams({});
                    setLoading(false);
                    setActiveCategory(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-[#2a2a2a]"
                >
                  <HiXMark size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                  Categories
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={chipParent}
                >
                  {COMMUNITIES.map((c) => (
                    <motion.button
                      key={c.name}
                      type="button"
                      variants={chipItem}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => applyCategory(c.name)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-shadow duration-200 ${
                        activeCategory === c.name
                          ? "border-accent/50 bg-accent-soft/30 text-gray-900 shadow-sm dark:bg-accent/15 dark:text-gray-100"
                          : "border-gray-200 bg-white text-gray-600 shadow-sm hover:border-gray-300 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      {c.name}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                  Trending
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={chipParent}
                >
                  {TRENDING.map((t) => (
                    <motion.button
                      key={t}
                      type="button"
                      variants={chipItem}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => applyCategory(t)}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-shadow duration-200 hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100"
                    >
                      {t}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                  Popular communities
                </h3>
                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={gridParent}
                >
                  {COMMUNITIES.slice(0, 6).map((c) => (
                    <motion.button
                      key={c.name}
                      type="button"
                      variants={gridCard}
                      whileHover={{ y: -4, scale: 1.01, boxShadow: "0 12px 40px -12px rgba(0,0,0,0.15)" }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => applyCategory(c.name)}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-colors duration-200 hover:border-gray-300 dark:border-gray-800 dark:bg-[#1a1a1a] dark:hover:border-gray-700"
                    >
                      <div
                        className="h-10 w-10 shrink-0 rounded-lg border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: `${c.color}22` }}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{c.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{c.members} members</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? "Searching…" : `${results.length} result${results.length !== 1 ? "s" : ""} for `}
                {!loading && <span className="font-medium text-gray-900 dark:text-gray-100">&ldquo;{submitted}&rdquo;</span>}
              </p>

              {loading ? (
                <div className="space-y-6">
                  {[0, 1, 2].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-20 text-center dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">No results</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Try different keywords.</p>
                </div>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  {results.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
