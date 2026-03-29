import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  HiArrowLeft,
  HiChatBubbleOvalLeft,
  HiShare,
  HiPaperAirplane,
} from "react-icons/hi2";
import { VoteButton } from "../components/VoteButton";
import { usePosts } from "../context/Postscontext";
import { useAuth } from "../context/AuthContext";
import { formatNumber } from "../utils/Formatnumber";
import PageTransition from "../components/layout/PageTransition";

const DUMMY_COMMENTS = [
  {
    id: 1,
    author: "techguru_x",
    avatar: "TG",
    time: "2 hours ago",
    votes: 342,
    text: "This is absolutely incredible. The attention to detail here is what separates good devs from great ones. Bookmarking this for my next project.",
    replies: [
      { id: 11, author: "devhero_99", avatar: "DH", time: "1 hour ago", votes: 87, text: "Totally agree — the DX improvements alone make it worth it." },
      { id: 12, author: "codewhiz", avatar: "CW", time: "45 min ago", votes: 54, text: "Has anyone tried this with a monorepo setup?" },
    ],
  },
  {
    id: 2,
    author: "opensource_max",
    avatar: "OM",
    time: "3 hours ago",
    votes: 218,
    text: "Would love to see a follow-up post on how you handle edge cases.",
    replies: [],
  },
  {
    id: 3,
    author: "philosophycode",
    avatar: "PC",
    time: "5 hours ago",
    votes: 119,
    text: "The abstraction here is clean. Not over-engineered, not under-engineered.",
    replies: [
      { id: 31, author: "typed_thoughts", avatar: "TT", time: "4 hours ago", votes: 63, text: "Agreed. Most tutorials either over-abstract or leave you with spaghetti." },
    ],
  },
];

