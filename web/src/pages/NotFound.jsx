import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        <p className="text-6xl font-semibold text-foreground/90 mb-2">404</p>
        <h1 className="text-xl font-semibold text-foreground mb-2">Page not found</h1>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          This page doesn&apos;t exist or was moved. Head back to the feed.
        </p>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground hover:bg-[#f5f5f5] transition-colors"
          >
            <HiArrowLeft size={16} /> Back
          </motion.button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/home"
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
