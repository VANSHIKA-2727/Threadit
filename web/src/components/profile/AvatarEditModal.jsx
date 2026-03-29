import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Type } from "lucide-react";

export default function AvatarEditModal({ open, onClose, currentUrl, letter, onSave }) {
  const [preview, setPreview] = useState(() => currentUrl ?? null);
  const [mode, setMode] = useState(() => (currentUrl ? "upload" : "letter"));

  if (typeof document === "undefined") return null;

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setMode("upload");
    };
    reader.readAsDataURL(f);
  };

  const useLetter = () => {
    setPreview(null);
    setMode("letter");
  };

  const handleSave = () => {
    onSave(mode === "letter" ? null : preview);
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
              aria-labelledby="avatar-edit-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-[#1a1a1a]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="avatar-edit-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Avatar
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload a photo or use your initial.</p>

              <div className="mt-6 flex flex-col items-center">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-gray-100 bg-gray-100 dark:border-gray-800 dark:bg-[#2a2a2a]">
                  {mode === "upload" && preview ? (
                    <img src={preview} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-4xl font-semibold text-accent">{letter}</span>
                  )}
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Preview</p>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-100 dark:hover:bg-[#333]">
                  <Upload size={16} />
                  Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={useLetter}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-100 dark:hover:bg-[#2a2a2a]"
                >
                  <Type size={16} />
                  Auto avatar
                </motion.button>
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
