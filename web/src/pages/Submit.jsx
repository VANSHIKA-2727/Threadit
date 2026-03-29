import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import { usePosts } from "../context/Postscontext";
import { useAuth } from "../context/AuthContext";
import { COMMUNITIES } from "../utils/Formatnumber";

const TABS = [
  { key: "text", label: "Text" },
  { key: "media", label: "Images & Video" },
  { key: "link", label: "Link" },
];

function isVideoUrl(url) {
  if (!url?.trim()) return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url.trim());
}

export default function Submit() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const { user } = useAuth();
  const [community, setCommunity] = useState(COMMUNITIES[0]?.name || "r/programming");
  const [communityOpen, setCommunityOpen] = useState(false);
  const [tab, setTab] = useState("text");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!communityOpen) return;
    const close = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setCommunityOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [communityOpen]);

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handlePost = () => {
    if (!title.trim()) return;
    if (tab === "link" && !linkUrl.trim()) return;

    const author = user?.username || "guest";
    const base = {
      title: title.trim(),
      author,
      community,
      tag: null,
      userVote: 0,
    };

    if (tab === "link") {
      addPost({
        ...base,
        content: body.trim() || "",
        type: "link",
        linkUrl: linkUrl.trim(),
        image: null,
        videoUrl: null,
      });
    } else if (tab === "media") {
      const url = mediaUrl.trim();
      if (!url) {
        addPost({
          ...base,
          content: body.trim(),
          type: "text",
          image: null,
          videoUrl: null,
          linkUrl: null,
        });
      } else {
        const video = isVideoUrl(url);
        addPost({
          ...base,
          content: body.trim(),
          type: video ? "video" : "image",
          image: video ? null : url,
          videoUrl: video ? url : null,
          linkUrl: null,
        });
      }
    } else {
      addPost({
        ...base,
        content: body.trim(),
        type: "text",
        image: null,
        videoUrl: null,
        linkUrl: null,
      });
    }

    navigate("/home");
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground dark:text-zinc-100 tracking-tight">
            Create Post
          </h1>
          <p className="text-sm text-muted mt-1">Choose a community and post type, then publish.</p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setCommunityOpen((o) => !o)}
            className="flex w-full sm:w-auto min-w-[220px] items-center justify-between gap-3 rounded-lg border border-border dark:border-zinc-700 bg-surface dark:bg-zinc-900 px-4 py-2.5 text-sm font-medium text-foreground dark:text-zinc-100 hover:bg-[#f5f5f5] dark:hover:bg-zinc-800 transition-colors"
            aria-expanded={communityOpen}
            aria-haspopup="listbox"
          >
            <span className="truncate">{community}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-muted transition-transform ${communityOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {communityOpen && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full z-40 mt-2 max-h-64 w-full sm:w-72 overflow-y-auto rounded-xl border border-border dark:border-zinc-700 bg-surface dark:bg-zinc-900 py-1 shadow-sm"
                role="listbox"
              >
                {COMMUNITIES.map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={community === c.name}
                      onClick={() => {
                        setCommunity(c.name);
                        setCommunityOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-foreground dark:text-zinc-100 hover:bg-[#f5f5f5] dark:hover:bg-zinc-800 transition-colors"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-surface dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b border-border dark:border-zinc-800">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`relative flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  tab === t.key
                    ? "text-foreground dark:text-zinc-100 bg-[#e8eaed] dark:bg-zinc-800"
                    : "text-muted hover:text-foreground dark:hover:text-zinc-200 hover:bg-[#f5f5f5]/80 dark:hover:bg-zinc-800/50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-5 md:p-6 space-y-5">
            <div>
              <label htmlFor="post-title" className="sr-only">
                Title
              </label>
              <input
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-4 py-3.5 text-lg font-medium rounded-xl bg-[#f5f3f0] dark:bg-zinc-800 border border-border dark:border-zinc-700 text-foreground dark:text-zinc-100 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/35"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-dashed border-border dark:border-zinc-600 text-muted hover:text-foreground dark:hover:text-zinc-200 hover:border-muted transition-colors"
              >
                Add tags
              </motion.button>
            </div>

            {tab === "link" && (
              <div>
                <label htmlFor="post-url" className="sr-only">
                  URL
                </label>
                <input
                  id="post-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://"
                  className="w-full px-4 py-3 rounded-lg bg-[#f5f3f0] dark:bg-zinc-800 border border-border dark:border-zinc-700 text-sm text-foreground dark:text-zinc-100 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/25"
                />
              </div>
            )}

            {tab === "media" && (
              <div>
                <label htmlFor="post-media" className="sr-only">
                  Image or video URL
                </label>
                <input
                  id="post-media"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Paste image or video URL (.jpg, .png, .mp4…)"
                  className="w-full px-4 py-3 rounded-lg bg-[#f5f3f0] dark:bg-zinc-800 border border-border dark:border-zinc-700 text-sm text-foreground dark:text-zinc-100 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/25"
                />
              </div>
            )}

            <div>
              <div className="flex flex-wrap gap-1 rounded-lg border border-border dark:border-zinc-700 bg-[#f5f3f0] dark:bg-zinc-800 px-2 py-1.5 mb-2">
                {["B", "I", "•", "</>", "🔗"].map((x) => (
                  <motion.button
                    key={x}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    className="px-2 py-1 text-xs font-semibold text-muted rounded hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                  >
                    {x}
                  </motion.button>
                ))}
              </div>
              <label htmlFor="post-body" className="sr-only">
                Body
              </label>
              <textarea
                id="post-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  tab === "link" ? "Optional commentary (optional)" : "Text body (optional)"
                }
                rows={10}
                className="w-full px-4 py-3 rounded-lg bg-[#f5f3f0] dark:bg-zinc-800 border border-border dark:border-zinc-700 text-sm text-foreground dark:text-zinc-100 placeholder:text-muted leading-relaxed resize-y min-h-[200px] focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 px-5 md:px-6 py-4 border-t border-border dark:border-zinc-800 bg-[#faf9f7] dark:bg-zinc-900/80">
            {draftSaved && (
              <span className="text-xs text-muted mr-auto">Draft saved locally.</span>
            )}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveDraft}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground dark:hover:text-zinc-200 border border-transparent hover:border-border dark:hover:border-zinc-600 transition-colors"
            >
              Save Draft
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePost}
              disabled={!title.trim()}
              className="px-6 py-2 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Post
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
