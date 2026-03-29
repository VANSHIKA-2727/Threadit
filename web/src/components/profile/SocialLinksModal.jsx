import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialLinksModal({ open, onClose, initial, onSave }) {
  const [twitter, setTwitter] = useState(initial.twitter ?? "");
  const [github, setGithub] = useState(initial.github ?? "");

  if (typeof document === "undefined") return null;

  const handleSave = () => {
    onSave({ twitter: twitter.trim(), github: github.trim() });
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm dark:bg-black/60"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="social-edit-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-[#1a1a1a]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="social-edit-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Social links
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Optional links shown on your profile.</p>

              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="soc-tw" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    Twitter / X
                  </label>
                  <input
                    id="soc-tw"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://twitter.com/username"
                    className="w-full rounded-lg border border-gray-200 bg-[#f5f3f0] px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="soc-gh" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    GitHub
                  </label>
                  <input
                    id="soc-gh"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full rounded-lg border border-gray-200 bg-[#f5f3f0] px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
