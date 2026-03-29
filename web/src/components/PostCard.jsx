import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiChatBubbleOvalLeft, HiShare } from "react-icons/hi2";
import { VoteButton } from "./VoteButton";
import { usePosts } from "../context/Postscontext";
import { formatNumber } from "../utils/Formatnumber";

export default function PostCard({ post }) {
  const { vote } = usePosts();
  const [imageExpanded, setImageExpanded] = useState(false);
  const [justShared, setJustShared] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(`${window.location.origin}/post/${post.id}`);
    setJustShared(true);
    setTimeout(() => setJustShared(false), 2000);
  };

  const initial = post.author?.[0]?.toUpperCase() || "?";
  const type = post.type || "text";

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a] dark:hover:shadow-black/30 md:p-5"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-accent-soft text-sm font-semibold text-accent dark:border-gray-700 dark:bg-accent/20">
          {initial}
        </div>
        <div className="min-w-0 flex-1 text-sm">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-gray-500 dark:text-gray-400">
            <Link
              to={`/user/${post.author}`}
              className="font-medium text-gray-900 transition-colors hover:text-accent dark:text-gray-100"
            >
              u/{post.author}
            </Link>
            <span aria-hidden>·</span>
            <span>{post.time}</span>
            {post.community && (
              <>
                <span aria-hidden>·</span>
                <Link
                  to={`/community${post.community.substring(1)}`}
                  className="hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {post.community}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Link to={`/post/${post.id}`} className="group block">
        <h2 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-accent dark:text-gray-100">
          {post.title}
        </h2>
      </Link>

      {type === "link" && post.linkUrl && (
        <a
          href={post.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 block break-all text-sm text-accent hover:underline"
        >
          {post.linkUrl}
        </a>
      )}

      {post.content && (
        <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{post.content}</p>
      )}

      {post.tag && (
        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-block rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 dark:border-gray-700 dark:bg-[#2a2a2a]">
            {post.tag}
          </span>
        </p>
      )}

      {type === "image" && post.image && (
        <button
          type="button"
          onClick={() => setImageExpanded(!imageExpanded)}
          className="mb-4 w-full overflow-hidden rounded-xl border border-gray-200 text-left focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-800"
        >
          <img
            src={post.image}
            alt=""
            className="max-h-[280px] w-full object-cover md:max-h-[320px]"
            style={{ maxHeight: imageExpanded ? "none" : undefined }}
          />
        </button>
      )}

      {type === "video" && post.videoUrl && (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-800 bg-black dark:border-gray-800">
          <video
            controls
            className="max-h-[320px] w-full bg-black object-contain"
            src={post.videoUrl}
            preload="metadata"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-2 dark:border-gray-800">
        <VoteButton
          score={post.votes}
          direction={post.userVote}
          onUpvote={() => vote(post.id, 1)}
          onDownvote={() => vote(post.id, -1)}
          compact
        />

        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100"
        >
          <HiChatBubbleOvalLeft size={18} />
          {formatNumber(post.comments)} comments
        </Link>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
            justShared
              ? "bg-accent-soft/50 text-gray-900 dark:bg-accent/20 dark:text-gray-100"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100"
          }`}
        >
          <HiShare size={18} />
          {justShared ? "Copied" : "Share"}
        </motion.button>
      </div>
    </motion.article>
  );
}
