import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUser, HiArrowRightOnRectangle } from "react-icons/hi2";
import { Github, Twitter } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/Postscontext";
import PostCard from "../components/PostCard";
import PageTransition from "../components/layout/PageTransition";
import { formatNumber } from "../utils/Formatnumber";
import ProfileEditModal from "../components/profile/ProfileEditModal";
import AvatarEditModal from "../components/profile/AvatarEditModal";
import SocialLinksModal from "../components/profile/SocialLinksModal";

const TABS = [
  { key: "posts", label: "Posts" },
  { key: "comments", label: "Comments" },
  { key: "saved", label: "Saved" },
];

const DUMMY_COMMENTS_PROFILE = [
  { id: 1, text: "This is a really fascinating approach. I've been thinking about this problem differently.", post: "TypeScript's type system is Turing complete", time: "2 days ago", votes: 47 },
  { id: 2, text: "Agreed — minimalism in software is underrated. Ship less, ship better.", post: "Philosophy of minimalism in software", time: "3 days ago", votes: 91 },
  { id: 3, text: "Has anyone tried this with Kubernetes? I'm seeing some weird behavior at scale.", post: "Self-hosted Notion alternative", time: "5 days ago", votes: 23 },
];

const cardEase = [0.22, 1, 0.36, 1];

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const { posts } = usePosts();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [profileModalKey, setProfileModalKey] = useState(0);
  const [avatarModalKey, setAvatarModalKey] = useState(0);
  const [socialModalKey, setSocialModalKey] = useState(0);

  const openProfileModal = () => {
    setProfileModalKey((k) => k + 1);
    setProfileModalOpen(true);
  };
  const openAvatarModal = () => {
    setAvatarModalKey((k) => k + 1);
    setAvatarModalOpen(true);
  };
  const openSocialModal = () => {
    setSocialModalKey((k) => k + 1);
    setSocialModalOpen(true);
  };

  const userPosts = posts.filter((_, i) => i < 3);
  const totalKarma = userPosts.reduce((acc, p) => acc + p.votes, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const letter = user?.username?.[0]?.toUpperCase() || "U";
  const avatarUrl = user?.avatarUrl || null;
  const social = user?.socialLinks || { twitter: "", github: "" };

  if (!user) {
    return (
      <PageTransition>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#f2eee9] px-4 dark:bg-[#0f0f0f]">
          <HiUser size={40} className="text-gray-400 dark:text-gray-500" />
          <p className="text-gray-500 dark:text-gray-400">You&apos;re not signed in.</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Sign in
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="-mx-4 -mt-6 min-h-[calc(100vh-5rem)] bg-[#f2eee9] pb-10 dark:bg-[#0f0f0f] md:-mx-6">
        <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
            {/* LEFT — main */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: cardEase }}
              className="min-w-0 space-y-6"
            >
              <div className="overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
                <div className="h-32 rounded-t-xl bg-[#f2d7d0] dark:bg-[#1a1a1a]" />

                <div className="relative px-5 pb-6 pt-14">
                  <motion.button
                    type="button"
                    aria-label="Change avatar"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAvatarModal}
                    className="absolute left-5 top-0 h-20 w-20 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-gray-100 dark:border-[#0f0f0f] dark:bg-[#2a2a2a]"
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-accent">{letter}</span>
                    )}
                  </motion.button>

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">u/{user.username}</h1>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{user.bio}</p>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <span>
                          <strong className="text-gray-900 dark:text-gray-100">{formatNumber(totalKarma)}</strong>{" "}
                          <span className="text-gray-500 dark:text-gray-400">karma</span>
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-gray-100">{userPosts.length}</strong>{" "}
                          <span className="text-gray-500 dark:text-gray-400">posts</span>
                        </span>
                        <span>
                          <strong className="text-gray-900 dark:text-gray-100">{DUMMY_COMMENTS_PROFILE.length}</strong>{" "}
                          <span className="text-gray-500 dark:text-gray-400">comments</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openProfileModal}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-100 dark:hover:bg-[#2a2a2a]"
                      >
                        Edit Profile
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-[#2a2a2a]"
                      >
                        <HiArrowRightOnRectangle size={16} />
                        Log out
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-[#2a2a2a]">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-white text-gray-900 shadow-sm dark:bg-[#1a1a1a] dark:text-gray-100"
                        : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "posts" && (
                  <motion.div
                    key="posts"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: cardEase }}
                    className="space-y-6"
                  >
                    {userPosts.length ? (
                      userPosts.map((p) => <PostCard key={p.id} post={p} />)
                    ) : (
                      <p className="py-12 text-center text-gray-500 dark:text-gray-400">No posts yet.</p>
                    )}
                  </motion.div>
                )}

                {activeTab === "comments" && (
                  <motion.div
                    key="comments"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: cardEase }}
                    className="space-y-4"
                  >
                    {DUMMY_COMMENTS_PROFILE.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]"
                      >
                        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                          On <span className="font-medium text-gray-900 dark:text-gray-100">{c.post}</span> · {c.time}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">{c.text}</p>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{c.votes} votes</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "saved" && (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: cardEase }}
                    className="rounded-xl border border-gray-200 bg-white py-16 text-center text-gray-500 dark:border-gray-800 dark:bg-[#1a1a1a] dark:text-gray-400"
                  >
                    Nothing saved yet.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT — sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: cardEase, delay: 0.05 }}
              className="h-fit space-y-4 lg:sticky lg:top-6"
            >
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Stats</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Karma</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(totalKarma)}</span>
                  </li>
                  <li className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Followers</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(user.followers ?? 0)}</span>
                  </li>
                  <li className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Posts</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{userPosts.length}</span>
                  </li>
                  <li className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Comments</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{DUMMY_COMMENTS_PROFILE.length}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Settings</h2>
                <div className="mt-3 flex flex-col gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openProfileModal}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:hover:bg-[#333]"
                  >
                    <span>Profile</span>
                    <span className="text-xs text-accent">Update</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAvatarModal}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:hover:bg-[#333]"
                  >
                    <span>Avatar</span>
                    <span className="text-xs text-accent">Update</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openSocialModal}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:hover:bg-[#333]"
                  >
                    <span>Social links</span>
                    <span className="text-xs text-accent">Edit</span>
                  </motion.button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Social</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {social.twitter ? (
                    <a
                      href={social.twitter.startsWith("http") ? social.twitter : `https://twitter.com/${social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-[#2a2a2a]"
                    >
                      <Twitter size={16} className="text-gray-500" />
                      Twitter
                    </a>
                  ) : null}
                  {social.github ? (
                    <a
                      href={social.github.startsWith("http") ? social.github : `https://github.com/${social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-[#2a2a2a]"
                    >
                      <Github size={16} className="text-gray-500" />
                      GitHub
                    </a>
                  ) : null}
                  {!social.twitter && !social.github && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No links yet. Add them in settings.</p>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>

        <ProfileEditModal
          key={profileModalKey}
          open={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          initial={{ username: user.username, email: user.email, bio: user.bio }}
          onSave={(data) => updateUser(data)}
        />

        <AvatarEditModal
          key={avatarModalKey}
          open={avatarModalOpen}
          onClose={() => setAvatarModalOpen(false)}
          currentUrl={avatarUrl}
          letter={letter}
          onSave={(url) => updateUser({ avatarUrl: url })}
        />

        <SocialLinksModal
          key={socialModalKey}
          open={socialModalOpen}
          onClose={() => setSocialModalOpen(false)}
          initial={social}
          onSave={(links) => updateUser({ socialLinks: links })}
        />
      </div>
    </PageTransition>
  );
}