function Comment({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localVote, setLocalVote] = useState(0);
  const [score, setScore] = useState(comment.votes);

  const handleVote = (dir) => {
    const delta = dir === localVote ? -dir : dir - localVote;
    setScore((s) => s + delta);
    setLocalVote(dir === localVote ? 0 : dir);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`transition-colors duration-200 ${depth > 0 ? "ml-4 border-l border-gray-200 pl-4 dark:border-gray-700" : ""}`}
    >
      <div className="rounded-lg border border-gray-200 bg-white p-3 transition-colors duration-200 dark:border-gray-800 dark:bg-[#1a1a1a]">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-accent-soft text-xs font-semibold text-accent dark:border-gray-700">
            {comment.avatar}
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">u/{comment.author}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">·</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{comment.time}</span>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-xs text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            [{collapsed ? "+" : "–"}]
          </button>
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="mb-2 text-sm leading-relaxed text-gray-900 dark:text-gray-100">{comment.text}</p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-100 px-1.5 py-0.5 transition-colors duration-200 dark:border-gray-700 dark:bg-[#2a2a2a]">
                  <button
                    type="button"
                    onClick={() => handleVote(1)}
                    className={`rounded px-1 py-0.5 text-xs transition-colors duration-200 ${
                      localVote === 1
                        ? "font-medium text-accent"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                    }`}
                  >
                    ▲
                  </button>
                  <span className="px-1 text-xs font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                    {formatNumber(score)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleVote(-1)}
                    className={`rounded px-1 py-0.5 text-xs transition-colors duration-200 ${
                      localVote === -1
                        ? "font-medium text-accent"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                    }`}
                  >
                    ▼
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReply(!showReply)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
                >
                  <HiChatBubbleOvalLeft size={14} /> Reply
                </button>
              </div>

              <AnimatePresence>
                {showReply && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 flex gap-2"
                  >
                    <div className="flex flex-1 flex-col rounded-lg border border-gray-200 bg-gray-100 p-2 transition-colors duration-200 dark:border-gray-700 dark:bg-[#2a2a2a]">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply…"
                        rows={2}
                        className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:placeholder:text-gray-400"
                      />
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowReply(false);
                        setReplyText("");
                      }}
                      className="self-end rounded-lg bg-[#e85d3f] p-2.5 text-white transition-colors duration-200 hover:bg-[#d14f34]"
                    >
                      <HiPaperAirplane size={16} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {comment.replies?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {comment.replies.map((r) => (
                    <Comment key={r.id} comment={r} depth={depth + 1} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, vote } = usePosts();
  const { user } = useAuth();
  const post = posts.find((p) => p.id === Number(id)) || posts[0];
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(DUMMY_COMMENTS);

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [{
      id: Date.now(),
      author: user?.username || "you",
      avatar: (user?.username?.[0] || "Y").toUpperCase(),
      time: "just now",
      votes: 1,
      text: comment,
      replies: [],
    }, ...prev]);
    setComment("");
  };

  if (!post) return null;

  const initial = post.author?.[0]?.toUpperCase() || "?";

  return (
    <PageTransition>
      <div className="-mx-4 -mt-6 min-h-screen bg-[#f2eee9] transition-colors duration-200 dark:bg-[#0f0f0f] md:-mx-6">
        <div className="mx-auto w-full max-w-3xl space-y-6 px-4 pb-10 pt-6 md:px-6">
        <motion.button
          type="button"
          whileHover={{ x: -2 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <HiArrowLeft size={18} /> Back
        </motion.button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors transition-shadow duration-200 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a] dark:hover:shadow-black/30"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-accent-soft text-sm font-semibold text-accent dark:border-gray-700">
              {initial}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-100">u/{post.author}</span>
              <span className="mx-2">·</span>
              <span>{post.time}</span>
              {post.community && (
                <>
                  <span className="mx-2">·</span>
                  <span>{post.community}</span>
                </>
              )}
            </div>
          </div>

          <h1 className="mb-3 text-xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>

          {(post.type || "text") === "link" && post.linkUrl && (
            <a
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline break-all mb-4 block"
            >
              {post.linkUrl}
            </a>
          )}

          {post.content && (
            <p className="mb-4 leading-relaxed text-gray-500 dark:text-gray-400">{post.content}</p>
          )}

          {(post.type || "text") === "image" && post.image && (
            <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <img src={post.image} alt="" className="w-full max-h-[480px] object-cover" />
            </div>
          )}

          {(post.type || "text") === "video" && post.videoUrl && (
            <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-black dark:border-gray-700">
              <video
                controls
                className="w-full max-h-[480px] object-contain bg-black"
                src={post.videoUrl}
                preload="metadata"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-4 transition-colors duration-200 dark:border-gray-800">
            <VoteButton
              score={post.votes}
              direction={post.userVote}
              onUpvote={() => vote(post.id, 1)}
              onDownvote={() => vote(post.id, -1)}
              compact
            />
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <HiChatBubbleOvalLeft size={18} />
              {formatNumber(post.comments + comments.length)} comments
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <HiShare size={18} /> Share
            </button>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-800 dark:bg-[#1a1a1a]"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Comment as <span className="font-medium text-gray-900 dark:text-gray-100">u/{user?.username || "guest"}</span>
          </p>
          <div className="rounded-lg border border-gray-200 bg-gray-100 p-3 transition-colors duration-200 dark:border-gray-700 dark:bg-[#2a2a2a]">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What are your thoughts?"
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
          <div className="flex justify-end">
            <motion.button
              type="button"
              disabled={!comment.trim()}
              whileHover={comment.trim() ? { scale: 1.02 } : {}}
              whileTap={comment.trim() ? { scale: 0.98 } : {}}
              onClick={handleComment}
              className="inline-flex items-center gap-2 rounded-lg bg-[#e85d3f] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#d14f34] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <HiPaperAirplane size={15} /> Comment
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-800 dark:bg-[#1a1a1a]"
        >
          <p className="border-b border-gray-200 pb-3 text-sm font-semibold text-gray-900 transition-colors duration-200 dark:border-gray-800 dark:text-gray-100">
            {comments.length} comments
          </p>
          <div className="space-y-3 pt-3">
            {comments.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <Comment comment={c} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
