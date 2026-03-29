import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/**
 * Centered modal with backdrop. Renders via portal.
 * @param {'md' | 'lg'} size — max-w-md or max-w-lg
 */
export default function Modal({ open, onClose, title, titleId = "modal-title", children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const maxW = size === "lg" ? "max-w-lg" : "max-w-md";

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="modal-backdrop"
            type="button"
            aria-label="Close dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/50"
            onClick={onClose}
          />

          <motion.div
            key="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease }}
            className={`fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] ${maxW} -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-800 dark:bg-[#1a1a1a] dark:shadow-black/40`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <h2 id={titleId} className="px-5 pt-5 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            <div className={title ? "px-5 pb-5 pt-4" : "px-5 py-5"}>{children}</div>
            {footer && (
              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-200 px-5 py-4 dark:border-gray-800">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
