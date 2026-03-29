import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "./PostCard";
import SkeletonCard from "./SkeletonCard";
import SortBar from "./SortBar";
import { usePosts } from "../context/Postscontext";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function PostFeed() {
  const location = useLocation();
  const defaultSort = location.pathname === "/popular" ? "top" : "hot";
  const { posts } = usePosts();
  const [sort, setSort] = useState(defaultSort);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    setSort(defaultSort);
  }, [defaultSort]);

  useEffect(() => {
    if (!initialLoad.current) return;
    const t = setTimeout(() => {
      setLoading(false);
      initialLoad.current = false;
    }, 450);
    return () => clearTimeout(t);
  }, []);

  const sorted = useMemo(() => {
    const list = [...posts];
    if (sort === "hot") {
      return list.sort((a, b) => (a.feedOrder ?? a.id) - (b.feedOrder ?? b.id));
    }
    if (sort === "new") {
      return list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    }
    if (sort === "top") {
      return list.sort((a, b) => b.votes - a.votes);
    }
    return list;
  }, [posts, sort]);

  return (
    <div className="space-y-6">
      <SortBar active={sort} onChange={setSort} />

      {loading ? (
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-24 text-center dark:border-gray-800 dark:bg-[#1a1a1a]"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nothing here yet</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Be the first to post something.</p>
        </motion.div>
      ) : (
        <motion.div
          key={sort}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={listVariants}
          className="space-y-6"
        >
          {sorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
